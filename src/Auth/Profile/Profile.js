import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import WarningModal from "./WarningModal";
import BasicNavbar from "../../Components/Navbars/BasicNavbar";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <React.Fragment>Loading ...</React.Fragment>;
  }

  return (
    isAuthenticated && (
      <div className="profile-page col-xl-7">
        <BasicNavbar />
        <h1 className="header center">Profile</h1>
        <Card
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <img
            className="center-element"
            src={user.picture}
            alt="Profile Picture"
            style={{ borderRadius: "1000px" }}
          />
          <div className="user-profile-info">
            <h4 className="white center">
              <span className="blue">Name:</span> {user.name}
            </h4>
            <h4 className="white center">
              <span className="blue">Email:</span> {user.email}
            </h4>
            {/* <WarningModal /> */}
          </div>
        </Card>
      </div>
    )
  );
};

export default Profile;
