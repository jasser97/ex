import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import axios from "axios";
import "./favorite.css";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
// import { IMAGE_BASE_URL, POSTER_SIZE } from "../../Config";
const { Meta } = Card;
function FavoritePage({ user }) {
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Videos, setVideos] = useState([]);
  const RetireFav = (id) => {
    let AbonnéNumberVariables = {
      userId: user,
      videoId: id,
    };
    axios
      .post("/api/abonne/deSabonne", AbonnéNumberVariables)
      .then((response) => {
        if (response.data.success) {
          getVideo();
        } else {
          alert("Failed to desabonné");
        }
      });
  };
  let variable = { userId: user };
  useEffect(() => {
    fetchEvents();
    getVideo();
  }, []);
  const getVideo = () => {
    axios.get("/api/abonne").then((response) => {
      if (response.data) {
        setVideos(response.data);
        setLoading(true);
      } else {
        alert("faled get Video");
      }
    });
  };
  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.videoId.durée / 60);
    var seconds = Math.floor(video.videoId.durée - minutes * 60);

    return (
      <Col
        style={{
          marginBottom: 20,
        }}
        key={index}
        lg={6}
        md={8}
        xs={24}
      >
        <Link to={`/gallerie/DetailVideoPage/${video.videoId._id}`}>
          <div
            style={{
              cursor: "pointer",
              position: "relative",
              marginRight: "2rem",
            }}
          >
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.videoId.thumbnail}`}
            />
            <div
              className=" duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </Link>
        <Meta style={{ marginTop: 3 }} title={video.videoId.Titre} />
        <div
          style={{
            marginTop: 3,
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <span>{moment(video.videoId.createdAt).format("YYYY-MM-DD ")}</span>
          <span>{video.videoId.categorie}</span>
          <span onClick={() => RetireFav(video.videoId._id)}>
            <DeleteIcon style={{ cursor: "pointer" }} />
          </span>
        </div>
      </Col>
    );
  });
  const fetchEvents = () => {
    axios.post("/api/fav/getFavoreEvent", variable).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      }
    });
  };

  const onClickDelete = (eventId, userId) => {
    const variables = {
      eventId: eventId,
      userId: userId,
    };
    axios.post("/api/fav/removeFromFavorite", variables).then((response) => {
      if (response.data.success) {
        fetchEvents();
      } else {
        alert("Failed to Remove From Favorite");
      }
    });
  };

  const renderTab = Favorites.map((el, i) => {
    const content = (
      <div>
        {el.eventImage ? (
          <img
            style={{ width: 300 }}
            src={`http://localhost:5000/${el.eventImage[0]}`}
            alt="event"
          />
        ) : (
          " no image"
        )}
      </div>
    );
    return (
      <tr key={i}>
        <Tooltip
          content={content}
          title={
            <div>
              <h5
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  color: "###",
                  fontFamily: "italic",
                }}
              >
                {el.eventTitle}
              </h5>
              <img
                style={{
                  width: 280,
                  height: 200,
                  marginTop: -7,
                  fontWeight: 500,
                }}
                src={`http://localhost:5000/${el.eventImage[0]}`}
                alt="event"
              />
            </div>
          }
        >
          <td style={{ textAlign: "center" }}>{el.eventTitle}</td>
        </Tooltip>
        <td style={{ textAlign: "center" }}>
          {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }).format(el.startDate)}
        </td>
        <td style={{ textAlign: "center" }}>
          <Button onClick={() => onClickDelete(el.eventId, el.userId)}>
            Retirer de la liste
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <table>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ textAlign: "center" }}> Titre </th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Retirer des favoris</th>
            </tr>
          </thead>
          <tbody>{renderTab}</tbody>
        </table>
      </div>
      <div>
        {Loading ? (
          <div
            style={{
              width: "100%",
              marginLeft: "3rem auto",
              marginRight: "3rem auto",
              marginBottom: "3rem auto",
            }}
          >
            <Row style={{ marginTop: 120 }}>{renderCards}</Row>
          </div>
        ) : (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading
              type="balls"
              height={120}
              width={120}
              color="#f82249"
            />
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user.id,
  };
};

export default connect(mapStateToProps)(FavoritePage);
