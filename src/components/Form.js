import { useRef } from "react";

export const Form = (props) => {
  //3 form in one
  const objectFromArray=props.data.at(0)
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
            // ref={key + "Ref"}
            key={objectFromArray[key] + objectFromArray.email}
            type={key === "age" ? "number" : "text"}
            disabled={key === "_id" ? true : false}
            value={props.type === "new" ? " " : objectFromArray[key]}
          />
        </label>
      );
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(Object.fromKeys(event.target));
    // props.onSubmit(Object.fromKeys(event.target)); //todo
    // console.log(emailRef.current);
    props.onSubmit([ageRef.current, emailRef.current, nameRef.current]);
  };
  return (
    <form onSubmit={submitHandler}>
      {Object.keys(objectFromArray).map(mapHandler)}

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
