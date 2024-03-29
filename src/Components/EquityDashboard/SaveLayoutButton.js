import React, { useState } from "react";
import { Modal } from "antd";
import { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";
import { LayoutOutlined, SaveOutlined } from "@ant-design/icons";
import db from "../../firebase";
import "firebase/firestore";

const SaveLayoutButton = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [layoutName, setLayoutName] = useState();

  const handleClick = (e) => {
    props.setSelectedLayoutIndex(e.target.getAttribute("data-index"));
    props.setWasYourDashboardSelected(true);
  };

  // Shows modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Handles exit of modal
  const handleExit = (e) => {
    setModalVisible(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.setNewLayoutName(layoutName);

    // We want to save the layout in "user_dashboards", not "saved_dashboards". "user_dashboards" consists of dashboards that have
    // been created & saved by the current user. "saved_dashboards" are dashboards that belong to other users but have been saved
    // by the current user.
    const docRef = db.collection("user_dashboards").doc(props.userID);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let mapped = Object.values(doc.data().dashboards).map((el, i) => {
            let values = Object.values(el)[0];
            let names = Object.keys(values);
            return (
              <NavItem eventKey="home">
                <NavIcon>
                  <LayoutOutlined />
                </NavIcon>
                <NavText>
                  <a value={names} data-index={i} onClick={handleClick}>
                    {names}
                  </a>
                </NavText>
              </NavItem>
            );
          });
          props.setDashboardNames(mapped);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    e.target.reset();
  };

  return (
    <React.Fragment>
      <span
        style={{ cursor: "pointer" }}
        onClick={showModal}
        className="justify-content"
      >
        <SaveOutlined id="SaveOutlined" />
        <span style={{ color: "rgba(0, 188, 221, 1)", marginLeft: "5px" }}>
          SAVE
        </span>
      </span>

      <Modal
        title="Save Layout"
        className="save-layout-modal"
        footer={null}
        visible={modalVisible}
        onCancel={handleExit}
      >
        <form className="form-inline ml-auto col-lg-9" onSubmit={onSubmit}>
          <input
            type="text"
            autoFocus
            className="react-autosuggest__input"
            placeholder="Layout Name"
            onChange={(e) => setLayoutName(e.target.value)}
          />
        </form>
        {props.wasTaken && (
          <h5 className="error-message">
            Name already in use, please try another
          </h5>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default SaveLayoutButton;
