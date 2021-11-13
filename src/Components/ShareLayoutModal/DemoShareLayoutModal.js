import React, { useEffect, useState } from "react";
import "../../App.scss";
import { Alert, Modal } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import "firebase/firestore";
import { ShareAltOutlined } from "@ant-design/icons";

const DemoShareLayoutModal = (props) => {
  const { loginWithRedirect } = useAuth0();

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
                <p className="text center">Please <a className="blue" onClick={loginWithRedirect}>login</a> to use this feature.</p>

            </Modal>
        </React.Fragment>
    );
};

export default DemoShareLayoutModal;
