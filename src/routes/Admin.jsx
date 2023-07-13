import React, { useEffect, useLayoutEffect, useState } from "react";
import {  Button, DatePicker, Layout, Menu , Space, Switch, theme} from "antd";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const { Header, Content, Sider } = Layout;



const Admin = () => {

  const navigate=useNavigate()
  const {t,i18n}=useTranslation()
  const [lng,setLng]=useState("en")
  const [rtl,setRtl]=useState(0)

  

  //remebmber lang from last session
  useLayoutEffect(()=>{  
    const x= (JSON.parse(localStorage.getItem("rtl")))

  x?i18n.changeLanguage("ar"):i18n.changeLanguage("en")
  setRtl(x)


  },[])
  
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
  {
    key: baseKey+6,
    label: <Link to="/admin/employee">{t("employee")}</Link>,
  },


];


  const logoutHandle =  ()=>{
    localStorage.setItem("isLoggedIn",0)
    navigate("/")
  
  
  }
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  console.log(rtl)


  return (
    
    <Layout  style={{direction:`${rtl?"rtl":"ltr"}` ,padding:0  }}> 

      <Header
        style={{
          display: "flex",
          padding:0,
          alignItems: "center"
        }}
      >
        <Button  style={{
          color:"white",
          backgroundColor:"inherit",
          
          }} onClick={logoutHandle} >{t("logout")} </Button>
          <Switch style={{marginLeft:"50px"}} checkedChildren="en" unCheckedChildren="ar" onClick={(checked)=>{i18n.changeLanguage(checked?"en":"ar");setLng(checked?"en":"ar");setRtl(checked?0:1);setTimeout(localStorage.setItem("rtl",!rtl),10)}} checked={i18n.language==='en'?true:false}  /> 
          {/* TODO why should invert the val to store in local storage  */}
 
 
 
      </Header>
      <Layout  >
        <Sider
          width={200}
         
          
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