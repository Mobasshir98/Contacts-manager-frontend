import { React, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";
export default function Search({ data, setsearchemail }) {
  const [value, setvalue] = useState("");
  const handlesearch = (email) => {
    setvalue(email);
    setsearchemail(email);
  };
  const handlesearchchange = (e) => {
    setvalue(e.target.value);
    setTimeout(() => {
      setsearchemail(e.target.value);
    }, 1000);
  };
  return (
    <div className="Search_container">
      <div className="wrap">
        <div className="search">
          <input
            value={value}
            onChange={handlesearchchange}
            type="text"
            className="searchTerm"
            placeholder="Search By EmailID.."
          />
          <button type="submit" className="searchButton">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="dropdown">
        {data.length > 0 &&
          data
            .filter((d) => {
              const searchTerm = value.toLowerCase();
              const email = d.email.toLowerCase();
              return (
                searchTerm &&
                email.startsWith(searchTerm) &&
                email !== searchTerm
              );
            })
            .map((d, i) => (
              <div
                key={i}
                style={{ cursor: "pointer" }}
                onClick={() => handlesearch(d.email)}
              >
                {d.email}
              </div>
            ))}
      </div>
    </div>
  );
}
