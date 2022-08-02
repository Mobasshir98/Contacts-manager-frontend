import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/contactsmanager.png";

import "./signup.css";
const Signup = () => {
  const [signupState, setSignupState] = useState({});
  const navigate = useNavigate();
  const handleUserAdd = () => {
    if (signupState.password === signupState.cpassword) {
      axios({
        url: "https://handlecontacts-backend.herokuapp.com/signup",
        method: "POST",
        headers: {},
        data: { mailid: signupState.mailid, password: signupState.password },
      })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          alert("Email is already present.");
        });
    } else {
      alert("password did not match");
    }
  };

  return (
    <>
      <div className="outer-box-signup">
        <div className="ucircle-signup">
          <img src="Ellipse-31.png" alt="group1" height={"250px"}></img>
        </div>
        <form>
          <div className="box-signup">
            <div>
              <img
                src="Group 100.png"
                alt="group2"
                className="rsquare-signup"
              ></img>
            </div>
            <div className="logo">
              <img src={logo} alt=""></img>
            </div>
            <div className="item-signup">
              <p>Create new Account</p>
            </div>
            <div className="item-signup">
              <input
                id="mailid"
                type="email"
                placeholder="Email-ID"
                name="mailid"
                onChange={(e) => {
                  setSignupState({ ...signupState, mailid: e.target.value });
                }}
              />
            </div>
            <div className="item-signup">
              <input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setSignupState({ ...signupState, password: e.target.value });
                }}
              />
            </div>
            <div className="item-signup">
              <input
                id="password"
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                onChange={(e) => {
                  setSignupState({ ...signupState, cpassword: e.target.value });
                }}
              />
            </div>
            <div className="item-signup">
              <button type="button" onClick={handleUserAdd}>
                Submit
              </button>
            </div>
            <div>
              <img
                src="Group 100.png"
                alt="group3"
                className="lsquare-signup"
              ></img>
            </div>
          </div>
        </form>
        <div className="lcircle-signup">
          <img src="Ellipse-31.png" alt="group4" height={"250px"}></img>
        </div>
      </div>
    </>
  );
};
export default Signup;
