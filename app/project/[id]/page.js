"use client";

import { useEffect, useState } from "react";
import { db } from "@/src/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectDetails() {
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
  }, [id, router]);

  if (loading) return <h2 className="loading-text">Loading...</h2>;
  if (!project) return <h2 className="loading-text">No project found</h2>;

  return (
  <div className="saas-container">

    {/* Header */}
    <div className="saas-header">
      <h1 className="saas-title">{project.title}</h1>
      <p className="saas-description">{project.description}</p>
    </div>

    {/* Founder Section */}
    <div className="saas-section">
      <h3 className="section-label">Founder</h3>

      <div className="profile-row">
  <Link href={`/profile/${project.createdBy}`}>
    <div className="avatar clickable">
      {project.createdByName?.charAt(0).toUpperCase()}
    </div>
  </Link>

        <div>
          <p className="profile-name">{project.createdByName}</p>
          <p className="profile-role">Founder</p>
        </div>
      </div>
    </div>

    {/* Team Section */}
    <div className="saas-section">
      <h3 className="section-label">Team</h3>

      {project.collaborators?.length > 0 ? (
        <div className="team-list">
          {project.collaborators.map((c, i) => (
            <div key={i} className="profile-row">
              <Link href={`/profile/${c.id}`}></Link>
              <div className="avatar light clickable">
                {c.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="profile-name">{c.name}</p>
                <p className="profile-role muted">Collaborator</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">No collaborators yet</p>
      )}
    </div>

    {/* Actions */}
    <div className="saas-actions">
      <button
        className="btn-primary"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>

  </div>
)};