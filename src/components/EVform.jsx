import { Button, Form, Input } from "antd"
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

 export const EVForm= ({data,type}) => {
  
  // console.log(data)// TODO when evform called again with new data it donot change
  const [datas,setDatas]=useState(data)
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const EditModelOpen = useSelector(state => state.EditModelOpen);
  const dispatch = useDispatch()
  // form.setFieldsValue(datas);

console.log(EditModelOpen)
  function handlePUT(values){
    const token=JSON.parse(localStorage.getItem("token"))
    console.log(values.id)

    
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
    
    // NOTE ODO SHOULD REDUX change vlag to refresh ! no way no local storage
        // NOTE ODO SHOULD REDUX change icon edit flag canot make it hidden 
    //NOTE kill without open property NO REDUX
  
    
    dispatch({ type: 'EditModelOpen' })


    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setDatas(data);
    form.setFieldsValue(datas);
    form2.setFieldsValue(datas);


    });
  if (type==="view") 
  { return (
        
    <Form  form={form}
   
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
    initialValues={datas}
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
        
       <Form form={form2}
       onClose
       onFinish={handlePUT} 
      
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
       initialValues={datas}//Note should be reset on each rerender 
      >
    {  
            // eslint-disable-next-line array-callback-return
            Object.keys(data).map((key) => {
                if ( key=== "name_ar"||key === "name_en" )                
                return (


      <Form.Item
      //TODO vs intials
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
 //NOTE  prevent the second render but will not change when data change