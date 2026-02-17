"use client";

import { useRouter } from "next/navigation";
import "./landing.css";

export default function LandingPage() {

  const router = useRouter();

  return (

    <div className="landing">


      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">CoCreate</div>

        <div className="navLinks">

          <span>Features</span>
          <span>Projects</span>
          <span>Community</span>
          <span>Contact</span>

          <button
            className="signinBtn"
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>

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
            and build amazing products together.
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
              onClick={() => router.push("/login")}
            >
              Explore
            </button>

          </div>

        </div>


        <div className="heroRight">

          <div className="heroCard">
            🚀
          </div>

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
            👥
            <h3>Find Teammates</h3>
            <p>Connect with developers globally</p>
          </div>

          <div className="featureCard">
            🚀
            <h3>Build Together</h3>
            <p>Collaborate on real projects</p>
          </div>

          <div className="featureCard">
            🌎
            <h3>Grow Network</h3>
            <p>Expand your startup circle</p>
          </div>

        </div>

      </section>



      {/* PROJECT TYPES */}

      <section className="projects">

        <h2>Popular Categories</h2>

        <div className="projectGrid">

          <div className="projectCard">Web Apps</div>
          <div className="projectCard">AI Projects</div>
          <div className="projectCard">Startups</div>

        </div>

      </section>



      {/* CTA */}

      <section className="cta">

        <h2>Start building your future today</h2>

        <button
          className="primaryBtn"
          onClick={() => router.push("/signup")}
        >
          Join CoCreate
        </button>

      </section>



      {/* FOOTER */}

      <footer className="footer">
        © 2026 CoCreate. Built for innovators.
      </footer>


    </div>

  );

}
