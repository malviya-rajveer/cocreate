"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/src/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // check auth state
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    fetchProjects();

    return () => unsubscribe();

  }, []);

  // fetch projects
  const fetchProjects = async () => {

    try {

      const snapshot = await getDocs(collection(db, "projects"));

      const list = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setProjects(list);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);

  };

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading CoCreate...
      </div>
    );
  }

  return (

    <div style={styles.container}>

      {/* NAVBAR */}

      <nav style={styles.navbar}>

        <div style={styles.logo}>
          CoCreate
        </div>

        <div style={styles.navRight}>

          <span style={styles.navLink}>Features</span>
          <span style={styles.navLink}>Projects</span>
          <span style={styles.navLink}>Community</span>

          {user ? (

            <button
              style={styles.dashboardBtn}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </button>

          ) : (

            <button
              style={styles.loginBtn}
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>

          )}

        </div>

      </nav>


      {/* HERO */}

      <section style={styles.hero}>

        <div>

          <h1 style={styles.heroTitle}>
            Build Projects.<br/>
            Find Teammates.<br/>
            Launch Startups.
          </h1>

          <p style={styles.heroText}>
            CoCreate connects developers, designers, and innovators
            to build real-world projects together.
          </p>

          <div style={styles.heroButtons}>

            <button
              style={styles.primaryBtn}
              onClick={() => router.push("/signup")}
            >
              Get Started
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() => router.push("/all-projects")}
            >
              Explore Projects
            </button>

          </div>

        </div>

      </section>


      {/* REAL PROJECTS */}

      <section style={styles.projectSection}>

        <h2>Live Projects</h2>

        <div style={styles.projectGrid}>

          {projects.slice(0, 3).map((project) => (

            <div
              key={project.id}
              style={styles.projectCard}
              onClick={() => router.push(`/project/${project.id}`)}
            >

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <small>
                Created by: {project.createdByName}
              </small>

            </div>

          ))}

        </div>

      </section>


      {/* CTA */}

      <section style={styles.cta}>

        <h2>Ready to build something amazing?</h2>

        <button
          style={styles.primaryBtn}
          onClick={() => router.push("/signup")}
        >
          Join CoCreate
        </button>

      </section>


      {/* FOOTER */}

      <footer style={styles.footer}>
        © 2026 CoCreate. All rights reserved.
      </footer>


    </div>

  );

}


const styles = {

  container: {
    fontFamily: "Arial",
  },

  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#4f46e5",
  },

  navRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  navLink: {
    cursor: "pointer",
  },

  loginBtn: {
    padding: "8px 16px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  dashboardBtn: {
    padding: "8px 16px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  hero: {
    padding: "80px 40px",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "white",
  },

  heroTitle: {
    fontSize: "42px",
  },

  heroText: {
    marginTop: "10px",
  },

  heroButtons: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },

  primaryBtn: {
    padding: "12px 20px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "12px 20px",
    background: "white",
    color: "#4f46e5",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  projectSection: {
    padding: "40px",
  },

  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  projectCard: {
    padding: "20px",
    background: "#f4f6ff",
    borderRadius: "10px",
    cursor: "pointer",
  },

  cta: {
    padding: "60px",
    textAlign: "center",
    background: "#f9fafb",
  },

  footer: {
    padding: "20px",
    textAlign: "center",
    background: "#111",
    color: "white",
  },

};
