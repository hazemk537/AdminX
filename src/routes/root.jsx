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

  return (

      <div className="landing-page">
        <header className="header">
        <span data-text={t("about")}>
            <InfoCircleOutlined style={{ color:'#5273de'  }}  color="red"/>{" "}
          </span>
          <span data-text={t("features")}>
            <StarOutlined style={{ color: '#5273de' }} />{" "}
          </span>
          <span data-text={t("download")}>
            <DownloadOutlined  style={{ color: '#5273de' }} />{" "}
          </span>
          <span data-text={t("facebook")}>
            <FacebookOutlined style={{ color: '#5273de' }}  />{" "}
          </span>
          <span data-text={t("twitter")}>
            <TwitterOutlined  style={{ color: '#5273de' }} />{" "}
          </span>
          <span data-text={t("email")}>
            <MailOutlined style={{ color: '#5273de' }} />{" "}
          </span>
        </header>

        <h1 className="H1">{t("greeting")}</h1>
        <button className="button" onClick={handleClick}>
          {t("gotoButton")}
        </button>
      </div>
  );
}