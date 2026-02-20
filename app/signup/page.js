
"use client";

import { useState } from "react";
import { auth,db } from "@/src/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";




export default function SignupPage() {

  const router = useRouter();
  
 const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
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
        role: null,          // important
  bio: "",
  skills: [],
  interests: [],
  location: "",
  createdAt: new Date()
      });

      await updateProfile(userCredential.user, {
      displayName: name,
    });

      

      // Redirect to complete-profile page
      router.push("/complete-profile");

     
    } catch (error) {
       if (error.code === "auth/email-already-in-use") {
    setError("Account already exists. Please login.");
  } else {
    setError("Something went wrong. Try again.");
  }
    }

   

  };

  return (
    <div className="auth-container">

      <div className="auth-card">

         <div className="auth-logo">CoCreate</div>

       <div className="auth-subtitle">
          Join and start building amazing projects
        </div>

        <input
          placeholder="Full Name"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


        <input
          className="auth-input"
          
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

              {error && (
  <p style={{ color: "red", marginBottom: "10px" }}>
    {error}{" "}
    <span
      style={{ color: "#475ec9", cursor: "pointer" }}
      onClick={() => router.push("/login")}
    >
      Go to Login
    </span>
  </p>
)}

        <button className="auth-button" onClick={handleSignup}>
          Create Account
        </button>

      </div>

    </div>
  );

}
