import { useNavigate } from "react-router-dom";
import styles from'../custom.module.css'
import {
  InfoCircleOutlined,
  StarOutlined,
  DownloadOutlined,
  FacebookOutlined,
  TwitterOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  //Todo opened using localstorgae

  const isLoggedIn = JSON.parse(localStorage.getItem("remember"));

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={`landing-page ${styles.home}`}>
      <header className="header">
        <span data-text={t("about")}>
          <InfoCircleOutlined
            style={{ color: "#5273de", fontSize: "24px" }}
            color="red"
          />{" "}
        </span>
        <span data-text={t("features")}>
          <StarOutlined style={{ color: "#5273de", fontSize: "24px" }} />{" "}
        </span>
        <span data-text={t("download")}> 
        {/* TODO problem on big text  */}
          <DownloadOutlined style={{ color: "#5273de", fontSize: "24px" }} />{" "}
        </span>
        <span data-text={t("facebook")}>
          <FacebookOutlined style={{ color: "#5273de", fontSize: "24px" }} />{" "}
        </span>
        <span data-text={t("twitter")}>
          <TwitterOutlined style={{ color: "#5273de", fontSize: "24px" }} />{" "}
        </span>
        <span data-text={t("email")}>
          <MailOutlined style={{ color: "#5273de", fontSize: "24px" }} />{" "}
        </span>
      </header>
      <div className="landing-main">
        <h1 className="H1">{t("greeting")}</h1>
        <button className="button_homepage" onClick={handleClick}>
          {t("gotoButton")}
        </button>
      </div>
    </div>
  );
}
