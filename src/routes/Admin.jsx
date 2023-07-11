import React, { useState } from "react";
import {  Button, Layout, Menu , theme} from "antd";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const { Header, Content, Sider } = Layout;



const Admin = () => {
  
  const navigate=useNavigate()
  const {t}=useTranslation()


let categories=[
  t("smartphones"),t(
  "laptops"),t(
  "fragrances"),t(
  "skincare"),t(
  "groceries"),t(
  "homeDecoration"),t(
  "furniture"),t(
  "tops"),t(
  "womensDresses"),t(
  "womensShoes"),t(
  "mensShirts"),t(
  "mensShoes"),t(
  "mensWatches"),t(
  "womensWatches"),t(
  "womensBags"),t(
  "womensJewellery"),t(
  "sunglasses"),t(
  "automotive"),t(
  "motorcycle"),t(
  "lighting")
]

const baseKey=categories.length

const items2 = [
  {
    key: baseKey+1,
    label: <Link to="/admin/summary">{t("summary")}</Link>,
    children: [
      { key: baseKey+2,label: <Link to="/admin/summary/products">{t("allProducts")}</Link> },
      {
        label: t("perCategory"),
        children: categories.map((item,index) => ({
          key:index+3,
          label: <Link to={`/admin/summary/category/${item}`}>{item}</Link>,
        })),
      },
    ],
  },
  {
    key: baseKey+4,
    label: <Link to="/admin/products">{t("products")}</Link>,
  },
  {
    key: baseKey+5,
    label: <Link to="/admin/users">{t("users")}</Link>,
  },
];


  const logoutHandle =  ()=>{
    localStorage.setItem("isLoggedIn",0)
    navigate("/")
  
  
  }
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const [language, setLanguage] = useState(null);

function handleSwitch(checked){
  checked?setLanguage("EN"):setLanguage("AR")
  console.log("s")


}
  return (
    
    <Layout > 
      <Header
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Button  style={{
          color:"white",
          backgroundColor:"inherit",
          
          }} onClick={logoutHandle} >{t("logout")} </Button>
 
 
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer
          }}
        >

          <Menu
          defaultOpenKeys={[`${baseKey+1}`]}
          defaultSelectedKeys={[`${baseKey+4}`]}
          theme="dark"
          mode="inline"
          items={items2}
        />
          
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px"
          }}
        >
          
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );

};
export default Admin;