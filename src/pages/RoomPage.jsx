import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const RoomPage = ({ setIsAuth, setRoom }) => {
  const logOut = () => {
    //yetki state'ini false çek
    setIsAuth(false);

    //localStorage dan tokeni kaldır
    localStorage.removeItem("token");

    //firebase oturumunu kapat
    signOut(auth);
  };

  //form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    //inputtaki girdiyi al
    const room = e.target[0].value.toLowerCase();
    //seçilen oda stateini güncelle
    setRoom(room);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="room-page">
        <p>Dev.Z</p>
        <h1>Chat Odası</h1>
        <p>Hangi Odaya Gireceksiniz ?</p>
        <input type="text" placeholder="örn:Laklak" required />
        <button type="submit">Odaya Gir</button>
        <button type="button" onClick={logOut}>
          Çıkış Yap
        </button>
      </form>
    </div>
  );
};

export default RoomPage;
