
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

    try {

      await signInWithEmailAndPassword(auth, email, password);

      router.push("/dashboard");

    } catch (error) {

      setMessage(error.message);

    }

  };

  return (
    <div className="container">

      <div className="card">

        <div className="title">CoCreate Login</div>

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

        <button className="button" onClick={handleLogin}>
          Login
        </button>

        <div className="message">{message}</div>

        <div className="link" onClick={() => router.push("/signup")}>
          Don't have an account? Signup
        </div>

      </div>

    </div>
  );

}
