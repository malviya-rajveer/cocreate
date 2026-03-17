import BotpressChat from "../components/chat-bot";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
          {children} 
          <BotpressChat></BotpressChat>
      </body>
    </html>
  );
}
