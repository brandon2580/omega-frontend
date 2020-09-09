import React, { useState } from "react";
import "../../App.scss";

const UndoPrompt = (props) => {
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
              if (!props.selectedCardsIndex.includes(props.removedCardId)) {
                props.setSelectedCardIndex((prevSelected) => [
                  ...prevSelected,
                  props.removedCardId,
                ]);
                props.setWasRemoved(false);
              }
              props.availableCards.map((card) => {
                if (card.id == props.removedCardId) {
                  card.selectable = false;
                }
              });
            }}
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  );
};

export default UndoPrompt;
