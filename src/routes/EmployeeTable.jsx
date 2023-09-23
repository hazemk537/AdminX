import React, {  useEffect,  useState } from "react";

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
  
} from "@ant-design/icons";
import {EVForm} from "../components/EVform";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

 
export function EmployeeTable() {

  const token = JSON.parse(localStorage.getItem("token"));
  // eslint-disable-next-line no-unused-vars
  const [t,i11n]=useTranslation()
  const [data, setData] = useState(null);
  const [AddModalopen, setAddModalopen] = useState(0);
  const [ViewModalopen,setViewModalOpen]=useState(0)
  const [EVData,setEVData]=useState(null)//element is null async error
  const [reFetchFlag,setReFetchFlag]=useState(0)
  const EditModelOpen = useSelector(state => state.EditModelOpen);
   const dispatch = useDispatch()
  const confirm = (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`https://portfolio-api-xi-ecru.vercel.app/api/employee/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Job title deleted successfully");
        } else {
          console.error("Error deleting job title");
          return response.json();
        }
      })
      .then((data) => setData(data.data))
      .catch((error) => console.error(error));

    message.success("Click on Yes");
    setReFetchFlag(!reFetchFlag)
  };

  function EditViewData(key){

    fetch(`https://portfolio-api-xi-ecru.vercel.app/api/employee/${key}`,{
      headers:{Authorization:`Bearer ${token}`},
      Method:'GET',
      "Content-Type": "application/json",
    }).then((response)=>response.json()).then((jsonData)=>{setEVData(jsonData.data);})
    //NOte when set it  rerender again


    

  }
  function  EditData(key){

    const Item=data.filter((item)=>item.id===key)
    setEVData(Item[0])//i need only the first item caz it returns array
    //NOte when set it donot rerender again




  }
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const columns = [
    {
      title: t("name_ar"),
      dataIndex: "name_ar",
      key: "name_ar",
    },
    {
      title: t("name_en"),
      dataIndex: "name_en",
      key: "name_en",
    },
    {
      title: t("id"),
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
          <EditOutlined onClick={()=>{  dispatch({ type: 'EditModelOpen' });
 ;EditData(record.id)}} />
        </Space> //element null problem
      ),
    },
  ];
 
  
  function handleAddSubmit(values) {
    fetch("https://portfolio-api-xi-ecru.vercel.app/api/employee/show", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          setReFetchFlag(!reFetchFlag)
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
  // NOTE console.log("here") 2times
  const PutFlag = useSelector((state) => state.EditModelOpen)
  useEffect(() => {
      // NOTE console.log("here") 1times

    fetch(  "https://portfolio-api-xi-ecru.vercel.app/api/employee/show", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Language": "en",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {setData(data.data)})
      .catch((error) => console.error(error));


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetchFlag,PutFlag]);
if (!data) return <Spinner type="employee"/>
  return (
      <div className="employee-table">
        <Button  onClick={() => setAddModalopen(1)}>
          {" "}
          <UserAddOutlined /> Add New{" "}
        </Button>
        <Table columns={columns} dataSource={data} pagination={{pageSize:6}}/>
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
              name="name"
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
              label="Age"
              name="age"
              rules={[
                {
                  required: true,
                  message: "Please input  Your Age!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input  Your Email!",
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
        <Modal title="View More Data" open={ViewModalopen} onCancel = {()=>setViewModalOpen(0)} footer={null}>
        {EVData && <EVForm data={EVData}  type="view"/>}
        </Modal>
        {/* NOTE model not excutes until flag is open */}
        <Modal title="Edit Employee Data" open={EditModelOpen} onCancel = {()=>{  dispatch({ type: 'EditModelOpen' })
 }} footer={null}>
         
                 {EVData && <EVForm data={EVData} type="edit"/>} 


        </Modal>

      </div>
  );
}

export default EmployeeTable;
