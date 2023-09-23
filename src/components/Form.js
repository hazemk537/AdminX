import { useRef } from "react";

export const Form = (props) => {
  //3 form in one
  const ageRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
console.log(props.data)
  const mapHandler = (key) => {
    if (key === "age" || key === "email" || key === "name") {
      return (
        <label>
          <input
            ref={key + "Ref"}
            key={props.data[key] + props.data.email}
            type={key === "age" ? "number" : "text"}
            disabled={key === "_id" ? true : false}
            value={props.type === "new" ? "" : props.data[key]}
          />
        </label>
      );
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(Object.fromKeys(event.target));
    // props.onSubmit(Object.fromKeys(event.target)); //todo
    console.log(emailRef.current);
    props.onSubmit([ageRef.current, emailRef.current, nameRef.current]);
  };
  return (
    <form onSubmit={submitHandler}>
      {Object.keys(props.data).map(mapHandler)}

      <button type="submit"></button>
    </form>
  );
};
