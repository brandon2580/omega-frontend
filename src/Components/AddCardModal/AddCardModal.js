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
import Economics from "../Cards/Economics";
import Buybacks from "../Cards/Buybacks";

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
                name: card.name,
                title: card.title,
                data: card.data,
                dataLabel: card.dataLabel,
                labels: card.labels,
                priceRange: card.priceRange,
                setPriceRange: card.setPriceRange,
                dividendRange: card.dividendRange,
                setDividendRange: card.setDividendRange,
                earningsPeriod: card.earningsPeriod,
                setEarningsPeriod: card.setEarningsPeriod,
                frame: card.frame,
                setFrame: card.setFrame,
                dates: card.dates
              };

              const defaultConditionals =
                !props.selectedCardsIndex.includes(card.id) &&
                card.title.toLowerCase().includes(value.toLowerCase());

              if (card.name === "Earnings" && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <Earnings {...defaultAttributes}>
                      <p>{card.title}</p>
                    </Earnings>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }

              if (
                card.name === "AnalystRecommendations" &&
                defaultConditionals
              ) {
                return (
                  <div className="col-xl-4 modal-card">
                    <AnalystRecommendations {...defaultAttributes}>
                      <p>{card.title}</p>
                    </AnalystRecommendations>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }

              if (card.name === "Dividends" && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <Dividends {...defaultAttributes}>
                      <p>{card.title}</p>
                    </Dividends>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }

              if (card.name === "Price" && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <Price {...defaultAttributes}>
                      <p>{card.title}</p>
                    </Price>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }

              if (card.name === "PriceTarget" && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <PriceTarget {...defaultAttributes}>
                      <p>{card.title}</p>
                    </PriceTarget>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }

              if (card.name === "RiskAnalysis" && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <RiskAnalysis {...defaultAttributes}>
                      <p>{card.title}</p>
                    </RiskAnalysis>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }
              if (card.name === "Economics" && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <Economics {...defaultAttributes}>
                      <p>{card.title}</p>
                    </Economics>

                    <AddToLayoutButton selectCard={selectCard} card={card} />
                  </div>
                );
              }
              if (card.name === "Buybacks" && defaultConditionals) {
                return (
                  <div className="col-xl-4 modal-card">
                    <Buybacks {...defaultAttributes}>
                      <p>{card.title}</p>
                    </Buybacks>

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
