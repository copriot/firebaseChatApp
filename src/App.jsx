import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";
const App = () => {
  //kullanıcının yetkisi varmı state 'i
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token" || false));

  //kullanıcının girmek istedigi oda statei
  const [room, setRoom] = useState(null);

  //yetkisi yoksa login page'i ekrana bas
  if (!isAuth) return <LoginPage setIsAuth={setIsAuth} />;

  //oda seçildiyse sohbet sayfası : oda seçilmediyse oda seçme sayfasına yönlendir
  return (
    <div className="container">
      {room ? (
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        <RoomPage setIsAuth={setIsAuth} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
