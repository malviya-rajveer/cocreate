"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/src/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./landing.css";

export default function Home() {

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  const handleAuthAction = () => {

    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }

  };

  const handleLogout = async () => {

    await signOut(auth);
    router.push("/");

  };


  if (loading) {
    return <div className="loading">Loading...</div>;
  }


  return (

    <div className="landing">

      {/* NAVBAR */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        >
          CoCreate
        </div>

        <div className="navLinks">

          <span onClick={() => router.push("/")}>Features</span>

          <span onClick={() => router.push("/dashboard")}>
            Projects
          </span>

          <span>Community</span>

          <span>Contact</span>


          {user ? (

            <>
              <button
                className="dashboardBtn"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>

              <button
                className="logoutBtn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>

          ) : (

            <button
              className="signinBtn"
              onClick={handleAuthAction}
            >
              Sign In
            </button>

          )}

        </div>

      </nav>



      {/* HERO */}

      <section className="hero">

        <div className="heroLeft">

          <h1>
            Build Projects.<br/>
            Find Teammates.<br/>
            Launch Startups.
          </h1>

          <p>
            CoCreate helps developers connect, collaborate,
            and build real-world startup projects together.
          </p>

          <div className="heroButtons">

            <button
              className="primaryBtn"
              onClick={() => router.push("/signup")}
            >
              Get Started
            </button>

            <button
              className="secondaryBtn"
              onClick={() => router.push("/dashboard")}
            >
              Explore Projects
            </button>

          </div>

        </div>


        <div className="heroRight">

          <div className="heroCard">

            <h2>1000+</h2>

            <p>Active Builders</p>

          </div>

        </div>

      </section>



      {/* STATS */}

      <section className="stats">

        <div className="statCard">
          <h3>1000+</h3>
          <p>Developers</p>
        </div>

        <div className="statCard">
          <h3>250+</h3>
          <p>Projects</p>
        </div>

        <div className="statCard">
          <h3>50+</h3>
          <p>Startups Built</p>
        </div>

      </section>



      {/* TRUST */}

      <section className="trust">

        <span>Trusted by developers worldwide</span>

        <div className="companies">
          Google • Microsoft • Amazon • Startups • Students
        </div>

      </section>



      {/* FEATURES */}

      <section className="features">

        <h2>Why CoCreate?</h2>

        <div className="featureGrid">

          <div className="featureCard">

            <div className="icon">👥</div>

            <h3>Find Teammates</h3>

            <p>Connect with developers globally</p>

          </div>


          <div className="featureCard">

            <div className="icon">🚀</div>

            <h3>Build Together</h3>

            <p>Collaborate on real startup projects</p>

          </div>


          <div className="featureCard">

            <div className="icon">🌎</div>

            <h3>Grow Network</h3>

            <p>Expand your professional network</p>

          </div>

        </div>

      </section>



      {/* PROJECT CATEGORIES */}

      <section className="projects">

        <h2>Popular Categories</h2>

        <div className="projectGrid">

          <div className="projectCard">Web Apps</div>

          <div className="projectCard">AI Projects</div>

          <div className="projectCard">Startups</div>

          <div className="projectCard">Mobile Apps</div>

          <div className="projectCard">Open Source</div>

          <div className="projectCard">SaaS</div>

        </div>

      </section>



      {/* CTA */}

      <section className="cta">

        <h2>Start building your future today</h2>

        <p>Join thousands of builders already collaborating.</p>

        <button
          className="primaryBtn"
          onClick={() => router.push("/signup")}
        >
          Join CoCreate
        </button>

      </section>



      {/* FOOTER */}

      <footer className="footer">

        <div className="footerContent">

          <div>

            <h3>CoCreate</h3>

            <p>Build startups together.</p>

          </div>


          <div>

            <p>© 2026 CoCreate</p>

          </div>

        </div>

      </footer>


    </div>

  );

}
