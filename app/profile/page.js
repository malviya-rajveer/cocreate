"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/src/firebase";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Founder");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
if (user) {

      setUser(user);
      loadProfile(user.uid);

    } else {

      router.push("/login");

    }

  });


    const currentUser = auth.currentUser;

    if (!currentUser) return;

    setUser(currentUser);

    loadProfile(currentUser.uid);

  }, []);

  const loadProfile = async (uid) => {

    const docRef = doc(db, "users", uid);

    const snap = await getDoc(docRef);

    if (snap.exists()) {

      const data = snap.data();

      setName(data.name || "");
      setRole(data.role || "Founder");
      setBio(data.bio || "");
      setSkills(data.skills?.join(", ") || "");
      setInterests(data.interests || "");
      setAvatar(data.avatar || "");

    } else {

      setName(auth.currentUser.displayName || "");
    }

    setLoading(false);

  };

  const handleAvatarUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);

  };

  const handleSave = async () => {

    if (!user) return;

    setSaving(true);

    try {

      await setDoc(doc(db, "users", user.uid), {

        name,
        role,
        bio,
        skills: skills.split(",").map(s => s.trim()),
        interests,
        avatar,
        email: user.email,
        updatedAt: new Date()

      });

      alert("Profile saved successfully");

    } catch (error) {

      console.error(error);
      alert("Error saving profile");

    }

    setSaving(false);

  };

  if (loading) {
    return <div className="profileContainer">Loading...</div>;
  }

  return (

    <div className="profileContainer">

      <div className="profileCard">

        <h1 className="profileTitle">Your Profile</h1>

        {/* Avatar */}

        <div className="avatarSection">

          <img
            src={avatar || "/default-avatar.png"}
            className="avatar"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
          />

        </div>

        {/* Form */}

        <input
          className="profileInput"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="profileInput"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Founder</option>
          <option>Developer</option>
          <option>Designer</option>
          <option>Investor</option>
        </select>

        <textarea
          className="profileInput"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          className="profileInput"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        {/* Skills Preview */}

        <div className="skillsPreview">

          {skills.split(",").map((skill, i) => (

            skill.trim() && (

              <span key={i} className="skillTag">
                {skill.trim()}
              </span>

            )

          ))}

        </div>

        <input
          className="profileInput"
          placeholder="Startup interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <button
          className="profileSaveBtn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

      </div>

    </div>

  );

}
