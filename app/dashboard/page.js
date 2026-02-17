"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        router.push("/login");
        return;
      }

      const docRef = doc(db, "users", user.uid);

      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setName(snap.data().name);
      }

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) return <h2 style={{color:"white",textAlign:"center"}}>Loading...</h2>;

  const firstLetter = name.charAt(0).toUpperCase();

  return (

    <div style={styles.container}>

      {/* NAVBAR */}
      <div style={styles.navbar}>

        <div style={styles.logo}>
          CoCreate
        </div>

        <div style={styles.navRight}>

          <div style={styles.profileCircle}>
            {firstLetter}
          </div>

          <span style={styles.username}>
            {name}
          </span>

          <button
            style={styles.logoutBtn}
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* MAIN CONTENT */}
      <div style={styles.content}>

        <div style={styles.card}>

          <h1>Heyy!</h1>

          <p style={styles.subtitle}>
            Welcome back, {name} 🚀
          </p>

          <button
            style={styles.primaryBtn}
            onClick={() => router.push("/my-projects")}
          >
            📁 My Projects
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => router.push("/all-projects")}
          >
            🌍 All Projects
          </button>

          <button
            style={styles.createBtn}
            onClick={() => router.push("/create-project")}
          >
            ➕ Create Project
          </button>

        </div>

      </div>

    </div>

  );

}


const styles = {

  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  navbar: {
    height: "60px",
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#4f46e5",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  profileCircle: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#4f46e5",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  username: {
    fontWeight: "bold",
    color:"black",
  },

  logoutBtn: {
    padding: "6px 12px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60px",
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    color:"black",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },

  subtitle: {
    color: "gray",
    marginBottom: "20px",
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  secondaryBtn: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    background: "#06b6d4",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  createBtn: {
    width: "100%",
    padding: "12px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

};
