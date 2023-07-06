
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Root() {
  const navigate=useNavigate()
  const [isLoggedIn,setiskogin]=useState(true)
  //Todo opened using localstorgae
  const handleClick = () => {
    if (isLoggedIn) {
      navigate("admin")
    } else {
      navigate("signup")

     }
  };

  return (
    <div>
      <h1>Welcome to my site!</h1>
      <button onClick={handleClick}>Go to Admin Page</button>
    </div>
  );
}