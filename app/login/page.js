
"use client";

import { useState } from "react";
import { auth } from "@/src/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";



export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {

    // validation
    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {

      await signInWithEmailAndPassword(auth, email, password);

      setMessage("Login successful");

      //redirect to dashboard
      router.push("/dashboard");

    } catch (error) {

        if (error.code === "auth/user-not-found") {
        setMessage("User not found");
      }
      else if (error.code === "auth/wrong-password") {
        setMessage("Wrong password");
      }
      else if (error.code === "auth/invalid-email") {
        setMessage("Invalid email");
      }else{
      setMessage(error.message);

    }
}

  };

  return (
    <div className="auth-container">

      <div className="auth-card">

<div className="auth-logo">CoCreate</div>

        <div className="auth-title">Welcome back</div>

        <div className="auth-subtitle">
          Login to continue
        </div>

        

        <input
          className="auth-input"
          type="email"
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

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <div className="message">{message}</div>

        <div className="link"
        onClick={() => router.push("/signup")}
        style={{ cursor: "pointer" }}
        >
          Don't have an account? Signup
        </div>

      </div>

    </div>
  );

}
