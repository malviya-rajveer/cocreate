"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    fetchProjects();

    return () => unsub();

  }, []);

  const fetchProjects = async () => {

    const snap = await getDocs(collection(db,"projects"));

    const list = [];

    snap.forEach(doc=>{
      list.push({
        id:doc.id,
        ...doc.data()
      });
    });

    setProjects(list);

  };

  return (

    <div>

      {/* NAVBAR */}

      <div className="navbar">

        <div className="logo"
        onClick={()=>router.push("/")}>
          CoCreate
        </div>

        <div className="nav-right">

          {user ? (

            <button
            className="nav-btn signup"
            onClick={()=>router.push("/dashboard")}>
              Dashboard
            </button>

          ) : (

            <>
            <button
            className="nav-btn login"
            onClick={()=>router.push("/login")}>
              Login
            </button>

            <button
            className="nav-btn signup"
            onClick={()=>router.push("/signup")}>
              Get Started
            </button>
            </>
          )}

        </div>

      </div>


      {/* HERO */}

      <div className="hero">

        <div className="hero-left">

          <div className="hero-title">

            Build Your  
            <span className="gradient-text"> Startup</span>  
            <br/>
            With The Right Team

          </div>

          <div className="hero-desc">

            Find collaborators, work on real projects,  
            and launch your next big idea.

          </div>

          <div className="hero-buttons">

            <button
            className="primary"
            onClick={()=>router.push("/signup")}>
              Get Started
            </button>

            <button
            className="secondary"
            onClick={()=>router.push("/all-projects")}>
              Explore Projects
            </button>

          </div>

        </div>

      </div>


      {/* PROJECTS */}

      <div className="projects">

        <h2>Live Projects</h2>

        <div className="project-grid">

          {projects.map(project=>(

            <div
            key={project.id}
            className="project-card"
            onClick={()=>router.push(`/project/${project.id}`)}>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-author">
                by {project.createdByName}
              </div>

            </div>

          ))}

        </div>

      </div>


      <div className="footer">

        Built with ❤️ for developers • CoCreate 2026

      </div>

    </div>

  );

}
