import React from "react";
import "../../App.scss";

const DemoUndoPrompt = (props) => {
  return (
    <div className="undo-button-container">
      <div className="row">
        <div className="col-lg-6">
          <p className="removed-text">Removed</p>
        </div>
        <div className="col-lg-6">
          <button
            type="button"
            className="btn btn-primary undo-button"
            onClick={() => {
              // If selectedCardsIndex does not already contain the id of the removed card
              if (!props.selectedCardsIndex.includes(props.removedCardId)) {
                // Set selectedCardsIndex to what is was right after the user
                // removed the card, then add the removed card back
                props.setSelectedCardsIndex((prevSelected) => [
                  ...prevSelected,
                  props.removedCardId,
                ]);
                props.setUndoClicked(true);
                props.setWasRemoved(false);
              }
            }}
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoUndoPrompt;
