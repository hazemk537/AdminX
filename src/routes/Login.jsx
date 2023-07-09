import { Alert } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function Login() {
  const {t}=useTranslation()
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleCheckboxChange = (event) => {
    setRememberPassword(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rememberPassword) {
      localStorage.setItem("password", password);
    }
    if (username === "atuny0" && password === "9uQFF1Lh") {
      navigate("/admin",{replace:true});
      localStorage.setItem("isLoggedIn", 1);
    }
    //TODO error in data
  };
  const Style = styled.div`
    form {
      display: flex;


      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      margin-top:20px;
      width: 300px;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    }

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
      color: #333;
    }

    input[type="text"],
    input[type="password"],
    input[type="checkbox"] {
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 5px;
      border: 2px solid #ccc;
      font-size: 16px;
      font-family: Arial, sans-serif;
      width: 100%;
    }

    input[type="checkbox"] {
      margin-left: 10px;
    }

    button[type="submit"] {
      background-color: #0077cc;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
    }

    button[type="submit"]:hover {
      background-color: #005fa3;
    }
  `;
  return (

    <Style>
      <Alert message="UserName: atuny0 " type="success" />
      <Alert message="Password: 9uQFF1Lh  " type="success" />
      <form onSubmit={handleSubmit}>
        <label>
        {t("userName")}
          <input type="text" value={username} onChange={handleUserNameChange} />
        </label>
        <label>
          {t("password")}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label>
          {t("rememberPassword")}
          <input
            type="checkbox"
            checked={rememberPassword}
            onChange={handleCheckboxChange}
          />
        </label>
        <button type="submit">{t("login")}</button>
      </form>
    </Style>
  );
}
