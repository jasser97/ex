import React from "react";
import "./style.css";
import Card from "../UI/Card";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import { GooglePlusOutlined } from "@ant-design/icons";
const Sidebar = (props) => {
  return (
    <div
      className="sidebarContainer"
      style={{
        width: props.width,
      }}
    >
      <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="cardHeader">
          <span>À PROPOS DE NOUS</span>
        </div>
        <div className="profileImageContainer">
          {/* <img src="xxxxx" alt="" /> */}
        </div>
        <div className="cardBody">
          <p className="personalBio">
            Nous assurons une bonne publicité de l’événement.
            <br />
            En effet, il est possible de consulter et de participer aux
            événements, et aussi permet aux organisateurs de créer et publier
            leurs propres événements.
          </p>
        </div>
      </Card>

      {/* <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="cardHeader">
          <span>sponsor</span>
        </div>
      </Card> */}

      <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="cardHeader">
          <span>
            <FacebookIcon
              style={{
                color: "#4267B2",
                fontSize: 50,
                cursor: "pointer",
                marginRight: 5,
              }}
            />
            <InstagramIcon
              style={{
                color: "#bc2a8d",
                fontSize: 50,
                cursor: "pointer",
                marginRight: 5,
              }}
            />
            <TwitterIcon
              style={{
                color: "#1DA1F2",
                fontSize: 50,
                cursor: "pointer",
                marginRight: 5,
              }}
            />
            <GooglePlusOutlined
              style={{
                fontSize: 50,
                color: "#db4a39",
                cursor: "pointer",
                marginRight: 5,
              }}
            />
          </span>
        </div>

        <div className="recentPosts">
          <div className="recentPost">
            <h3 style={{ textAlign: "center" }}>Nos réseaux sociaux</h3>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
