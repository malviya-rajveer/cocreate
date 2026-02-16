// "use client";

// import { useEffect, useState } from "react";
// import { auth, db } from "@/src/firebase";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";


// export default function DashboardPage() {

//   const router = useRouter();

//   const [user, setUser] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [myProjects, setMyProjects] = useState([]);


//     // Fetch projects
//   const fetchProjects = async () => {
//     try {

    
//     const querySnapshot = await getDocs(collection(db, "projects"));
//     const projectList = [];

//     querySnapshot.forEach((docSnap) => {

//       projectList.push({
//         id: docSnap.id,
//         ...docSnap.data()
//     });
//     });

//     setProjects(projectList);
//   }catch(error){
//     console.log(error);
//   }
// };

// const fetchMyProjects = async () => {

//   const user = auth.currentUser;

//   if (!user) return;

//   const querySnapshot = await getDocs(collection(db, "projects"));

//   const list = [];

//   querySnapshot.forEach((docSnap) => {

//     const data = docSnap.data();

//     const isCreator = data.createdBy === user.uid;

//     const isCollaborator =
//       data.collaborators?.some(
//         (c) => c.uid === user.uid
//       );

//     if (isCreator || isCollaborator) {

//       list.push({
//         id: docSnap.id,
//         ...data
//       });

//     }

//   });

//   setMyProjects(list);

// };



// // Logout function
//   const logout = async () => {
//     await signOut(auth);
//     router.push("/login");
//   };


//   useEffect(() => {
//     fetchProjects();
//     fetchMyProjects();
//   }, []);

//   //join project
//     const joinProject = async (projectId) => {

//   try {

//     const user = auth.currentUser;

//     if (!user) {
//       alert("Login required");
//       return;
//     }

//     // get user name from users collection
//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);

//     const userName = userSnap.data().name;

//     const projectRef = doc(db, "projects", projectId);

//     await updateDoc(projectRef, {
//       collaborators: arrayUnion({
//        uid: user.uid,
//       name: userName
//     }),
//     });

//     alert("Joined successfully!");
//     fetchProjects();

//   } catch (error) {
//     console.log(error);
//     alert(error.message);
//   }
//     };

// const isAlreadyJoined = (project) => {
//   const currentUser = auth.currentUser;

//   if (!currentUser || !project.collaborators) return false;

//   return project.collaborators.some(
//     (collab) => collab.uid === currentUser.uid
//   );
// };



//   return (
//     <div style={styles.container}>

//       <div style={styles.wrapper}>

//         {/* LEFT PANEL */}
//         <div style={styles.leftCard}>

//           <h1 style={styles.title}>Welcome to CoCreate 🚀</h1>

//           <button
//             style={styles.button}
//             onClick={() => router.push("/create-project")}
//           >
//             Create Project
//           </button>

//           <button
//             style={styles.logoutButton}
//             onClick={logout}
//           >
//             Logout
//           </button>

//         </div>

//         {/* RIGHT PANEL */}
//         <div style={styles.rightCard}>

//           <h2 style={styles.projectTitle}>My Projects</h2>

// {myProjects.length === 0 ? (
//   <p>No joined projects</p>
// ) : (
//   myProjects.map((project) => (
//     <div key={project.id} style={styles.projectCard}>
//       <p><b>Title:</b> {project.title}</p>
//       <p><b>Description:</b> {project.description}</p>
//     </div>
//   ))
// )}


//           <h2 style={styles.projectTitle}>All Projects</h2>

//           {projects.length === 0 ? (
//             <p>No projects yet</p>
//           ) : (
//             projects.map((project) => (
//               <div key={project.id} style={styles.projectCard}>

//                 <p><b>Title:</b> {project.title}</p>

//                 <p><b>Description:</b> {project.description}</p>

//                 <p><b>Created by:</b> {project.createdByName}</p>

//                 <p><b>Collaborators:</b></p>

// {project.collaborators?.length > 0 ? (
//   project.collaborators.map((collab, index) => (
//     <p key={index}>• {collab.name}</p>
//   ))
// ) : (
//   <p>No collaborators yet</p>
// )}

//   <button
//     style={{
//       ...styles.joinButton,
//        background: isAlreadyJoined(project) ? "#aaa" : "#38a169",
//     cursor: isAlreadyJoined(project) ? "not-allowed" : "pointer",

//     }}

//     onClick={() => joinProject(project.id)}
//     disabled={isAlreadyJoined(project)}
//   >
//       {isAlreadyJoined(project) ? "Already Joined" : "Join Project"}

//   </button>
// </div>
//            ))
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// const styles = {

//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #667eea, #764ba2)",
//   },

//   wrapper: {
//     display: "flex",
//     gap: "30px",
//     width: "900px",
//   },

//   leftCard: {
//     flex: 1,
//     background: "white",
//     padding: "30px",
//     borderRadius: "12px",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   },

//   rightCard: {
//     flex: 1,
//     background: "white",
//     padding: "30px",
//     borderRadius: "12px",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//   },

//   title: {
//     marginBottom: "10px",
//   },

//   projectTitle: {
//     marginBottom: "20px",
//   },

//   button: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#667eea",
//     color: "white",
//     cursor: "pointer",
//     fontSize: "16px",
//   },

//   logoutButton: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#ff4d4d",
//     color: "white",
//     cursor: "pointer",
//     fontSize: "16px",
//   },

//   projectCard: {
//     background: "#f4f6ff",
//     padding: "15px",
//     borderRadius: "8px",
//     marginBottom: "15px",
//   },

//   joinButton: {
//   marginTop: "10px",
//   padding: "8px",
//   border: "none",
//   borderRadius: "6px",
//   background: "#38a169",
//   color: "white",
//   cursor: "pointer",
// },


// };

"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        router.push("/login");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setName(snap.data().name);
      }

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) return <h2>Loading...</h2>;

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1>Welcome, {name} 🚀</h1>

        <p style={styles.subtitle}>
          Manage and collaborate on projects easily
        </p>

        <button
          style={styles.primaryBtn}
          onClick={() => router.push("/my-projects")}
        >
          My Projects
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => router.push("/all-projects")}
        >
          All Projects
        </button>

        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
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
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    width: "350px",
  },

  subtitle: {
    marginBottom: "20px",
    color: "gray",
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  secondaryBtn: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    background: "#06b6d4",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  logoutBtn: {
    width: "100%",
    padding: "12px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

};
