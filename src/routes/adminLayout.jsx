import React, { useLayoutEffect, useState } from "react";
import { Button, Layout, Menu, Switch } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from '../custom.module.css'
const { Header, Content, Sider } = Layout;

const AdminLayout = () => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [lng, setLng] = useState("en")  ;
  const [rtl, setRtl] = useState(0);

  //remebmber lang from last session
  useLayoutEffect(() => {
    const x = JSON.parse(localStorage.getItem("rtl"));

    x ? i18n.changeLanguage("ar") : i18n.changeLanguage("en");
    setRtl(x);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let categories = [
    t("smartphones"),
    t("laptops"),
    t("fragrances"),
    t("skincare"),
    t("groceries"),
    t("homeDecoration"),
    t("furniture"),
    t("tops"),
    t("womensDresses"),
    t("womensShoes"),
    t("mensShirts"),
    t("mensShoes"),
    t("mensWatches"),
    t("womensWatches"),
    t("womensBags"),
    t("womensJewellery"),
    t("sunglasses"),
    t("automotive"),
    t("motorcycle"),
    t("lighting"),
  ];

  const items2 = [
    {
      key: "summary",
      label: <Link to="/admin/summary">{t("summary")}</Link>,
      children: [
        {
          key: "allProducts",
          label: (
            <Link to="/admin/summary/allProducts">{t("allProducts")}</Link>
          ),
        },
        {
          label: t("perCategory"),
          children: categories.map((item) => ({
            key: item,
            label: <Link to={`/admin/summary/category/${item}`}>{item}</Link>,
          })), //to git rid of repeat keys problem
        },
      ],
    },
    {
      key: "products",
      label: <Link to="/admin/products">{t("products")}</Link>,
    },
    
    {
      key: "employee",
      label: <Link to="/admin/employee">{t("employees")}</Link>,
    },
  ];

  const logoutHandle = () => {
    localStorage.setItem("remember", null);
    navigate("/");
  };
  // eslint-disable-next-line no-empty-pattern

  return (
    <Layout  style={{ direction: `${rtl ? "rtl" : "ltr"}`, padding: 0 }}>
      <Header className={styles.LayoutHeader}
       
      >
        
        <Button
          style={{
            color: "white",
            backgroundColor: "inherit",
          }}
          onClick={logoutHandle}
        >
          {t("logout")}{" "}
        </Button>
        <Switch
          style={{ marginLeft: "50px" }}
          checkedChildren="en"
          unCheckedChildren="ar"
          onClick={(checked) => {
            i18n.changeLanguage(checked ? "en" : "ar");
            setLng(checked ? "en" : "ar");
            setRtl(checked ? 0 : 1);
            setTimeout(localStorage.setItem("rtl", !rtl), 10);

          }}
          checked={i18n.language === "en" ? true : false}
        />
        {/* TODO why should invert the val to store in local storage  */}
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            defaultOpenKeys={["summary"]}
            theme="dark"
            mode="inline"
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
