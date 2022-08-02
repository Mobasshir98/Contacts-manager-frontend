import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/contactsmanager.png";

import axios from "axios";
import "./login.css";
const Login = () => {
  const [loginState, setLogin] = useState({});
  const navigate = useNavigate();
  const handleLogin = () => {
    axios({
      url: "https://handlecontacts-backend.herokuapp.com/login",
      method: "POST",
      headers: {},
      data: { mailid: loginState.mailid, password: loginState.password },
    })
      .then((loginData) => {
        localStorage.setItem("Authorization", loginData.data.authToken);
        navigate("/contacts");
      })
      .catch((err) => {
        alert("Invalid Details");
      });
  };
  return (
    <>
      <div className="outer-box-login">
        <div className="ucircle-login">
          <img src="Ellipse-31.png" alt="ellips" height={"250px"}></img>
        </div>
        <form>
          <div className="box-login">
            <div>
              <img
                src="Group 100.png"
                alt="group"
                className="rsquare-login"
              ></img>
            </div>
            <div className="logo">
              <img src={logo} alt=""></img>
            </div>
            <div className="item-login">
              <p>Enter your credentials to access your acccount</p>
            </div>
            <div className="item-login">
              <input
                id="mailid"
                type="email"
                placeholder="Email-ID"
                name="mailid"
                onChange={(e) => {
                  setLogin({ ...loginState, mailid: e.target.value });
                }}
              />
            </div>
            <div className="item-login">
              <input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setLogin({ ...loginState, password: e.target.value });
                }}
              />
            </div>
            <div className="item-login">
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="item-login">
              <div  className =' sign-btn 'onClick={() => navigate("/signup")}> Sign-up</div>
            </div>
            <div>
              <img
                src="Group 100.png"
                alt="hello"
                className="lsquare-login"
              ></img>
            </div>
          </div>
        </form>
        <div className="lcircle-login">
          <img src="Ellipse-31.png" alt="group2" height={"250px"}></img>
        </div>
      </div>
    </>
  );
};

export default Login;
