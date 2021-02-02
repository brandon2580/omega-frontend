import React, { useState } from "react";
import "../../App.scss";
import { Modal } from "antd";
import AutoSuggest from "react-autosuggest";
import AddToLayoutButton from "./AddToLayoutButton";
import Earnings from "../Cards/Earnings";
import AnalystRecommendations from "../Cards/AnalystRecommendations";
import Dividends from "../Cards/Dividends";
import Price from "../Cards/Price";
import PriceTarget from "../Cards/PriceTarget";
import RiskAnalysis from "../Cards/RiskAnalysis";
import News from "../Cards/News";
import PriceHistogram from "../Cards/PriceHistorgram";
import PriceCalendar from "../Cards/PriceCalendar";
import OverallReturns from "../Cards/OverallReturns";
import AverageReturns from "../Cards/AverageReturns";


const AddCardModal = (props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const selectCard = (id) => {
    // Card was selected, remove it
    if (props.selectedCardsIndex.includes(id)) {
      props.setSelectedCardsIndex((prevSelected) =>
        prevSelected.filter((cardId) => cardId !== id)
      );
    }

    // Card was not selected, add it
    else {
      props.setSelectedCardsIndex((prevSelected) => [...prevSelected, id]);
    }
  };

  // Shows modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Handles exit of modal
  const handleExit = () => {
    setModalVisible(false);
  };

  const availableCardsObject = {
    Earnings,
    AnalystRecommendations,
    Dividends,
    Price,
    PriceTarget,
    RiskAnalysis,
    News,
    PriceHistogram,
    PriceCalendar,
    OverallReturns,
    AverageReturns
  };

  return (
    <div>
      <button className="btn btn-primary" type="button" onClick={showModal}>
        Add Card
      </button>
      <Modal
        title="Add Card"
        className="add-card-modal"
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
              // These are the default attributes that are applied to EVERY card in
              // availableCards (aka the cards that are currently rendered on the page).
              // For many cards, there will be many null values. The reason why we just make
              // a defaultAttributes object containing every property for every card throughout the platform
              // is to reduce redundancy when conditionally rendering the cards. Without the defaultAttributes
              // object, we would be assigning properties like key, name, title, etc. to every card, causing a lot
              // of extra lines of repeated code. So instead, we just put it all into 1 object and assign it to every card.
              const defaultAttributes = {
                darkMode: props.darkMode,
                key: card.id,
                name: card.name,
                title: card.title,
                data: card.data,
                dataLabel: card.dataLabel,
                labels: card.labels,
                date: card.date,
                priceRange: card.priceRange,
                setPriceRange: card.setPriceRange,
                dividendRange: card.dividendRange,
                setDividendRange: card.setDividendRange,
                earningsPeriod: card.earningsPeriod,
                setEarningsPeriod: card.setEarningsPeriod,
                frame: card.frame,
                setFrame: card.setFrame,
                dates: card.dates,
                consensus: card.consensus,
                actual: card.actual,
              };

              // These conditions must be met in order for a card to be rendered
              // in the AddCardModal
              const defaultConditionals =
                !props.selectedCardsIndex.includes(card.id) &&
                card.title.toLowerCase().includes(value.toLowerCase());

              if (card.name in availableCardsObject && defaultConditionals) {
                const CustomTag = availableCardsObject[card.name];

                return (
                  <div className="col-xl-4 modal-card">
                    <CustomTag {...defaultAttributes} />
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
