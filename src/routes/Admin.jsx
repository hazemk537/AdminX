import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from 'react-router-dom';
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


const items2 = [
  {
    key: 1,
    label: <Link to="/admin/summary">Summary</Link>,
    children: [
      { label: <Link to="/admin/summary/products">All Products</Link> },
      {
        label: 'Per Category',
        children: categories.map((item) => ({
          label: <Link to={`/admin/summary/category/${item}`}>{item}</Link>,
        })),
      },
    ],
  },
  {
    key: 2,
    label: <Link to="/admin/products">Products</Link>,
  },
  {
    key: 3,
    label: <Link to="/admin/users">Users</Link>,
  },
];

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
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
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
          defaultSelectedKeys={["2"]}
          items={items2}
        />
          
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px"
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0"
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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