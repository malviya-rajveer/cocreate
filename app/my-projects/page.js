"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function MyProjects() {

  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {

    const user = auth.currentUser;

    if (!user) {
      router.push("/login");
      return;
    }

    const snapshot = await getDocs(collection(db, "projects"));

    const list = [];

    snapshot.forEach((doc) => {

      const data = doc.data();

      const isCreator = data.createdBy === user.uid;

      const isCollaborator =
        data.collaborators?.some(
          (collab) => collab.uid === user.uid
        );

      if (isCreator || isCollaborator) {
        list.push({
          id: doc.id,
          ...data,
        });
      }

    });

    setProjects(list);
    setLoading(false);
  };

  if (loading) return <h2>Loading...</h2>;

  return (

    <div className="pageContainer">

      <h1 className="pageTitle">My Projects</h1>

      <button
        className="backBtn"
        onClick={() => router.push("/dashboard")}
      >
        ← Back
      </button>

      {projects.length === 0 ? (
        <div className="emptyState">
          No projects yet.
          </div>
      ) : (

        
        projects.map((project) => (

          <div key={project.id} 
          className="projectCard"
           onClick={() => router.push(`/project/${project.id}`)}
        >
          
          <h3 className="projectTitle">
            {project.title}
          </h3>

          <p className="projectText">
            <span>Description:</span> {project.description}
          </p>

          <p className="projectText">
            <span>Created by:</span> {project.createdByName}
          </p>
           
           <div className="collabSection">
            <span>Collaborators:</span>

             {project.collaborators?.length > 0 ? (

            <ul>
              {project.collaborators?.map((c, i) => (
                <li key={i}>{c.name}</li>
              ))}
            </ul>

) : (
              <p>No collaborators yet</p>
            )}
          </div>

       

    </div>
        ))
      )}
      </div>
  );
}

