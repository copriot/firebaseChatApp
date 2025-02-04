import React from "react";
import { auth } from "../firebase";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const Message = ({ data }) => {
  // console.log(data);
  const { text, author, createdAt } = data;

  // createdAt varsa formatla, yoksa "Bilinmeyen Zaman" göster
  const formattedTime = createdAt
    ? format(new Date(createdAt.seconds * 1000), "d MMMM , HH:mm", { locale: tr })
    : "Bilinmeyen Zaman";

  if (auth.currentUser.uid === author.id) {
    return (
      <div className="msg-user">
        <p>{text}</p>
        <p className="time">{formattedTime}</p>
      </div>
    );
  }

  return (
    <div className="msg-other">
      <div>
        <img src={author.photo} alt="user" />
        <div className="time-name">
          <span className="msg-text">{author.name}</span>
          <p className="time">{formattedTime}</p>
        </div>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Message;
