
"use client";

import { useState } from "react";
import { auth,db } from "@/src/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";



export default function SignupPage() {

  const router = useRouter();
  
 const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSignup = async () => {

    // basic validation
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }


    try {

      //create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user =userCredential.user;

      // save extra data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        uid: user.uid,
      });

      alert("Signup Successful!");

      // Redirect to dashboard
      router.push("/dashboard");

     
    } catch (error) {

      alert(error.message);

    }

  };

  return (
    <div className="container">

      <div className="card">

        <div className="title">CoCreate Signup</div>

        <input
          type="text"
          placeholder="Name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


        <input
          className="input"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" onClick={handleSignup}>
          Signup
        </button>

      </div>

    </div>
  );

}
