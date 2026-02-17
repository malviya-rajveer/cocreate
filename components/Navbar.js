"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/src/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();

  }, []);

  const handleLogout = async () => {

    await signOut(auth);
    router.push("/login");

  };

  return (

    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-purple-600">
        CoCreate
      </h1>

      <div className="flex gap-6 items-center">

        <Link href="/" className="hover:text-purple-600">
          Home
        </Link>

        <Link href="/dashboard" className="hover:text-purple-600">
          Dashboard
        </Link>

        {!user ? (
          <>
            <Link href="/login">
              <button className="px-4 py-2 border rounded-lg">
                Login
              </button>
            </Link>

            <Link href="/signup">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                Signup
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        )}

      </div>

    </nav>

  );
}
