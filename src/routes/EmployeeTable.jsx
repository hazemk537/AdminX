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
  const [data, setData] = useState([{ name: "", email: "", age: "" }]);
  const [editFormDisplay, setEditFormDisplay] = useState(false);
  const [viewFormDisplay, setViewFormDisplay] = useState(false);
  const [addFormDisplay, setAddFormDisplay] = useState(false);
  const [selectedrow, setSelectedrow] = useState({});
  const [selectedrowID, setSelectedrowID] = useState({});
  const [revalidateData, setRevalidateData] = useState(false);
  const [isLoading,setisLoading]=useState(false)
  const deleteElement = (id) => {
    setisLoading(true)

    fetch(
      `https://portfolio-api-xi-ecru.vercel.app/api/employee/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Job title deleted successfully");
          setRevalidateData((old) => !old);
        } else {
          console.log("Error deleting job title");
          return response.json();
        }
      })
      .then((data) => setData(data))
      .catch((error) => console.log(error));
    setisLoading(false)

  };
  const postHandler = (formData) => {
    setisLoading(true)

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
          console.log("Error creating New Emplyee ");
        }
      })
      .catch((error) => console.log(error));
    setRevalidateData((old) => !old);
    setisLoading(false)

  };

  const putHandler = (formData) => {
    // get data from form
    setisLoading(true)

    fetch(
      `https://portfolio-api-xi-ecru.vercel.app/api/employee/edit/${selectedrowID}`,
      {
        //id ?? of the clicked/showen emplyeee
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("New Emplyee  edited successfully");
        } else {
          console.log("Error editing New Emplyee ");
        }
      })
      .catch((error) => console.log(error));
    // make the put request
    // in the forms collect data and send to the submit handlers
    // pass close and open functs to the modal
    setRevalidateData((old) => !old);
    setisLoading(false)

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

              const temp = data.filter((item) => item._id === record._id);
              setSelectedrow(temp);
            }}
          />
          <EditOutlined
            onClick={() => {
              toggleModel("edit");
              //get data by id
              const temp = data.filter((item) => item._id === record._id);
              setSelectedrow(temp);
              setSelectedrowID(record._id);
            }}
          />
        </Space> //element null problem
      ),
    },
  ];

  function toggleModel(type) {
    // console.log(type)
    if (type === "edit") setEditFormDisplay((old) => !old);
    else if (type === "view") setViewFormDisplay((old) => !old);
    else if (type === "new") setAddFormDisplay((old) => !old);
  }

  // NOTE console.log("here") times
  useEffect( () => {
    // NOTE console.log("here") 1times
    const effectFunction=async ()=>{
      setisLoading(true)
    try {
      const response = await fetch(
        "https://portfolio-api-xi-ecru.vercel.app/api/employee/show",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Language": "en",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      }
    } catch (err) {
      console.log(err);
    }
    setisLoading(false)

  }
  effectFunction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidateData]);
  return (
    <div className="employee-table">
      { isLoading&& <Spinner type="employee" />}
      <Button onClick={toggleModel.bind(this, "new")}>
        {" "}
        <UserAddOutlined /> Add New{" "}
      </Button>
      {/* note -> table need at least on object element */}
      {
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 6 }}
        />
      }{" "}
      {viewFormDisplay && (
        <Modal
          CancelText="Cancel"
          confirmText="Confirm"
          toggleDisplayHandler={toggleModel.bind(this, "view")}
          header="view Current Employee"
          itemData={selectedrow}
        >
          <Form
            toggleDisplayHandler={toggleModel.bind(this, "view")}
            type="view"
            data={selectedrow}
            collectData
          />
        </Modal>
      )}{" "}
      {editFormDisplay && (
        <Modal
          CancelText="Cancel"
          confirmText="Confirm"
          toggleDisplayHandler={toggleModel.bind(this, "edit")}
          header="Edit Current Employee"
          itemData={selectedrow}
          confirmHandler={putHandler}
        >
          <Form
            toggleDisplayHandler={toggleModel.bind(this, "edit")}
            onSubmit={putHandler}
            confirmText="Submit"
            type="edit"
            data={selectedrow}
          />
        </Modal>
      )}
      {addFormDisplay && (
        <Modal
          CancelText="Cancel"
          confirmText="Confirm"
          toggleDisplayHandler={toggleModel.bind(this, "new")}
          header="Add New Employee"
          confirmHandler={postHandler}
        >
          <Form
            toggleDisplayHandler={toggleModel.bind(this, "new")}
            onSubmit={postHandler}
            confirmText="Submit"
            type="new"
            data={selectedrow}
          />
        </Modal>
      )}
    </div>
  );
}

export default EmployeeTable;
