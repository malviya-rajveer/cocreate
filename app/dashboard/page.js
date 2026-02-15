

"use client";

import { auth } from "@/src/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  const logout = async () => {

    await signOut(auth);
    router.push("/login");

  };

  return (
    <div className="container">

      <div className="card">

        <div className="title">Welcome to CoCreate 🚀</div>

        <button className="button" onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );

}
