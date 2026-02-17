"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {

  const router = useRouter();

  return (

    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>CoCreate</h2>

        <div style={styles.navLinks}>
          <span style={styles.link}>Features</span>
          <span style={styles.link}>Projects</span>
          <span style={styles.link}>About</span>
          <span style={styles.link}>Contact</span>

          <button
            style={styles.signinBtn}
            onClick={() => router.push("/login")}
          >
            Sign in
          </button>

        </div>
      </nav>


      {/* HERO SECTION */}
      <section style={styles.hero}>

        <div style={styles.heroLeft}>

          <h1 style={styles.heroTitle}>
            Find Teammates. Build Projects. Grow Together.
          </h1>

          <p style={styles.heroText}>
            CoCreate helps developers collaborate, join projects,
            and build amazing things together.
          </p>

          <div>

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


        <div style={styles.heroRight}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            style={styles.heroImg}
          />
        </div>

      </section>


      {/* PARTNERS STRIP */}
      <div style={styles.partners}>
        <span>Google</span>
        <span>Microsoft</span>
        <span>Amazon</span>
        <span>Meta</span>
        <span>Netflix</span>
      </div>


      {/* FEATURES */}
      <section style={styles.features}>

        <h2>Why CoCreate?</h2>

        <div style={styles.featureGrid}>

          <div style={styles.featureCard}>
            <h3>Create Projects</h3>
            <p>Start your own ideas and find collaborators.</p>
          </div>

          <div style={styles.featureCard}>
            <h3>Join Projects</h3>
            <p>Explore and contribute to live projects.</p>
          </div>

          <div style={styles.featureCard}>
            <h3>Build Portfolio</h3>
            <p>Showcase your real work experience.</p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section style={styles.cta}>

        <h2>Ready to start building?</h2>

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

  page: {
    fontFamily: "Arial",
    background: "linear-gradient(135deg,#f5f7ff,#ffe0f0)",
    minHeight: "100vh",
  },


  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    background: "white",
  },

  logo: {
    color: "#6c63ff",
  },

  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  link: {
    cursor: "pointer",
  },

  signinBtn: {
    background: "#6c63ff",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },


  hero: {
    display: "flex",
    justifyContent: "space-between",
    padding: "60px 40px",
    alignItems: "center",
  },

  heroLeft: {
    maxWidth: "500px",
  },

  heroTitle: {
    fontSize: "40px",
  },

  heroText: {
    marginTop: "15px",
    marginBottom: "20px",
  },

  primaryBtn: {
    background: "#6c63ff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    marginRight: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "white",
    border: "1px solid #6c63ff",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  heroRight: {},

  heroImg: {
    width: "250px",
  },


  partners: {
    display: "flex",
    justifyContent: "space-around",
    background: "linear-gradient(90deg,#6c63ff,#ff7eb3)",
    padding: "15px",
    color: "white",
  },


  features: {
    padding: "60px 40px",
    textAlign: "center",
  },

  featureGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },

  featureCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "200px",
  },


  cta: {
    textAlign: "center",
    padding: "60px",
    background: "linear-gradient(90deg,#6c63ff,#ff7eb3)",
    color: "white",
  },


  footer: {
    textAlign: "center",
    padding: "20px",
    background: "white",
  },

};
