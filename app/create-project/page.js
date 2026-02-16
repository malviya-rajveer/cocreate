"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/src/firebase";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc} from "firebase/firestore";


export default function CreateProjectPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }

    });

    return () => unsubscribe();

  }, [router]);

  const createProject = async () => {

    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    try {

         // get user name from Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    const userName = userSnap.data().name;

 //create project with name
      await addDoc(collection(db, "projects"), {

        title: title,
        description: description,
        createdByName: userName,
        createdBy: user.uid,
        collaborators:[{
            uid: user.uid,
            name: userName
        }],
        createdAt: new Date()

      });

      alert("Project created successfully");

      router.push("/dashboard");

    } catch (error) {

      alert(error.message);

    }

  };

  return (
    <div className="container">

      <div className="card">

        <div className="title">Create Project</div>

        <input
          className="input"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input"
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="button" onClick={createProject}>
          Create Project
        </button>

      </div>

    </div>
  );
}
