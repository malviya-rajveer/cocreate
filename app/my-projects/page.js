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

    <div style={styles.container}>

      <h1>My Projects</h1>

      <button
        style={styles.backBtn}
        onClick={() => router.push("/dashboard")}
      >
        ← Back
      </button>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((project) => (

          <div key={project.id} style={styles.card}>

            <p><b>Title:</b> {project.title}</p>

            <p><b>Description:</b> {project.description}</p>

            <p><b>Created by:</b> {project.createdByName}</p>

            <p><b>Collaborators:</b></p>

            <ul>
              {project.collaborators?.map((c, i) => (
                <li key={i}>{c.name}</li>
              ))}
            </ul>

          </div>

        ))
      )}

    </div>

  );
}

const styles = {

  container: {
    padding: "40px",
  },

  card: {
    background: "#f4f6ff",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "8px",
  },

  backBtn: {
    marginTop: "10px",
    padding: "8px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

};
