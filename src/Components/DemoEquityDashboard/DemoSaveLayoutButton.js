import React, { useState } from "react";
import { Modal } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import "firebase/firestore";

const DemoSaveLayoutButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  const [modalVisible, setModalVisible] = useState(false);

  // Shows modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Handles exit of modal
  const handleExit = (e) => {
    setModalVisible(false);
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
        <p className="text center">Please <a className="blue" onClick={loginWithRedirect}>login</a> to use this feature.</p>
      </Modal>
    </React.Fragment>
  );
};

export default DemoSaveLayoutButton;
