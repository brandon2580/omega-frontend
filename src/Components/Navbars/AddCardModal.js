import React, { useState } from "react";
import "../../App.scss";
import { Modal } from "antd";
import AutoSuggest from "react-autosuggest";
import LineChartCard from "../TemplateComponents/LineChartCard";
import PieChartCard from "../TemplateComponents/PieChartCard";
import BarChartCard from "../TemplateComponents/BarChartCard";

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
        <form className="form-inline ml-auto col-lg-7" onSubmit={(e) => e.preventDefault()}>
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
              {
                /* If the user clicked on a card, and it had PieChartCard is true, and it's selectable, return JSX */
              }
              if (
                card.PieChartCard &&
                card.selectable &&
                card.title.toLowerCase().includes(value.toLowerCase())
              ) {
                return (
                  <div className="col-xl-4 modal-card">
                    <PieChartCard
                      key={card.id}
                      title={card.title}
                      data={card.data}
                    >
                      <p>{card.title}</p>
                    </PieChartCard>

                    <button
                      className="btn btn-primary search-button add-card-button"
                      type="button"
                      onClick={() => {
                        selectCard(card.id);
                        card.selectable = false;
                      }}
                    >
                      Add
                    </button>
                  </div>
                );
              }

              {
                /* If the user clicked on a card, and it had LineChartCard is true, and it's selectable, return JSX */
              }
              if (
                card.LineChartCard &&
                card.selectable &&
                card.title.toLowerCase().includes(value.toLowerCase())
              ) {
                return (
                  <div className="col-xl-4 modal-card">
                    <LineChartCard
                      key={card.id}
                      title={card.title}
                      data={card.data}
                      dataLabel={card.dataLabel}
                    >
                      <p>{card.title}</p>
                    </LineChartCard>

                    <button
                      className="btn btn-primary search-button add-card-button"
                      type="button"
                      onClick={() => {
                        selectCard(card.id);
                        card.selectable = false;
                      }}
                    >
                      Add
                    </button>
                  </div>
                );
              }

              {
                /* If the user clicked on a card, and it had BarChartCard is true, and it's selectable,  return JSX */
              }
              if (
                card.BarChartCard &&
                card.selectable &&
                card.title.toLowerCase().includes(value.toLowerCase())
              ) {
                return (
                  <div className="col-xl-4 modal-card">
                    <BarChartCard
                      key={card.id}
                      title={card.title}
                      data={card.data}
                      dataLabel={card.dataLabel}
                    >
                      <p>{card.title}</p>
                    </BarChartCard>

                    <button
                      className="btn btn-primary search-button add-card-button"
                      type="button"
                      onClick={() => {
                        selectCard(card.id);
                        card.selectable = false;
                      }}
                    >
                      Add
                    </button>
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
