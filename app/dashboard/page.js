"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";


export default function DashboardPage() {

  const router = useRouter();

  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        router.push("/login");
        return;
      }

       // get user data from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }

    });

    return () => unsubscribe();

  }, [router]);


  const logout = async () => {

    await signOut(auth);
    router.push("/login");

  };

  return (
    <div className="container">

      <div className="card">

        <div className="title">Welcome to CoCreate 🚀</div>

        {userData && (
          <>
            <div className="message">
              Name: {userData.name}
            </div>

            <div className="message">
              Email: {userData.email}
            </div>
          </>
        )}

        <button className="button" onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );

}
