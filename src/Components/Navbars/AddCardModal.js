import React, { useState } from "react";
import "../../App.scss";
import { Modal } from "antd";
import AutoSuggest from "react-autosuggest";
import LineChartCard from "../TestComponents/LineChartCard";
import PieChartCard from "../TestComponents/PieChartCard";
import BarChartCard from "../TestComponents/BarChartCard";

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

  const lowerCasedComponents = props.availableCards.map((components) => {
    return {
      id: components.id,
      name: components.title.toLowerCase(),
    };
  });

  // Filters through the name of available components
  // for when the user searches it in the modal
  function getSuggestions(value) {
    return lowerCasedComponents.filter((components) =>
      components.name.includes(value.trim().toLowerCase())
    );
  }

  return (
    <div>
      <Modal
        title="Add Card"
        visible={modalVisible}
        footer={null}
        onCancel={handleExit}
      >
        <form className="form-inline ml-auto col-lg-7">
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsClearRequested={() => setSuggestions([])}
            onSuggestionsFetchRequested={({ value }) => {
              setValue(value);
              setSuggestions(getSuggestions(value));
            }}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={(suggestion) => (
              <span>
                {suggestion.name.charAt(0).toUpperCase() +
                  suggestion.name.slice(1)}
              </span>
            )}
            inputProps={{
              placeholder: "Add card",
              value: value,
              onChange: (_, { newValue, method }) => {
                setValue(newValue);
              },
            }}
            highlightFirstSuggestion={true}
          />
          <button className="btn btn-primary search-button" type="submit">
            Add
          </button>
        </form>

        <div className="add-card-container">
          <div className="row">
            {props.availableCards.map((card, prev) => {
              {
                /* If the user clicked on a card, and it had {PieChartCard: true}, return JSX */
              }

              if (card.PieChartCard) {
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
                      }}
                    >
                      Add
                    </button>
                  </div>
                );
              }

              {
                /* If the user clicked on a card, and it had {LineChartCard: true}, return JSX */
              }
              if (card.LineChartCard) {
                return (
                  <div className="col-xl-4 modal-card">
                    <LineChartCard
                      key={card.id}
                      title={card.title}
                      data={card.data}
                    >
                      <p>{card.title}</p>
                    </LineChartCard>

                    <button
                      className="btn btn-primary search-button add-card-button"
                      type="button"
                      onClick={() => selectCard(card.id)}
                    >
                      Add
                    </button>
                  </div>
                );
              }

              {
                /* If the user clicked on a card, and it had {BarChartCard: true}, return JSX */
              }
              if (card.BarChartCard) {
                return (
                  <div className="col-xl-4 modal-card">
                    <BarChartCard
                      key={card.id}
                      title={card.title}
                      data={card.data}
                    >
                      <p>{card.title}</p>
                    </BarChartCard>

                    <button
                      className="btn btn-primary search-button add-card-button"
                      type="button"
                      onClick={() => selectCard(card.id)}
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
      <form className="form-inline ml-auto">
        <button
          className="btn btn-primary search-button"
          type="button"
          onClick={showModal}
        >
          Add Card
        </button>
      </form>
    </div>
  );
};

export default AddCardModal;
