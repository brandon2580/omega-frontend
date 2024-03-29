import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Alert, Modal } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import db from "../../firebase";
import "firebase/firestore";
import { ShareAltOutlined } from "@ant-design/icons";

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
        setTimeout(() => setShareFailed(false), 5000);
      });
  };

  const handleCopyLink = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 5000);
    navigator.clipboard.writeText(url + "?share=true");
  };

  const url = window.location.href;

  return (
    <React.Fragment>
      <span
        style={{ cursor: "pointer" }}
        onClick={showModal}
        className="justify-content"
      >
        <ShareAltOutlined id="SaveOutlined" />
        <span style={{ color: "rgba(0, 188, 221, 1)", marginLeft: "5px" }}>
          SHARE
        </span>
      </span>
      <Modal
        title="Share"
        className="share-layout-modal"
        visible={modalVisible}
        footer={null}
        onCancel={handleExit}
      >
        <div className="row center">
          <div className="col-lg-6">
            <button onClick={handleCopyLink} className="btn btn-primary">
              Copy Link
            </button>
          </div>{" "}
          <div className="col-lg-6">
            <button disabled className="btn btn-primary" onClick={shareDashboard}>
              Share to Explore Page <br /> (Coming Soon)
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
              <Alert
                className="status-message"
                message="Copied!"
                type="success"
              />
            )}
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ShareLayoutModal;
