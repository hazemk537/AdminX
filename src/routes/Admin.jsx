import React from "react";
import {  Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from 'react-router-dom';
const { Header, Content, Sider } = Layout;
let categories=[
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting"
]

const baseKey=categories.length

const items2 = [
  {
    key: baseKey+1,
    label: <Link to="/admin/summary">Summary</Link>,
    children: [
      { key: baseKey+2,label: <Link to="/admin/summary/products">All Products</Link> },
      {
        label: 'Per Category',
        children: categories.map((item,index) => ({
          key:index+3,
          label: <Link to={`/admin/summary/category/${item}`}>{item}</Link>,
        })),
      },
    ],
  },
  {
    key: baseKey+4,
    label: <Link to="/admin/products">Products</Link>,
  },
  {
    key: baseKey+5,
    label: <Link to="/admin/users">Users</Link>,
  },
];





const Admin = () => {
  
  const navigate=useNavigate()
  const logoutHandle =  ()=>{
    localStorage.setItem("isLoggedIn",0)
    navigate("/")
  
  
  }
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    
    <Layout > 


      <Header
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <button  style={{
          alignSelf:"center"
          ,borderRadius:"20%",
          color:"white",
          backgroundColor:"inherit",
          cursor: "pointer",
          
          }}onClick={logoutHandle} >Log out </button>
 
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