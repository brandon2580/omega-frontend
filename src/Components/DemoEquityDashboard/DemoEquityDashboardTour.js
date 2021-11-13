import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Tour from "reactour";
import "../../App.scss";

const DemoEquityDashboardTour = (props) => {
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  
  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [props.darkMode]);

  const steps = [
    {
      selector: "body",
      content: "Welcome to sigma7! We are going to go through a short tour.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".dashboard-navbar",
      content:
        "This is the navigation bar where you can search for stocks, add cards, share dashboards, & more!",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".stock-symbol-form",
      content:
        "If you want to search up any given stock/company, this is where you would type it. Feel free to type in the whole name of the company or just the stock symbol.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".dashboard-nav-buttons",
      content:
        "This is where you can add cards to your dashboard, save a new layout, share dashboards, view your profile, and send us feedback!",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".sidenav",
      content:
        "This is the side navigation bar. This is where you will find your saved layouts. In the future, you will be able to save other users' dashboards here on top of your own.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".ticker-header",
      content:
        "This is where you can find general information about the company you're researching.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".price-card",
      content:
        "This card displays the price movements of a given stock.This card's chart format may swap between a candlestick or line format.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },

    {
      selector: ".analystrecs-card",
      content:
        "This card displays analyst recommendations from Wall Street. These recommendations are derived from extensive research and industry knowledge.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".earningsratio-card",
      content:
        "This card displays the rate in which a company meets or misses expectations set by research analysts. Typically, a company will see a significant value/price increase if they exceed or meet the expectations set for them. The inverse is true if companies fail to meet expectations set for them.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".pricetarget-card",
      content:
        "Much like Analyst Recommendations, Analysts from Wall Street set price targets for given stocks. These targets are essentially predictions set by experienced industry professionals within Wall Street. These targets can often dictate the price expectations of other investors.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".news-card",
      content:
        "This card displays the most recent news articles for a particular stock, and color codes them according to their sentiment or feelings on the stock.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
  ];
  return (
    <Tour
      steps={steps}
      isOpen={props.isTourOpen}
      onRequestClose={() => props.setIsTourOpen(false)}
      lastStepNextButton={<a className="lets-begin-link">Lets begin!</a>}
      accentColor={"#007bff"}
      nextButton={<ArrowRightOutlined />}
      prevButton={<ArrowLeftOutlined />}
      rounded={10}
    />
  );
};

export default DemoEquityDashboardTour;
