"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AllProjects() {

  const router = useRouter();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {

    const snapshot = await getDocs(collection(db, "projects"));

    const list = [];

    snapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setProjects(list);
  };

  const joinProject = async (projectId) => {

    const user = auth.currentUser;

    if (!user) {
      alert("Login required");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    const userName = userSnap.data().name;

    const projectRef = doc(db, "projects", projectId);

    await updateDoc(projectRef, {

      collaborators: arrayUnion({
        uid: user.uid,
        name: userName,
      }),

    });

    alert("Joined successfully!");

    fetchProjects();
  };

  return (

    <div style={styles.container}>

      <h1>All Projects</h1>

      <button
        style={styles.backBtn}
        onClick={() => router.push("/dashboard")}
      >
        ← Back
      </button>

      {projects.map((project) => (

        <div key={project.id} style={styles.card}>

          <p><b>Title:</b> {project.title}</p>

          <p><b>Description:</b> {project.description}</p>

          <p><b>Created by:</b> {project.createdByName}</p>

          <button
            style={styles.joinBtn}
            onClick={() => joinProject(project.id)}
          >
            Join Project
          </button>

        </div>

      ))}

    </div>

  );
}

const styles = {

  container: {
    padding: "40px",
  },

  card: {
    background: "#f4f6ff",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "8px",
  },

  joinBtn: {
    marginTop: "10px",
    padding: "8px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  backBtn: {
    marginTop: "10px",
    padding: "8px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

};
