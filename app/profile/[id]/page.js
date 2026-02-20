"use client";

import { useEffect, useState } from "react";
import { db } from "@/src/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function PublicProfile() {
  const params = useParams();
  const userId = params.id;

  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch user data
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        // Fetch projects created by this user
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, where("founderId", "==", userId));
        const querySnapshot = await getDocs(q);

        const userProjects = [];
        querySnapshot.forEach((doc) => {
          userProjects.push({ id: doc.id, ...doc.data() });
        });

        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  if (!userData) {
    return (
      <div className="auth-container">
        <div className="auth-card">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-logo">{userData.name}</div>

        <div style={{ marginBottom: "10px", fontWeight: "bold", color: "#475ec9" }}>
          {userData.role?.toUpperCase()}
        </div>

        <p style={{ marginBottom: "10px" }}>{userData.bio}</p>

        <div style={{ marginBottom: "10px" }}>
          <strong>Location:</strong> {userData.location}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Skills:</strong>{" "}
          {userData.skills?.join(", ")}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <strong>Interests:</strong>{" "}
          {userData.interests?.join(", ")}
        </div>

        <hr style={{ margin: "20px 0" }} />

        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Projects Created
        </div>

        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              style={{
                padding: "10px",
                border: "1px solid #eee",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
            >
              <div style={{ fontWeight: "bold" }}>{project.title}</div>
              <div style={{ fontSize: "14px", color: "gray" }}>
                {project.description}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}