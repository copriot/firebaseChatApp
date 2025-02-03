import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";

const LoginPage = ({ setIsAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        //giriş yetkisini true çek
        setIsAuth(true);
        //sayfa yenilenince tekrar giriş yapmak zorunda olmasın diye localde tokeni sakla
        localStorage.setItem("token", res.user.refreshToken);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="g-logo.png" alt="google logo" width={40} />
          <span>Google Hesabıyla Giriş Yap</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
