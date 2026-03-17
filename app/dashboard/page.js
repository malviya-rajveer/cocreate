"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase";
import { useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";

export default function Dashboard() {

  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [createdCount, setCreatedCount] = useState(0);
  const [joinedCount, setJoinedCount] = useState(0);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const user = auth.currentUser;

    // if (!user) {
    //   router.push("/login");
    //   return;
    // }

    fetchDashboardData(user);

  }, []);

  const fetchDashboardData = async (user) => {

    try {

      setUserName(user.displayName || user.email);

      // Fetch full user document (for avatar/profile)
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }

      // Created projects
      const createdQuery = query(
        collection(db, "projects"),
        where("createdBy", "==", user.uid)
      );

      const createdSnap = await getDocs(createdQuery);

      setCreatedCount(createdSnap.size);

      // Joined projects
      const joinedSnap = await getDocs(collection(db, "projects"));

      let joined = 0;
      let recent = [];

      joinedSnap.forEach((docItem) => {

        const data = docItem.data();

        if (data.collaborators) {

          const isJoined = data.collaborators.some(
            (c) => c.uid === user.uid
          );

          if (isJoined) joined++;
        }

        recent.push({
          id: docItem.id,
          ...data
        });

      });

      setJoinedCount(joined);

      setRecentProjects(recent.slice(0, 3));

      setLoading(false);

    } catch (error) {

      console.error(error);
      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading dashboard...
      </div>
    );
  }

  return (

    <div style={styles.container}>

      {/* HEADER */}

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            Welcome back, {userName} 👋
          </h1>

          <p style={styles.subtitle}>
            Here's what's happening with your projects
          </p>
        </div>

        {/* AVATAR SECTION */}

        <div style={{ position: "relative" }}>

          <div
            onClick={() => setShowMenu(!showMenu)}
            style={styles.avatar}
          >
            {userData?.name
              ? userData.name.charAt(0).toUpperCase()
              : userName.charAt(0).toUpperCase()}
          </div>

          {showMenu && (
            <div style={styles.dropdown}>

              <div
                style={styles.dropdownItem}
                onClick={() =>
                  router.push(`/profile/${auth.currentUser.uid}`)
                }
              >
                View Profile
              </div>

              <div
                style={styles.dropdownItem}
                onClick={() =>
                  router.push("/profile/edit")
                }
              >
                Edit Profile
              </div>

              <div
                style={{ ...styles.dropdownItem, color: "#ef4444" }}
                onClick={() => {
                  auth.signOut();
                  router.push("/");
                }}
              >
                Logout
              </div>

            </div>
          )}

        </div>

      </div>


      {/* STATS */}

      <div style={styles.statsGrid}>

        <div style={styles.statCard}>
          <h2>{createdCount}</h2>
          <p>Projects Created</p>
        </div>

        <div style={styles.statCard}>
          <h2>{joinedCount}</h2>
          <p>Projects Joined</p>
        </div>

      </div>


      {/* QUICK ACTIONS */}

      <div style={styles.section}>

        <h2 style={styles.sectionTitle}>
          Quick Actions
        </h2>

        <div style={styles.actionsGrid}>

          <button
            style={styles.primaryBtn}
            onClick={() => router.push("/create-project")}
          >
            + Create Project
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => router.push("/my-projects")}
          >
            My Projects
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => router.push("/all-projects")}
          >
            Browse Projects
          </button>

        </div>

      </div>


      {/* RECENT PROJECTS */}

      <div style={styles.section}>

        <h2 style={styles.sectionTitle}>
          Recent Projects
        </h2>

        {recentProjects.length === 0 ? (

          <p>No projects yet.</p>

        ) : (

          recentProjects.map((project) => (

            <div
              key={project.id}
              style={styles.projectCard}
              onClick={() => router.push(`/project/${project.id}`)}
            >

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <small>
                Created by: {project.createdByName}
              </small>

            </div>

          ))

        )}

      </div>

    </div>

  );

}


/* STYLES */

const styles = {

  container: {
    padding: "40px",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",
    color: "white",
  },

  loading: {
    color: "white",
    padding: "40px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: "32px",
    fontWeight: "bold",
  },

  subtitle: {
    opacity: 0.7,
  },

  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "#6366f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "18px"
  },

  dropdown: {
    position: "absolute",
    top: "55px",
    right: "0",
    background: "#1e293b",
    borderRadius: "10px",
    padding: "10px",
    width: "160px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
  },

  dropdownItem: {
    padding: "8px",
    cursor: "pointer",
    borderRadius: "6px"
  },

  statsGrid: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
  },

  statCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    minWidth: "180px",
  },

  section: {
    marginTop: "40px",
  },

  sectionTitle: {
    marginBottom: "15px",
  },

  actionsGrid: {
    display: "flex",
    gap: "15px",
  },

  primaryBtn: {
    padding: "12px 20px",
    background: "#6366f1",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "12px 20px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  projectCard: {
    background: "#1e293b",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "10px",
    cursor: "pointer",
  },

};