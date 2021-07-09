import React, { useState } from "react";
import "../../App.scss";
import { Modal, Alert } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import db from "../../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const ShareLayoutModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareFailed, setShareFailed] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Shows modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Handles exit of modal
  const handleExit = () => {
    setModalVisible(false);
    
    // Automatically set shareSuccess and shareFailed to false so the status messages reset for when
    // the user re-opens the modal
    setShareSuccess(false);
    setShareFailed(false);
  };

  const shareDashboard = () => {
    db.collection("shared_dashboards")
      .doc()
      .set({
        belongs_to: props.userID,
        dashboard_name: props.selectedDashboardName,
        dashboard: props.mainLayout,
      })
      .then(() => {
        console.log("Document written");
        setShareSuccess(true);
        setTimeout(() => {
          setShareSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        setShareFailed(true);
        setTimeout(() => setShareFailed(false), 5000)
      });
  };
  const url = window.location.href;

  return (
    <div>
      <i style={{cursor: "pointer"}} onClick={showModal} className="fi-rr-share top-nav-icon"></i>
      <Modal
        title="Share"
        className="share-layout-modal"
        visible={modalVisible}
        footer={null}
        onCancel={handleExit}
      >
        <div className="row center">
          <div className="col-lg-6">
            <CopyToClipboard text={url}>
              <button onClick={() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 5000)
              }} className="btn btn-primary">Copy Link</button>
            </CopyToClipboard>
          </div>{" "}
          <div className="col-lg-6">
            <button className="btn btn-primary" disabled>
              Share to Explore Page (Coming Soon)
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {shareSuccess && (
              <Alert
                className="status-message"
                message="Success!"
                type="success"
              />
            )}
            {shareFailed && (
              <Alert className="status-message" message="Error." type="error" />
            )}
            {copySuccess && (
              <Alert className="status-message" message="Copied!" type="success" />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShareLayoutModal;
