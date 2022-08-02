import React, { useEffect, useState } from "react";
import "./contact.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import logo from "../../assets/contactsmanager.png";
import Import from "../Import/Import";
import axios from "axios";
import Logout from "../logout/logout";
import noimage from "../../assets/no-image.png";
import Delete from "../delete/delete";
import {
  FaTh,
  FaBook,
  FaRegCalendarAlt,
  FaRegTrashAlt,
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaPen,
} from "react-icons/fa";
import Search from "../search/Search";
import ReactPaginate from "react-paginate";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "blue",
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}));

const Contact = () => {
  const [ContactState, setContactState] = useState([]);
  const [importing, setimporting] = useState(false);
  const [deleting, setdeleting] = useState(false);
  const [deletesuccess, setdeletesuccess] = useState(false);
  const [searchemail, setsearchemail] = useState("");
  const [username, setusername] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const contactsPerPage = 7;
  const PagesVisited = pageNumber * contactsPerPage;
  const pageCount =
    ContactState.length > 0
      ? Math.ceil(ContactState.length / contactsPerPage)
      : 0;

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    axios({
      url: "https://handlecontacts-backend.herokuapp.com/username",
      method: "GET",
      headers: {
        authorization: token,
      },
    }).then((res) => {
      setusername(res.data);
    });
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    axios({
      url: "https://handlecontacts-backend.herokuapp.com/",
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        setContactState(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const openimport = () => {
    setimporting(true);
  };
  const handledelete = () => {
    if (ContactState.filter((e) => e.ischecked === true).length > 0) {
      setdeleting(true);
    }
  };
  const deletebyid = () => {
    let data = [];
    let token = localStorage.getItem("Authorization");
    ContactState.forEach((d) => {
      if (d.ischecked) {
        data.push(d._id);
      }
    });
    axios({
      method: "DELETE",
      url: "https://handlecontacts-backend.herokuapp.com/delete",
      headers: {
        authorization: token,
      },
      data: {
        deleteitems: data,
      },
    });
    setdeletesuccess(true);
    setTimeout(() => {
      setdeleting(false);
      window.location.reload(false);
    }, 2000);
  };
  const deletesingle = (id) => {
    let data = [id];
    let token = localStorage.getItem("Authorization");
    axios({
      method: "DELETE",
      url: "https://handlecontacts-backend.herokuapp.com/delete",
      headers: {
        authorization: token,
      },
      data: {
        deleteitems: data,
      },
    });
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  const handlechange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      let tempuser = ContactState.map((user) => {
        return { ...user, ischecked: checked };
      });
      setContactState(tempuser);
    } else {
      let tempuser = ContactState.map((user) =>
        user._id === name ? { ...user, ischecked: checked } : user
      );
      setContactState(tempuser);
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Logout />
      {importing && <Import setimporting={setimporting} />}
      {deleting && (
        <Delete
          setdeleting={setdeleting}
          deletebyid={deletebyid}
          deletesuccess={deletesuccess}
        />
      )}
      <div className="contact-container">
        <aside className="aside">
          <div className="logo">
            <img src={logo} alt="logo"></img>
          </div>
          <button className="aside-btns">
            {" "}
            <FaTh />
            &nbsp; Dash Board
          </button>
          <button className="aside-btns">
            {" "}
            <FaBook />
            &nbsp; Total Contacts
          </button>
        </aside>
        <div className="content-main">
          <div className="header-div">
            <h4>Total Contacts</h4>
            <Search data={ContactState} setsearchemail={setsearchemail} />
            <div className="user-contact-details">
              <span>
                <img style={{ width: 50 }} src={noimage} alt="" />
              </span>

              <p>{username}</p>
            </div>
          </div>
          <div className="nav-bar">
            <div className="nav-bar1 section-btn-main">
              <button style={{ marginLeft: 20 }}>
                <FaRegCalendarAlt /> &nbsp; Select Date
              </button>
            </div>
            <div className="nav-bar2">
              <div className="section-btn-main">
                <button onClick={handledelete}>
                  {" "}
                  <FaRegTrashAlt />
                  &nbsp; Delete{" "}
                </button>
              </div>
              <div className="section-btn-main">
                <button onClick={openimport}>
                  <FaAngleDoubleDown />
                  &nbsp; Import
                </button>
              </div>
              <div className="section-btn-main">
                <button>
                  {" "}
                  <FaAngleDoubleUp />
                  &nbsp; Export
                </button>
              </div>
            </div>
          </div>
          <div className="contact-table">
            <table className="rwd-table">
              <tbody>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      name="allselect"
                      onChange={handlechange}
                      checked={
                        ContactState.length > 1 &&
                        ContactState.filter((user) => user?.ischecked !== true)
                          .length < 1
                      }
                    />
                  </th>
                  <th scope="col"> Name</th>
                  <th scope="col" className="v1">
                    Designation
                  </th>
                  <th scope="col" className="v1">
                    Company
                  </th>
                  <th scope="col" className="v1">
                    Industry
                  </th>
                  <th scope="col" className="v1">
                    Email
                  </th>
                  <th scope="col" className="v1">
                    Phone Number
                  </th>
                  <th scope="col" className="v1">
                    Country
                  </th>
                  <th scope="col" className="v1">
                    Action
                  </th>
                </tr>
                {ContactState.length > 0 &&
                  ContactState.filter((d) => {
                    const searchTerm = searchemail.toLowerCase();
                    const email = d.email.toLowerCase();
                    if (searchemail === "") {
                      return d;
                    }
                    return searchTerm && email.includes(searchTerm);
                  })
                    .slice(PagesVisited, PagesVisited + contactsPerPage)
                    .map((d, i) => (
                      <tr key={i}>
                        <th scope="row">
                          <input
                            type="checkbox"
                            name={d._id}
                            onChange={handlechange}
                            checked={d?.ischecked || false}
                          />
                        </th>
                        <td data-th="Name">{d.name}</td>
                        <td data-th="Designation">{d.designation}</td>
                        <td data-th="Company">{d.company}</td>
                        <td data-th="Industry">{d.industry}</td>
                        <td data-th="Email">
                          <LightTooltip
                            title={d.email}
                            arrow
                            placement="bottom-start"
                          >
                            <p className="email_style">{d.email}</p>
                          </LightTooltip>
                        </td>
                        <td data-th="Phone Number">{d.phonenumber}</td>
                        <td data-th="Country">{d.country}</td>
                        <td data-th="Action">
                          <FaPen color="#0884FF" />
                          &nbsp;{" "}
                          <FaRegTrashAlt
                            style={{ cursor: "pointer" }}
                            onClick={() => deletesingle(d._id)}
                            color="#F81D1D"
                          />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationbtns"}
            previousLinkClassName={"prevbtn"}
            nextLinkClassName={"nextbtn"}
            disabledClassName={"paginationdisabled"}
            activeClassName={"paginationactive"}
          />
        </div>
      </div>
    </>
  );
};

export default Contact;
