import React from "react";
import "../../App.scss";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import {
  HomeOutlined,
  LineChartOutlined,
  LayoutOutlined,
} from "@ant-design/icons";

const Sidenavbar = (props) => {
  let localStorageIDs = localStorage.getItem("storedLayoutNames")
  let storedLayoutNames = JSON.parse(localStorageIDs.split())

  const handleClick = (e) => {
    props.setSelectedLayoutIndex(e.target.getAttribute('data-index'))
    props.setWasSelected(true);
  };

  return (
    <SideNav
      className="sidenav"
      style={{
        backgroundImage: "linear-gradient(315deg, #121516 0%, #000000 74%)",
        position: "fixed",
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <HomeOutlined />
          </NavIcon>
          <NavText>
            <a href="/">Home</a>
          </NavText>
        </NavItem>
        <NavItem eventKey="home">
          <NavIcon>
            <LineChartOutlined />
          </NavIcon>
          <NavText>
            <a href="/">Portfolio</a>
          </NavText>
        </NavItem>
        <NavItem eventKey="home">
          <NavText>
            <div className='col-lg-12'>
              <p className='dashboards-text '>Dashboards</p>
            </div>
            <hr className='dashboards-hr' />
          </NavText>
        </NavItem>
        {storedLayoutNames.map((name, index) => {
          return (
            <NavItem eventKey="home">
              <NavIcon>
                <LayoutOutlined />
              </NavIcon>
              <NavText>
                <a
                  value={name}
                  data-index={index}
                  onClick={handleClick}
                >
                  {name}
                </a>
              </NavText>
            </NavItem>
          );
        })}

      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidenavbar;
