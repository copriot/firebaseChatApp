import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Message from "../components/Message";
import EmojiPicker from "emoji-picker-react";
const ChatPage = ({ room, setRoom }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const lastMsg = useRef();
  //mesajı veri tabanına kayıt et
  const handleSubmit = async (e) => {
    e.preventDefault();
    //formu temizle
    setText("");
    //emojiPickeri kapat
    setIsOpen(false);
    //mesaj boşmu kontrol et
    if (text.trim() === "") return;

    //mesaj document'in kaydedileceği kolleksiyonun referansını al
    const messageCol = collection(db, "messages");

    //referansı alınan koleksiyona document'i kayıt et
    await addDoc(messageCol, {
      text,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
  };

  //mevcut odada gönderilen mesajları anlık olarak al
  useEffect(() => {
    //abone olunacak kolleksiyon referansı
    const messagesCol = collection(db, "messages");

    //sorgu ayarları yap
    const q = query(messagesCol, where("room", "==", room), orderBy("createdAt", "asc"));

    //onSnapshot: anlık olarak kolleksiyondaki değişimleri izler. kolleksiyon her değiştiğinde callback fn tetikler ve bu fn parametre olarak kolleksiyondaki veriyi alır
    const unsub = onSnapshot(q, (data) => {
      let temp = [];

      data.docs.forEach((doc) => {
        //gelen verinin içinde data fonksiyonu var direk veriye ulastırıyor
        temp.push(doc.data());
      });
      setMessages(temp);
    });

    //kullanıcı sayfadan ayrılınca aboneliği durdur
    return () => unsub();
  }, []);

  //her yeni mesaj eklendiginde
  useEffect(() => {
    //ekrana son mesaj gelene kadar kaydır
    lastMsg.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages.length < 1 ? (
          <div className="warn">
            <p>Sohbete ilk mesajı gönderin</p>
          </div>
        ) : (
          messages.map((i, index) => <Message data={i} />)
        )}
        <div ref={lastMsg} />
      </main>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="mesajınızı yazınız"
        />
        <div>
          <EmojiPicker
            onEmojiClick={(e) => {
              setText((prev) => prev + e.emoji);
            }}
            open={isOpen}
            skinTonePickerLocation="PREVIEW"
          />
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            😎
          </button>
        </div>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
