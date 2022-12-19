import React, { useRef, useState } from "react";
import ellipse from "../../assets/Ellipse33.png";
import vector from "../../assets/Vector.png";
import check from "../../assets/Check.png";
import axios from "axios";

import "./Import.scss";

export default function Import({ setimporting }) {
  // const [file, setfile] = useState(null)
  const [success, setsuccess] = useState(false);

  const send = (e) => {
    let token = localStorage.getItem("Authorization");
    const file = e.target.files[0];
    const extension = file.name.split(".")[1];
    if (extension === "csv") {
      // console.log(file)
      // setfile(file)
      const data = new FormData();
      data.append("file", file);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/post`,
        data: data,
        headers: {
          authorization: token,
        },
      });
      setsuccess(true);
      setTimeout(() => {
        closeimport();
        window.location.reload(false);
      }, 2000);
    } else {
      alert("You can Import csv files only");
    }
  };
  function closeimport() {
    setimporting(false);
  }
  const wrapperRef = useRef(null);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  return (
    <>
      <div className="import__body">
        {!success ? (
          <div
            className="import__container"
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="input__label">
              <div className="ellipse">
                <img src={ellipse} alt="ellipse" />
              </div>
              <div className="vector">
                <img src={vector} alt="" />
              </div>
              <h4>Import File</h4>
              <p>Drag & Drop CSV File to Upload</p>
            </div>
            {/* <form action="#"> */}
            <input
              type="file"
              accept=".csv"
              name="file"
              id="file"
              onChange={(e) => send(e)}
            />
            {/* </form> */}
          </div>
        ) : (
          <div className="import__container">
            <div className="success__label">
              <div className="ellipse__success">
                <img src={ellipse} alt="ellipse" />
              </div>
              <div className="vector">
                <img src={check} alt="check" />
              </div>
              <h4>Import Complete</h4>
              <p>CSV File is Uploaded</p>
            </div>
          </div>
        )}
        {!success && (
          <div>
            <button onClick={closeimport} className="cancel-btn " type="button">
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}
