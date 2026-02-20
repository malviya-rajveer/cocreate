"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/src/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;

      if (!user) {
        router.push("/login");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // If role already exists, skip this page
        if (userData.role) {
          router.push("/dashboard");
          return;
        }
      }

      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!role || !bio || !skills || !interests || !location) {
      alert("Please fill all fields");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
  role: role,
  bio: bio,
  skills: skills.split(",").map((skill) => skill.trim()),
  interests: interests.split(",").map((interest) => interest.trim()),
  location: location,
});

      router.push("/dashboard");
    } catch (error) {
      alert("Something went wrong. Try again.");
    }
  };

  if (loading) return null;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">Complete Your Profile</div>

        <div className="auth-subtitle">
          Tell us a little about yourself
        </div>

        {/* Role Dropdown */}
        <select
          className="auth-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option className="role-option" value="founder">Founder</option>
          <option className="role-option" value="collaborator">Collaborator</option>
          <option className="role-option" value="investor">Investor</option>
        </select>

        {/* Bio */}
        <textarea
          className="auth-input"
          placeholder="Write a short bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        {/* Skills */}
        <input
          className="auth-input"
          placeholder="Skills (comma separated e.g. React, UI Design, Marketing)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        {/* Interests */}
<input
  className="auth-input"
  placeholder="Interests (comma separated e.g. AI, FinTech, EdTech)"
  value={interests}
  onChange={(e) => setInterests(e.target.value)}
/>

{/* Location */}
<input
  className="auth-input"
  placeholder="Location (City, Country)"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>

        <button className="auth-button" onClick={handleSave}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}