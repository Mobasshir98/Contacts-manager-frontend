import { Outlet,Navigate } from "react-router-dom";
const Protected = () => {
    const token = localStorage.getItem("Authorization");
    // console.log(token)
    return (
        <>
        {token ? <Outlet/> : <Navigate to="/"/>}
        </>
    )
    
}
export default Protected;