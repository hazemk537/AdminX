import { Alert, Button, Checkbox, Form, Input } from "antd";
import {LoadingOutlined} from '@ant-design/icons'
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { t, i18n } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({email:"hr@gmail.com",password:"123456789",remember:true});
  // eslint-disable-next-line no-unused-vars
  const [rememberPassword, setRememberPassword] = useState(true);
  const [isReceive,setRecived]=useState(false)
  const [isRemember,setRemember]=useState(true)

  const navigate = useNavigate();
  //remebmber lang from last session
  const x = JSON.parse(localStorage.getItem("rtl"));
  useEffect(() => {
    x ? i18n.changeLanguage("ar") : i18n.changeLanguage("en");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  function successLogin(data){
    // setLogin(true);
    if (isRemember){
      localStorage.setItem("remember",JSON.stringify(1)) 
   }
   localStorage.setItem("token",JSON.stringify(data.token)) 
   setTimeout( navigate("/admin",{replace:true}),10000)

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
    .then(response =>{ setRecived(true);return response.json()})
    .then(jsonData => {if(jsonData.status===true) {successLogin(jsonData);}})
    .catch(error => console.error(error));

    

  }
  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }
  
  return (
    <>
          <Alert message="IF Sys Not let you  login in. so it is an API issue ,plz, click Hack Btn   " type="info"/>

    <div className="login-form" style={{ direction: `${x ? "rtl" : "ltr"}` }}>
      <div className="alerts">

      <Alert message={`${t("email")}:  hr@gmail.com `} type="info" showIcon />
      <Alert message={`${t("password")}: 123456789 `} type="info" showIcon />
      {isReceive && <Alert type="info"   message="Parsing Response ... "  showIcon icon={<LoadingOutlined/>}/>}
      {/* {isLoggin && <Alert type="success"  message="Success Login"  showIcon />} */}
      {/* TODO canoot popup login success and delay logn */}

      </div>
      <Form 
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
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
          <Input  />
        </Form.Item>

        <Form.Item 
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
          <Checkbox onClick={()=>    setRemember(!isRemember)
}>Remember me</Checkbox>
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
          <Button style={{}} onClick={()=> {setTimeout( navigate("/admin",{replace:true}),10000)}} >HACK </Button>

          
        </Form.Item>
      </Form>

      {/* TODO whyif isloggin =0 it will mount 0 and if 1 it will mount the alert */}
    
    </div>

         
    </>

  );
}