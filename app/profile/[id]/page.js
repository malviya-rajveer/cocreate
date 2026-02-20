"use client";

import { useEffect, useState } from "react";
import { db } from "@/src/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PublicProfile() {
  const params = useParams();
  const userId = params.id;

  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 1️⃣ Fetch user data
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          setUserData(null);
        }

        // 2️⃣ Fetch projects created by this user
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, where("createdBy", "==", userId));
        const querySnapshot = await getDocs(q);

        const userProjects = [];
        querySnapshot.forEach((doc) => {
          userProjects.push({ id: doc.id, ...doc.data() });
        });

        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }

      setLoading(false);
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">Loading profile...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="auth-container">
        <div className="auth-card">User not found.</div>
      </div>
    );
  }

 return (
  <div className="profile-page">
    <div className="profile-container">

      {/* HEADER */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {userData.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="profile-name">{userData.name}</h1>
            <p className="profile-role">FOUNDER</p>
          </div>
        </div>

        {/* ABOUT */}
        <div className="profile-about">
          <p className="profile-bio">
            {userData.bio || "No bio added yet."}
          </p>

          <div className="profile-grid">
            <div>
              <span className="label">Location:</span>
              <span>{userData.location || " Not specified"}</span>
            </div>

            <div>
              <span className="label">Skills:</span>
              <span>
                {userData.skills?.length
                  ? userData.skills.join(", ")
                  : " No skills added"}
              </span>
            </div>

            <div>
              <span className="label">Interests:</span>
              <span>
                {userData.interests?.length
                  ? userData.interests.join(", ")
                  : " No interests added"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="projects-section">
        <h2>Projects Created</h2>

        {projects.length === 0 ? (
          <p className="empty-text">No projects yet.</p>
        ) : (
          <div className="project-list">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                {project.collaboratorNames?.length > 0 && (
                  <p className="collaborators">
                    <strong>Collaborators:</strong>{" "}
                    {project.collaboratorNames.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
);
}