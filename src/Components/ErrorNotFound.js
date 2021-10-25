import React from "react";

const ErrorNotFound = () => {
  return (
    <React.Fragment>
      <div class="moon"/>
      <div class="moon__crater moon__crater1"/>
      <div class="moon__crater moon__crater2"/>
      <div class="moon__crater moon__crater3"/>

      <div class="star star1"/>
      <div class="star star2"/>
      <div class="star star3"/>
      <div class="star star4"/>
      <div class="star star5"/>

      <div class="error">
        <div class="error__title">404</div>
        <div class="error__subtitle">Hmmm...</div>
        <div class="error__description">
          It looks like one of the developers fell asleep
        </div>
        <a href="/">
          <button class="error__button">Return</button>
        </a>
      </div>

      <div class="astronaut">
        <div class="astronaut__backpack"/>
        <div class="astronaut__body"/>
        <div class="astronaut__body__chest"/>
        <div class="astronaut__arm-left1"/>
        <div class="astronaut__arm-left2"/>
        <div class="astronaut__arm-right1"/>
        <div class="astronaut__arm-right2"/>
        <div class="astronaut__arm-thumb-left"/>
        <div class="astronaut__arm-thumb-right"/>
        <div class="astronaut__leg-left"/>
        <div class="astronaut__leg-right"/>
        <div class="astronaut__foot-left"/>
        <div class="astronaut__foot-right"/>
        <div class="astronaut__wrist-left"/>
        <div class="astronaut__wrist-right"/>

        <div class="astronaut__cord">
          <canvas id="cord" height="500px" width="500px"/>
        </div>

        <div class="astronaut__head">
          <canvas id="visor" width="60px" height="60px"/>
          <div class="astronaut__head-visor-flare1"/>
          <div class="astronaut__head-visor-flare2"/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorNotFound;
