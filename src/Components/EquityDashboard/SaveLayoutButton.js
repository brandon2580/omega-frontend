import React, { useEffect, useState } from "react";
import { Modal } from "antd";

const SaveLayoutButton = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [layoutName, setLayoutName] = useState();

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
    props.setNewLayoutName(layoutName)
    e.target.reset();
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={showModal}>
        Save Layout
      </button>
      <Modal
        title="Save Layout"
        className="save-layout-modal"
        footer={null}
        visible={modalVisible}
        onCancel={handleExit}
      >
        <form
          className="form-inline ml-auto col-lg-9"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            className="react-autosuggest__input"
            placeholder="Layout Name"
            onChange={e => setLayoutName(e.target.value)}
          />
        </form>
        {props.wasTaken && <h5 className='error-message'>Name already in use, please try another</h5>}
      </Modal>
    </div>
  );
};

export default SaveLayoutButton;
