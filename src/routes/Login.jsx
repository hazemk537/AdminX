import { Alert, Button, Checkbox, Form, Input } from "antd";
import { use } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({email:"hr@gmail.com",password:"123456789"});
  const [rememberPassword, setRememberPassword] = useState(false);
  const [isLoggin,setLogin]=useState(0)
  const navigate = useNavigate();
  //remebmber lang from last session
  const x = JSON.parse(localStorage.getItem("rtl"));
  useEffect(() => {
    x ? i18n.changeLanguage("ar") : i18n.changeLanguage("en");
  }, []);

  const handleCheckboxChange = (event) => {
    setRememberPassword(event.target.checked);
  };
  function successLogin(data){
        
    localStorage.setItem("token",JSON.stringify(data.token)) 
    navigate("/admin",{replace:true})


  }
  function onFinish(values) {
          //same format TODO

    fetch("https://alrayademo-back.appssquare.com/api/admin/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
    .then(response => response.json())
    .then(data => {if(data.staus) {setLogin(1);console.log(isLoggin);successLogin(data);}})
    .catch(error => console.error(error));

    

  }
  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }
  
  return (
    <div className="login-form" style={{ direction: `${x ? "rtl" : "ltr"}` }}>
      <div className="alerts">
      <Alert message={`${t("email")}:  hr@gmail.com `} type="info" showIcon />
      <Alert message={`${t("password")}: 123456789 `} type="info" showIcon />
      {isLoggin && <Alert type="success"  message="Success Login"  showIcon/>}

      </div>
      <Form 
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
        initialValues= {formData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item 
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input defaultValue={formData.email} />
        </Form.Item>

        <Form.Item defaultValue ={formData.password}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password defaultValue={formData.password} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary"  htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* TODO whyif isloggin =0 it will mount 0 and if 1 it will mount the alert */}
    
    </div>
  );
}
