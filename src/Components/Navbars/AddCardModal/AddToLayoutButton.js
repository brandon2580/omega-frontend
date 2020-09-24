import React, { useState } from "react";
import "../../../App.scss";

const AddToLayoutButton = (props) => {
    return (
        <button
            className="btn btn-primary search-button add-card-button"
            type="button"
            onClick={() => {
                props.selectCard(props.card.id);
                props.card.selectable = false;
            }}
        >
            Add
        </button>
    )
}

export default AddToLayoutButton