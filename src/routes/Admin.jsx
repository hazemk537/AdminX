import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from 'react-router-dom';
import { styled } from "styled-components";
const { Header, Content, Sider } = Layout;
const items1 = ["Summary", "Products", "Users"].map((key) => ({
  key,
  label: `${key}`
}));
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
      { label: <Link to="/admin/summary/products">All Products</Link> },
      {
        label: 'Per Category',
        children: categories.map((item,index) => ({
          key:index+1,
          label: <Link to={`/admin/summary/category/${item}`}>{item}</Link>,
        })),
      },
    ],
  },
  {
    key: baseKey+2,
    label: <Link to="/admin/products">Products</Link>,
  },
  {
    key: baseKey+3,
    label: <Link to="/admin/users">Users</Link>,
  },
];




const Logo=styled.img`
height:95%;
width:5%;
border-radius:50%;


`
const Admin = () => {
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
        <Logo src="adminx.jpeg" alt="" title="Welcome to AdminX ! "/>   
 
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer
          }}
        >
          <Menu
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