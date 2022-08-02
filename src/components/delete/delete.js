import React from "react";
import "./delete.scss";
import ellipse from "../../assets/Ellipse33.png";
import deleteicon from "../../assets/delete.png";

const Delete = ({ setdeleting, deletebyid, deletesuccess }) => {
  return (
    <div className="delete__body">
      {!deletesuccess ? (
        <div className="delete__container">
          <div className="delete__label">
            <div className="delete__success">
              <img src={ellipse} alt="ellipse" />
            </div>
            <div className="vector">
              <img src={deleteicon} alt="check" />
            </div>
            <h4>Delete Contacts</h4>
            <p>Sure You Want to delete these Contacts?</p>
            <div className="deletebtn">
              <button onClick={() => setdeleting(false)} className="delete-btn">
                Cancel
              </button>
              <button onClick={() => deletebyid()} className="delete-btn">
                OK
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="delete__container">
          <div className="delete__label">
            <div className="delete__success">
              <img src={ellipse} alt="ellipse" />
            </div>
            <div className="vector">
              <img src={deleteicon} alt="check" />
            </div>
            <h4>Deleted Contacts</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delete;
