import { Button, Form, Input } from "antd"

function handlePUT(values){
const token=JSON.parse(localStorage.getItem("token"))

fetch(`https://alrayademo-back.appssquare.com/api/admin/job-titles/${values.id}`,{
    method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name_ar:values.name_ar,name_en:values.name_en})
    })
.then((response)=>response.json())
.then((jsonData)=>console.log(jsonData))//TODO edit only effected
.catch((err)=>{console.log(err)})
let element = document.querySelector('.ant-modal-root ');
element.style.display = 'none';




}
export const EVForm= ({data,type}) => {
console.log(type)
    return (
        
       <Form onFinish={handlePUT} 
      
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
      initialValues={data}>
    {  
            Object.keys(data).map((key) => {
                if ( type=== "edit" && (key === "id" ||key === "name" || key === "department_id"||key === "department_name"))
                return <></>
                
                return (

      <Form.Item
      value={data.key}
        key={key}
        label={key.toUpperCase().replace('_', ' ')}
        name={key}
        rules={[
          {
            required: true,
            message: `Please input ${key.toUpperCase().replace('_', ' ')}!`,
          },
        ]}
      >
        <Input />
      </Form.Item>
    )})}

    {type==="edit"&&(<Form.Item>
        <Button type ="primary" htmlType="submit"> Save Changes </Button>

    </Form.Item>)}
    </Form> 
)}