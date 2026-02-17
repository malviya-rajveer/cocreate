"use client";

import { useEffect, useState } from "react";
import { db } from "@/src/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";


import Link from "next/link";


export default function ProjectDetails() {

    const params = useParams();
  const projectId = params.id;

  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProject = async () => {

      try {

        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

          setProject(docSnap.data());

        } else {

          alert("Project not found");
          router.push("/all-projects");

        }

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    };

    if (id) fetchProject();

  }, [id]);

  if (loading) return <h2 style={{color:"white"}}>Loading...</h2>;

  if (!project) return <h2 style={{color:"white"}}>No project found</h2>;

  return (

    <div style={styles.container}>

        <h1 style={styles.heading}>Project Details</h1>

      <div style={styles.card}>
        <h2>Project ID:</h2>
        <p>{projectId}</p>

        <p>This is where full project info will be shown.</p>

<Link href="/dashboard">
          <button style={styles.button}>Back to Dashboard</button>
        </Link>




        <h1>{project.title}</h1>

        <p><b>Description:</b> {project.description}</p>

        <p><b>Created by:</b> {project.createdByName}</p>

        <button
          style={styles.button}
          onClick={() => router.back()}
        >
          Back
        </button>

      </div>

    </div>

  );

}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
  },

  button: {
    marginTop: "20px",
    padding: "10px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  container: {
    padding: "40px",
    color: "white",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

};
