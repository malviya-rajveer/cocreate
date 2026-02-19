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


<div>
<span className="inline-block mb-3 px-3 py-1 text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
  ● Active Project
</span>

</div>

        <h1>{project.title}</h1>

        <p><b>Description:</b> {project.description}</p>

        <p><b>Created by:</b> {project.createdByName}</p>


{/* Collaborators Section */}
<div className="mt-8">
  <h3 className="text-xl font-semibold mb-4 text-white">
    Collaborators
  </h3>

  {project.collaborators?.length > 0 ? (
    <div className="space-y-3">
      {project.collaborators.map((collab, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-3 rounded-lg hover:bg-white/10 transition"
        >
          <span className="text-gray-200 font-medium">
            {collab.name}
          </span>

          <span className="text-xs text-gray-400">
            [Collaborator]
          </span>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-400">No collaborators yet</p>
  )}
</div>


{/* Action Buttons */}
<div className="mt-8 flex flex-wrap gap-4">

<div>
 <button
    style={styles.button}
  >
    Invite Collaborator
  </button>
       
  <button
style={styles.button}  >
    Open Discussion
  </button>
</div>
 

  

</div>


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
