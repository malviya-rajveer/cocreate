"use client";

import { useEffect, useState } from "react";
import { db } from "@/src/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectDetails() {
  const { id } = useParams();   // ✅ only once
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
  }, [id, router]);

  if (loading) return <h2 className="loading-text">Loading...</h2>;
  if (!project) return <h2 className="loading-text">No project found</h2>;

  return (
    <div className="project-container">
      <h1 className="project-heading">Project Details</h1>

      <div className="project-card">
        <h2>Project ID:</h2>
        <p>{id}</p>

        <h1 className="project-title">{project.title}</h1>

        <p>
          <b>Description:</b> {project.description}
        </p>

        <p>
          <b>Created by:</b> {project.createdByName}
        </p>

        <div className="collab-section">
          <span>Collaborators:</span>

          {project.collaborators?.length > 0 ? (
            <ul>
              {project.collaborators.map((c, i) => (
                <li key={i}>{c.name}</li>
              ))}
            </ul>
          ) : (
            <p>No collaborators yet</p>
          )}
        </div>

        <Link href="/dashboard">
          <button className="project-button">
            Back to Dashboard
          </button>
        </Link>

        <button
          className="project-button secondary-btn"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}