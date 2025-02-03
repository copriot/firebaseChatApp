import React from "react";
import { auth } from "../firebase";

const ChatPage = ({ room, setRoom }) => {
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>mesajlar</main>

      <form className="message-form">
        <input type="text" placeholder="mesajınızı yazınız" />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
