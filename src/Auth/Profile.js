import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <div class="container emp-profile">
          <form method="post">
            <div class="row">
              <div class="col-md-4">
                <div class="profile-img">
                  <img src={user.picture} alt="" />
                </div>
              </div>
              <div class="col-md-8">
                <div class="profile-head">
                  <h5 className="row">{user.name}</h5>
                  <h5 className="row">
                    {user.email}&nbsp;
                    {user.email_verified ? (
                      <h5>(Verified)</h5>
                    ) : (
                      <h5>(Unverified)</h5>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Profile;
