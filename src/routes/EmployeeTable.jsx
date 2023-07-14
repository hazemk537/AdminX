import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import {
  EyeOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link, json } from "react-router-dom";
import { EVForm } from "../Evform";

export function App() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState(null);
  const [AddModalopen, setAddModalopen] = useState(0);
  const [ViewModalopen,setViewModalOpen]=useState(0)
  const [EditModelOpen,setEditModelOpen]=useState(0)
  const [EVData,setEVData]=useState()
  const confirm = (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`https://alrayademo-back.appssquare.com/api/admin/job-titles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Job title deleted successfully");
          console.log(response);
        } else {
          console.error("Error deleting job title");
          return response.json();
        }
      })
      .then((data) => setData(data.data))
      .catch((error) => console.error(error));

    message.success("Click on Yes");
  };

  function EditViewData(key){
    let Item

    fetch(`https://alrayademo-back.appssquare.com/api/admin/job-titles/${key}`,{
      headers:{Authorization:`Bearer ${token}`},
      Method:'GET',
      "Content-Type": "application/json",
    }).then((response)=>response.json()).then((jsonData)=>{setEVData(jsonData.data);console.log(jsonData.data);})




    setEVData(Item)
    

  }
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const columns = [
    {
      title: "name_ar",
      dataIndex: "name_ar",
      key: "name_ar",
    },
    {
      title: "name_en",
      dataIndex: "name_en",
      key: "name_en",
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "department_name",
      key: "tagdepartment_names",
      dataIndex: "department_name",
      render: (text) => (
        <Tag color={"green"} key={Date()}>
          {text}{" "}
        </Tag>
      ),
    },
    {
      title: "department_id",
      dataIndex: "department_id",
      key: "department_id",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => {
              confirm(record.id);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <EyeOutlined onClick={()=>{setViewModalOpen(1);EditViewData(record.id);}}/>
          <EditOutlined onClick={()=>{setEditModelOpen(1);let element = document.querySelector('.ant-modal-root ');
                element.style.display = 'block';;EditViewData(record.id)}} />
        </Space>
      ),
    },
  ];
 
  
  function handleAddSubmit(values) {
    fetch("https://alrayademo-back.appssquare.com/api/admin/job-titles", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Job title created successfully");
        } else {
          console.error("Error creating job title");
        }
      })
      .catch((error) => console.error(error));

    setAddModalopen(0);
  }

  function habdleAddCancel(){
    setAddModalopen(0)

    
  }
  useEffect(() => {
    fetch("https://alrayademo-back.appssquare.com/api/admin/job-titles", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Language": "en",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {setData(data.data);console.log(data)})
      .catch((error) => console.error(error));
  }, []);

  return (
    data && (
      <>
        <Button onClick={() => setAddModalopen(1)}>
          {" "}
          <UserAddOutlined /> Add New{" "}
        </Button>
        <Table columns={columns} dataSource={data} />
        <Modal title="Add New Employee" open={AddModalopen} onCancel = {habdleAddCancel} footer={null}>
          <Form
            onFinish={handleAddSubmit}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            autoComplete="off"
          >
            
            <Form.Item
              label="Name EN"
              name="name_en"
              rules={[
                {
                  required: true,
                  message: "Please input The employee Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="NameAR"
              name="name_ar"
              rules={[
                {
                  required: true,
                  message: "Please input  username in Arabic!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="DepartmentID"
              name="department_id"
              rules={[
                {
                  required: true,
                  message: "Please input  Department ID!",
                },
              ]}
            >
              <Input />
            </Form.Item>
       
          
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal title="Basic Modal" open={ViewModalopen} onCancel = {()=>setViewModalOpen(0)} footer={null}>
        {EVData && <EVForm data={EVData} type="view"/>}
        </Modal>
        <Modal title="Basic Modal" open={EditModelOpen} onCancel = {()=>{setEditModelOpen(0)}} footer={null}>
         
                 {EVData && <EVForm data={EVData} type="edit"/>} 


        </Modal>
      </>
    )
  );
}

export default App;
