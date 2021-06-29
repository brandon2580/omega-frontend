import React, { useState } from "react";
import "../../App.scss";
import { Modal, Popover } from "antd";
import AutoSuggest from "react-autosuggest";
import AddToLayoutButton from "./AddToLayoutButton";
import Earnings from "../Cards/Earnings";
import AnalystRecommendations from "../Cards/AnalystRecommendations";
import Dividends from "../Cards/Dividends";
import Price from "../Cards/Price";
import PriceTarget from "../Cards/PriceTarget";
import News from "../Cards/News";
import EarningsRatio from "../Cards/EarningsRatio";
import CompareReturns from "../Cards/CompareReturns";
import CorrelatedMarkets from "../Cards/CorrelatedMarkets";

import { InfoCircleOutlined } from "@ant-design/icons";

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
    News,
    EarningsRatio,
    CompareReturns,
    CorrelatedMarkets,
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
              // These conditions must be met in order for a card to be rendered
              // in the AddCardModal
              const defaultConditionals =
                !props.selectedCardsIndex.includes(card.id) &&
                card.title.toLowerCase().includes(value.toLowerCase());

              const extra = (
                <div>
                  <Popover
                    content={card.info}
                    title={card.title}
                    trigger="click"
                    visible={card.infoVisible}
                  >
                    <span className="span-margin">
                      <InfoCircleOutlined
                        className="blue-button"
                        onClick={() =>
                          props.setAvailableCards((arr) =>
                            arr.map((item) =>
                              item.id == card.id
                                ? { ...item, infoVisible: !item.infoVisible }
                                : item
                            )
                          )
                        }
                      />
                    </span>{" "}
                  </Popover>
                </div>
              );

              if (card.name in availableCardsObject && defaultConditionals) {
                const CustomTag = availableCardsObject[card.name];

                return (
                  <div className="col-xl-4 modal-card">
                    <CustomTag
                      {...card}
                      extra={extra}
                      darkMode={props.darkMode}
                      activeTicker={props.activeTicker}
                    />
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
