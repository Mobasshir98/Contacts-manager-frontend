import { useNavigate } from "react-router-dom";
import "./logout.css";
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("Authorization", "");
    navigate("/");
  };

  return (
    <>
      <div className="box-logout">
        <img src="logout.png" alt=""></img>
        <p onClick={handleLogout}>Log-out</p>
      </div>
    </>
  );
};
export default Logout;
