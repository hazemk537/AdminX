import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  InfoCircleOutlined,
  StarOutlined,
  DownloadOutlined,
  FacebookOutlined,
  TwitterOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { styled } from "styled-components";
export default function Root() {
  const navigate = useNavigate();
  //Todo opened using localstorgae

  const isLoggedIn=localStorage.getItem("isLoggedIn")

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const Wrapper=styled.div`
  body {
    /* todo */
   
    background: linear-gradient(to left, rgb(187, 159, 184), transparent);      
    font-family: "Orbitron", sans-serif;
    font-family: sans-serif;
    color: #d9d9d9;

  }
  

  header {
    margin-left: 100px;
    margin-right: 100px;

    margin-top: 5%;
    display: flex;
    justify-content: space-around; 
  }
  
   span {
    /* margin-right: 1.5rem; */
    cursor: pointer;
    color: #6b238e;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
  }
  
   span:hover {
    color: #ff2a2a;
  }
  
   h1 {
    font-size: 3rem;
    text-align: center;
    margin-top: 10rem;
    color: #6b238e;
  }
  
   button {
    display: block;
    margin: 0 auto;
    background-color: blueviolet;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    color: #392145;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  

 
   span:hover::before {
    content: attr(data-text);
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #6b238e;
    color: #d9d9d9;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 0.8rem;
    white-space: nowrap;
  }

 
 
  `
  return (
    <Wrapper>
    <div className="" >
      <header className="header">
        <span data-text="About">
          <InfoCircleOutlined />{" "}
        </span>
        <span data-text="Features">
          <StarOutlined />{" "}
        </span>
        <span data-text="Download">
          <DownloadOutlined />{" "}
        </span>
        <span data-text="Facebook">
          <FacebookOutlined />{" "}
        </span>
        <span data-text="Twitter">
          <TwitterOutlined />{" "}
        </span>
        <span data-text="Send Email">
          <MailOutlined />{" "}
        </span>
      </header>

      <h1 className="H1" >Welcome to AdminX Website!</h1>
      <button className="button" onClick={handleClick}>Go to Admin Page</button>

    </div>
    </Wrapper>
  );
}
