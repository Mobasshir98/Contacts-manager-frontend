import "./App.css";
import Contact from "./components/contact/contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import Logout from "./components/logout/logout";
import Protected from "./components/protected/protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" exact element={<Login />}></Route>
          <Route element={<Protected />}>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/contacts" element={<Contact />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
