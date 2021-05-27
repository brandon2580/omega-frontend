import React, { useState } from "react";
import "../../App.scss";
import { Modal } from "antd";

const WarningModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Shows modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Handles exit of modal
  const handleExit = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <button
        className="btn btn-danger"
        type="button"
        onClick={showModal}
        style={{ margin: "0 auto", display: "block", marginTop: "10%" }}
      >
        Suspend Subscription
      </button>

      <Modal
        title="Warning"
        className="warning-modal"
        visible={modalVisible}
        footer={null}
        onCancel={handleExit}
      >
        <h2 className="center white">
          Are you sure you want to suspend your subscription?{" "}
        </h2>
        <div className="row">
          {" "}
          <button
            className="btn btn-success col-lg-3"
            style={{
              margin: "0 auto",
              display: "block",
              marginTop: "10%",
              marginRight: "15px",
            }}
          >
            No, nevermind.
          </button>
          <button
            className="btn btn-danger col-lg-3"
            style={{
              margin: "0 auto",
              display: "block",
              marginTop: "10%",
              marginLeft: "15px",
            }}
          >
            Yes, I am sure.
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default WarningModal;
