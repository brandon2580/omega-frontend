import React, { useState } from "react";
import "../../App.scss";
import { Modal } from "antd";
import AutoSuggest from "react-autosuggest";
import LineChartCard from "../TemplateComponents/LineChartCard";
import PieChartCard from "../TemplateComponents/PieChartCard";
import BarChartCard from "../TemplateComponents/BarChartCard";
import CandleChartCard from "../TemplateComponents/CandleChartCard";
import AddToLayoutButton from "./AddToLayoutButton";

const AddCardModal = (props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function selectCard(id) {
    // Card was selected, remove it
    if (props.selectedCardsIndex.includes(id)) {
      props.setSelectedCardIndex((prevSelected) =>
        prevSelected.filter((cardId) => cardId !== id)
      );
    }

    // Card was not selected, add it
    else {
      props.setSelectedCardIndex((prevSelected) => [...prevSelected, id]);
    }
  }

  // Shows modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Handles exit of modal
  const handleExit = (e) => {
    setModalVisible(false);
  };

  return (
    <div>
      <button className="btn btn-primary" type="button" onClick={showModal}>
        Add Card
      </button>
      <Modal
        title="Add Card"
        visible={modalVisible}
        footer={null}
        onCancel={handleExit}
      >
        <form
          className="form-inline ml-auto col-lg-7"
          onSubmit={(e) => e.preventDefault()}
        >
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsClearRequested={() => setSuggestions([])}
            onSuggestionsFetchRequested={({ value }) => {
              setValue(value);
            }}
            inputProps={{
              placeholder: "Search card",
              value: value,
              onChange: (_, { newValue, method }) => {
                setValue(newValue);
              },
            }}
          />
        </form>

        <div className="add-card-container">
          <div className="row">
            {props.availableCards.map((card) => {
              const defaultAttributes = {
                key: card.id,
                title: card.title,
                data: card.data,
                dataLabel: card.dataLabel
              }

              const defaultConditionals = card.selectable && card.title.toLowerCase().includes(value.toLowerCase())

              if (card.cardType === 'PieChartCard' && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <PieChartCard {...defaultAttributes}>
                      <p>{card.title}</p>
                    </PieChartCard>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }

              if (card.cardType === 'LineChartCard' && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <LineChartCard {...defaultAttributes}>
                      <p>{card.title}</p>
                    </LineChartCard>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }

              if (card.cardType === 'CandleChartCard' && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <CandleChartCard {...defaultAttributes}>
                      <p>{card.title}</p>
                    </CandleChartCard>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }

              if (card.cardType === 'BarChartCard' && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <BarChartCard {...defaultAttributes}>
                      <p>{card.title}</p>
                    </BarChartCard>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddCardModal;
