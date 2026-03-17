"use client";

import { useEffect } from "react";
import Script from "next/script";
import { getAuth } from "firebase/auth";

export default function BotpressChat() {
  useEffect(() => {
    const loadBot = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      const token = await user.getIdToken();

      // 👉 fetch user data from your API (or Firebase client)
      const res = await fetch("/api/get-user-dashboard", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dashboardData = await res.json();

      window.botpressWebChat.init({
        botId: "BOT_ID",
        clientId: "CLIENT_ID",
        user: {
          data: {
            firebaseToken: token,
            dashboard: dashboardData, // ✅ send data to bot
          },
        },
      });
    };

    loadBot();
  }, []);

  return (
    <>
      <Script
        src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://files.bpcontent.cloud/2026/03/16/08/20260316080018-04BMH0F7.js"
        strategy="afterInteractive"
      />
    </>
  );
}