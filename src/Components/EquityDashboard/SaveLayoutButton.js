import React from "react";
import { Popover } from "antd";

const SaveLayoutButton = (props) => {
  return (
    <div>
      <Popover
        content={
          <form onSubmit={props.saveLayout}>
            <input type="text" onChange={props.handleChange} />
          </form>
        }
        title="Layout Name"
        trigger="click"
      >
        <button className="btn btn-primary">Save Layout</button>
      </Popover>

      {props.wasTaken && <h1>Name already in use, please try another</h1>}
    </div>
  );
};

export default SaveLayoutButton;
