import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  InfoCircleOutlined,
  StarOutlined,
  DownloadOutlined,
  FacebookOutlined,
  TwitterOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { Switch } from "antd";

export default function Root() {
  const {t}=useTranslation()

  const navigate = useNavigate();
  //Todo opened using localstorgae

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const Wrapper = styled.div`
    body {
      /* todo */
      background: linear-gradient(to left, #bb9fb8, transparent);
      font-family: "Orbitron", sans-serif;
      font-family: sans-serif;
      color: #d9d9d9;
    }

    header {
      margin-left: 100px;
      margin-right: 100px;
      margin-top: 5%;
      display: flex;
      justify-content: space-around;
    }

    span {
      /* margin-right: 1.5rem; */
      cursor: pointer;
      color: #0077cc;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
    }

    span:hover {
      color: #ff2a2a;
    }

    h1 {
      font-size: 3rem;
      text-align: center;
      margin-top: 10rem;
      color: #0077cc;
    }

    button {
      display: block;
      margin: 0 auto;
      background-color: #0077cc;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    span:hover::before {
      content: attr(data-text);
      position: absolute;
      top: -2rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #0077cc;
      color: #d9d9d9;
      padding: 0.5rem;
      border-radius: 5px;
      font-size: 0.8rem;
      white-space: nowrap;
    }
  `;

  return (
    <Wrapper>

      <div className="">
        <header className="header">
        <span data-text={t("about")}>
            <InfoCircleOutlined />{" "}
          </span>
          <span data-text={t("features")}>
            <StarOutlined />{" "}
          </span>
          <span data-text={t("download")}>
            <DownloadOutlined />{" "}
          </span>
          <span data-text={t("facebook")}>
            <FacebookOutlined />{" "}
          </span>
          <span data-text={t("twitter")}>
            <TwitterOutlined />{" "}
          </span>
          <span data-text={t("email")}>
            <MailOutlined />{" "}
          </span>
        </header>

        <h1 className="H1">{t("greeting")}</h1>
        <button className="button" onClick={handleClick}>
          {t("gotoButton")}
        </button>
      </div>
    </Wrapper>
  );
}