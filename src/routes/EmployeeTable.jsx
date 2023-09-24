import React, { useEffect, useState } from "react";

import { Button, Space, Table, Tag } from "antd";
import { EyeOutlined, UserAddOutlined, EditOutlined } from "@ant-design/icons";
import Spinner from "../components/Spinner";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import { Form } from "../components/Form";
export function EmployeeTable() {
  const token = JSON.parse(localStorage.getItem("token"));
  // eslint-disable-next-line no-unused-vars
  const [t] = useTranslation();
  const [data, setData] = useState(null);
  const [editFormDisplay, setEditFormDisplay] = useState(false);
  const [viewFormDisplay, setViewFormDisplay] = useState(false);
  const [addFormDisplay, setAddFormDisplay] = useState(false);
  const [selectedrow, setSelectedrow] = useState({});
  const [reFetchFlag, setReFetchFlag] = useState(0);

  const deleteElement = (id) => {
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

    setReFetchFlag(!reFetchFlag);
  };
  const postHandler = (formData) => {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch("https://portfolio-api-xi-ecru.vercel.app/api/employee/new", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("New Emplyee  created successfully");
        } else {
          console.error("Error creating New Emplyee ");
        }
      })
      .catch((error) => console.error(error));
  };

  const putHandler = (formData) => {
    const token = JSON.parse(localStorage.getItem("token"));

    fetch("https://portfolio-api-xi-ecru.vercel.app/api/employee/edit/", {
      //id ?? of the clicked/showen emplyeee
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("New Emplyee  edited successfully");
        } else {
          console.error("Error editing New Emplyee ");
        }
      })
      .catch((error) => console.error(error));
    // make the put request
    // in the forms collect data and send to the submit handlers
    // pass close and open functs to the modal
  };
  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      render: (text) => (
        <Tag color={"green"} key={Date()}>
          {text}{" "}
        </Tag>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => deleteElement(record._id)}> Delete </button>

          <EyeOutlined
            onClick={() => {
              toggleModel("view");
             
              const temp=data.filter((item)=>item._id===record._id)
              setSelectedrow(temp)
            }}
          />
          <EditOutlined
            onClick={() => {
              toggleModel("edit");
              //get data by id
              const temp=data.filter((item)=>item._id===record._id)
              setSelectedrow(temp)

            }}
          />
        </Space> //element null problem
      ),
    },
  ];

  function toggleModel(type) {
    if (type === "edit") setEditFormDisplay((old) => !old);
    else if (type === "view") setViewFormDisplay((old) => !old);
    else if (type === "add") setAddFormDisplay((old) => !old);
  }

  // NOTE console.log("here") 2times
  useEffect(() => {
    // NOTE console.log("here") 1times

    fetch("https://portfolio-api-xi-ecru.vercel.app/api/employee/show", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Language": "en",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!data) return <Spinner type="employee" />;
  return (
    <div className="employee-table">
      <Button onClick={toggleModel.bind(this, "add")}>
        {" "}
        <UserAddOutlined /> Add New{" "}
      </Button>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 6 }} />
      {viewFormDisplay && (
        <Modal
          CancelText="Cancel"
          ConfirmText="Confirm"
          onOpen={toggleModel.bind(this, "view")}
          onClose={toggleModel.bind(this, "view")}
          header="view Current Employee"
          itemData={selectedrow}
        >
          <Form type="view" data={selectedrow} />
        </Modal>
      )}{" "}
      {editFormDisplay && (
        <Modal
          CancelText="Cancel"
          ConfirmText="Confirm"
          onToggle={toggleModel.bind(this, "edit")}
          header="Edit Current Employee"
          itemData={selectedrow}
          onSubmit={putHandler}
        >
          <Form type="edit" data={selectedrow} />
        </Modal>
      )}
      {addFormDisplay && (
        <Modal
          CancelText="Cancel"
          ConfirmText="Confirm"
          onToggle={toggleModel.bind(this, "new")}
          header="Add New Employee"
          onSubmit={postHandler}
        >
          <Form type="new" data={selectedrow} />
        </Modal>
      )}
    </div>
  );
}

export default EmployeeTable;
