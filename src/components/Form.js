import { useRef } from "react";

export const Form = (props) => {
  //3 form in one
  const objectFromArray = props.data.at(0);
  const ageRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const mapHandler = (key) => {
    // console.log(objectFromArray)
    if (key === "age" || key === "email" || key === "name") {
      return (
        <label>
          {key}:
          <input
            ref={key === "age" ? ageRef : key === "email" ? emailRef : nameRef}
            key={objectFromArray[key] + objectFromArray.email}
            type={key === "age" ? "number" : "text"}
            disabled={key === "_id" ? true : false}
            defaultValue={props.type === "new" ? " " : objectFromArray[key]}
          />
        </label>
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
      age: ageRef.current,
      email: emailRef.current,
      name: nameRef.current,
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

//  high
//  - css module, backdrop
//  - confirm->close,request
// - cancel ->close
//- x-->close
//- delete button

// lower
//  style dlt btn
