import React, { useEffect, useState } from "react";
import "../../App.scss";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import {
  HomeOutlined,
  LineChartOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import db from "../../firebase";

const Sidenavbar = (props) => {
  const { user } = useAuth0();
  const [sidenavHeaderStyle, setSidenavHeaderStyle] = useState("hidden");
  const [arr, setArr] = useState([]);

  const handleClick = (e) => {
    props.setSelectedLayoutIndex(e.target.getAttribute("data-index"));
    props.setWasSelected(true);
  };

  useEffect(() => {
    var docRef = db.collection("saved_dashboards").doc(props.userID);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", Object.values(doc.data().dashboards));

          let mapped = Object.values(doc.data().dashboards).map((el, i) => {
            let values = Object.values(el)[0];
            let names = Object.keys(values);
            return (
              <NavItem eventKey="home">
                <NavIcon>
                  <LayoutOutlined />
                </NavIcon>
                <NavText>
                  <a value={names} data-index={i} onClick={handleClick}>
                    {names}
                  </a>
                </NavText>
              </NavItem>
            );
          });

          setArr(mapped);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <SideNav
      onToggle={(isExpanded) => {
        isExpanded
          ? setSidenavHeaderStyle("visible")
          : setSidenavHeaderStyle("hidden");
      }}
      className="sidenav"
      style={{
        backgroundImage: "linear-gradient(315deg, #121516 0%, #000000 74%)",
        position: "fixed",
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavText>
            <div className="col-lg-12">
              <p
                style={{ visibility: sidenavHeaderStyle }}
                className="dashboards-text"
              >
                Pages
              </p>
            </div>
            <hr className="dashboards-hr" />
          </NavText>
        </NavItem>
        <NavItem eventKey="home">
          <NavIcon>
            <HomeOutlined />
          </NavIcon>
          <NavText>
            <a href="/dashboard">Dashboard</a>
          </NavText>
        </NavItem>
        <NavItem eventKey="home">
          <NavText>
            <div className="col-lg-12">
              <p
                style={{ visibility: sidenavHeaderStyle }}
                className="dashboards-text"
              >
                Dashboards
              </p>
            </div>
            <hr className="dashboards-hr" />
          </NavText>
        </NavItem>
        {arr}
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidenavbar;
