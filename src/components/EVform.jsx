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

// SHOULD REDUX change vlag to refresh ! no way no local storage

//kill without open property NO REDUX
let element = document.querySelector('.ant-modal-root');
element.style.display = 'none';
element.style.visibility='hidden'


}
export const EVForm= ({data,type}) => {
  if (type==="view") 
  { return (
        
    <Form  
   
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
    initialValues={data}
   >
 {  
         Object.keys(data).map((key) => {
   
             return (


   <Form.Item
   value={data.key}//TODO vs intials
    // should be distinct key not simply name,department_id...
    key={"view"+key} 
    label={key.toUpperCase().replace('_', ' ')}
     name={key}
     rules={[
       {
         required: true,
         message: `Please input ${key.toUpperCase().replace('_', ' ')}!`,
       },
     ]}
   >
     <Input  disabled/>
   </Form.Item>

 )})}
 

 {type==="edit"&&(

   <>      <Form.Item
   label="ID"
    name="id"

     >
     <Input   disabled/>
   </Form.Item>

 
 <Form.Item>
     <Button type ="primary" htmlType="submit"> Save Changes </Button>

 </Form.Item>
 </>
)}
 </Form> 
)}
else {
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
       initialValues={data}
      >
    {  
            // eslint-disable-next-line array-callback-return
            Object.keys(data).map((key) => {
                if ( key=== "name_ar"||key === "name_en" )                
                return (


      <Form.Item
      value={data.key}//TODO vs intials
       // should be distinct key not simply name,department_id...
       key={"edit"+ key} 
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
    

    {type==="edit"&&(

      <>      <Form.Item
      label="ID"
       name="id"

        >
        <Input   disabled/>
      </Form.Item>

    
    <Form.Item>
        <Button type ="primary" htmlType="submit"> Save Changes </Button>

    </Form.Item>
    </>
)}
    </Form> 
)}}