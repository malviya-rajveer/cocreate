"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

  const router = useRouter();

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "Founder",
    bio: "",
    skills: "",
    interests: ""
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchUser = async () => {

      const currentUser = auth.currentUser;

      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);

      const docRef = doc(db, "users", currentUser.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        const data = docSnap.data();

        setForm({
          name: data.name || "",
          role: data.role || "Founder",
          bio: data.bio || "",
          skills: data.skills?.join(", ") || "",
          interests: data.interests?.join(", ") || ""
        });

      }

      setLoading(false);
    };

    fetchUser();

  }, []);


  const handleSave = async () => {

    await setDoc(doc(db, "users", user.uid), {

      name: form.name,
      email: user.email,

      role: form.role,

      bio: form.bio,

      skills: form.skills.split(",").map(s => s.trim()),

      interests: form.interests.split(",").map(i => i.trim()),

      uid: user.uid

    }, { merge: true });

    alert("Profile saved successfully");

  };


  if (loading) return <div className="text-white p-10">Loading...</div>;


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1b34] to-[#020617] text-white p-8">

      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Your Profile
        </h1>


        {/* Name */}
        <input
          className="w-full mb-4 p-3 rounded bg-white/10 border border-white/10"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />


        {/* Role */}
        <select
          className="w-full mb-4 p-3 rounded bg-white/10 border border-white/10"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option>Founder</option>
          <option>Collaborator</option>
          <option>Investor</option>
        </select>


        {/* Bio */}
        <textarea
          className="w-full mb-4 p-3 rounded bg-white/10 border border-white/10"
          placeholder="Bio"
          value={form.bio}
          onChange={(e) =>
            setForm({ ...form, bio: e.target.value })
          }
        />


        {/* Skills */}
        <input
          className="w-full mb-4 p-3 rounded bg-white/10 border border-white/10"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={(e) =>
            setForm({ ...form, skills: e.target.value })
          }
        />


        {/* Interests */}
        <input
          className="w-full mb-6 p-3 rounded bg-white/10 border border-white/10"
          placeholder="Startup interests"
          value={form.interests}
          onChange={(e) =>
            setForm({ ...form, interests: e.target.value })
          }
        />


        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded font-semibold"
        >
          Save Profile
        </button>

      </div>

    </div>
  );

}
