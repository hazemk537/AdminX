import { useRef } from "react";

export const Form = (props) => {
  //3 form in one
  const objectFromArray = props.data[0] || {age:"",email:"",name:""}
  const ageRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const mapHandler = (key) => {
    // console.log(objectFromArray)
    if (key === "age" || key === "email" || key === "name") {
      return (
        <>
        <label htmlFor={`${objectFromArray[key] + objectFromArray.email}`}>
          {key.toUpperCase()}:
          </label>
          <input
            ref={key === "age" ? ageRef : key === "email" ? emailRef : nameRef}
            key={objectFromArray[key] + objectFromArray.email}
            type={key === "age" ? "number" :key==="email"?"email": "text"}
            disabled={key === "_id" ? true : false}
            defaultValue={props.type === "new" ? " " : objectFromArray[key]}
          />
          </>
      );
      //note:value without onchhange will make read only form
      //note: refs canot be a string ref={"ageRef"},make it dynamic #todo1
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(Object.fromKeys(event.target));
    // props.onSubmit(Object.fromKeys(event.target)); //todo
    // console.log(emailRef.current);
    props.onSubmit({
      age: ageRef.current.value,
      email: emailRef.current.value,
      name: nameRef.current.value,
    });
    props.toggleDisplayHandler()

  };
  return (
    <form onSubmit={submitHandler}>
      {Object.keys(objectFromArray).map(mapHandler)}
      {props.confirmText && <button type="submit">{props.confirmText}</button>}
    </form>
  );
};

