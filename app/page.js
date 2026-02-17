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

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    fetchProjects();

    return () => unsubscribe();

  }, []);

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

        <div
          style={styles.logo}
          onClick={() => router.push("/")}
        >
          CoCreate
        </div>

        <div style={styles.navLinks}>

          <span style={styles.link}>Features</span>
          <span style={styles.link}>Projects</span>
          <span style={styles.link}>Community</span>

          {user ? (

            <button
              style={styles.dashboardBtn}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </button>

          ) : (

            <>
              <button
                style={styles.loginBtn}
                onClick={() => router.push("/login")}
              >
                Login
              </button>

              <button
                style={styles.signupBtn}
                onClick={() => router.push("/signup")}
              >
                Get Started
              </button>
            </>
          )}

        </div>

      </nav>


      {/* HERO SECTION */}

      <section style={styles.hero}>

        <div style={styles.heroLeft}>

          <h1 style={styles.heroTitle}>
            Build.<br/>
            Collaborate.<br/>
            Launch.
          </h1>

          <p style={styles.heroText}>
            The ultimate platform where developers find teammates,
            build real projects, and launch startups together.
          </p>

          <div style={styles.heroButtons}>

            <button
              style={styles.primaryBtn}
              onClick={() => router.push("/signup")}
            >
              Start Building →
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() => router.push("/all-projects")}
            >
              Explore Projects
            </button>

          </div>

        </div>


        <div style={styles.heroRight}>

          <div style={styles.heroCard}>
            🚀
            <p>Live Collaboration</p>
          </div>

          <div style={styles.heroCard}>
            👥
            <p>Find Teammates</p>
          </div>

          <div style={styles.heroCard}>
            💡
            <p>Launch Ideas</p>
          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section style={styles.features}>

        <h2 style={styles.sectionTitle}>Why CoCreate?</h2>

        <div style={styles.featureGrid}>

          <div style={styles.featureCard}>
            👥
            <h3>Find Teammates</h3>
            <p>Connect with skilled developers globally</p>
          </div>

          <div style={styles.featureCard}>
            🚀
            <h3>Build Real Projects</h3>
            <p>Collaborate and gain real experience</p>
          </div>

          <div style={styles.featureCard}>
            🌎
            <h3>Grow Network</h3>
            <p>Expand your startup connections</p>
          </div>

        </div>

      </section>


      {/* LIVE PROJECTS */}

      <section style={styles.projectsSection}>

        <h2 style={styles.sectionTitle}>Live Projects</h2>

        <div style={styles.projectGrid}>

          {projects.slice(0, 6).map((project) => (

            <div
              key={project.id}
              style={styles.projectCard}
              onClick={() => router.push(`/project/${project.id}`)}
            >

              <h3>{project.title}</h3>

              <p style={styles.projectDesc}>
                {project.description}
              </p>

              <p style={styles.projectAuthor}>
                by {project.createdByName}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* CTA */}

      <section style={styles.cta}>

        <h2>Ready to launch your next big idea?</h2>

        <button
          style={styles.primaryBtn}
          onClick={() => router.push("/signup")}
        >
          Join CoCreate Now
        </button>

      </section>


      {/* FOOTER */}

      <footer style={styles.footer}>
        © 2026 CoCreate • Built for innovators
      </footer>

    </div>

  );

}



const styles = {

  container: {
    fontFamily: "Inter, sans-serif",
    background: "#ffffff",
  },

  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 60px",
    background: "white",
    boxShadow: "0 2px 15px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4f46e5",
    cursor: "pointer",
  },

  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  link: {
    cursor: "pointer",
    color: "#555",
  },

  loginBtn: {
    padding: "8px 16px",
    border: "1px solid #ddd",
    background: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  signupBtn: {
    padding: "8px 18px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  dashboardBtn: {
    padding: "8px 18px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    padding: "80px 60px",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "white",
  },

  heroLeft: {
    maxWidth: "500px",
  },

  heroTitle: {
    fontSize: "52px",
    fontWeight: "bold",
  },

  heroText: {
    marginTop: "20px",
    fontSize: "18px",
    opacity: 0.9,
  },

  heroButtons: {
    marginTop: "25px",
    display: "flex",
    gap: "15px",
  },

  heroRight: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  heroCard: {
    background: "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },

  primaryBtn: {
    padding: "12px 22px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },

  secondaryBtn: {
    padding: "12px 22px",
    background: "white",
    color: "#4f46e5",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  sectionTitle: {
    textAlign: "center",
    marginBottom: "40px",
  },

  features: {
    padding: "60px",
  },

  featureGrid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },

  featureCard: {
    padding: "25px",
    background: "#f9fafb",
    borderRadius: "12px",
    width: "250px",
    textAlign: "center",
  },

  projectsSection: {
    padding: "60px",
    background: "#f9fafb",
  },

  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  projectCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  },

  projectDesc: {
    color: "#555",
  },

  projectAuthor: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#777",
  },

  cta: {
    padding: "80px",
    textAlign: "center",
  },

  footer: {
    padding: "20px",
    textAlign: "center",
    background: "#111",
    color: "white",
  },

};
