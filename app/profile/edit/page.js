"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setName(data.name || "");
          setRole(data.role || "");
          setBio(data.bio || "");
          setLocation(data.location || "");
          setSkills(data.skills ? data.skills.join(", ") : "");
          setInterests(data.interests ? data.interests.join(", ") : "");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }

      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleSave = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    setSaving(true);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name,
          role,
          bio,
          location,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== ""),
          interests: interests
            .split(",")
            .map((interest) => interest.trim())
            .filter((interest) => interest !== ""),
        },
        { merge: true } // IMPORTANT
      );

      alert("Profile updated successfully!");
      router.push(`/profile/${user.uid}`);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Something went wrong.");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">Edit Profile</div>

        <form onSubmit={handleSave}>

          <input
          className="auth-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
          className="auth-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option className="role-option" value="">Select Role</option>
            <option className="role-option" value="founder">Founder</option>
            <option className="role-option" value="developer">Developer</option>
            <option className="role-option" value="designer">Designer</option>
            <option className="role-option" value="investor">Investor</option>
          </select>

          <textarea
          className="auth-input"
            placeholder="Write a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />

          <input
          className="auth-input"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
          className="auth-input"
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <input
          className="auth-input"
            type="text"
            placeholder="Interests (comma separated)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />

          <button className="auth-button" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
}