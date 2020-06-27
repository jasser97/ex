import React, { useState, useEffect } from "react";
import { Input } from "antd";
import axios from "axios";
import "./search.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const Serach = (props) => {
  const [allEvents, setAllEvents] = useState([]);
  const [input, setInput] = useState("");
  const [Suggetions, setSuggetions] = useState([]);
  const [keys, setkeys] = useState([]);
  useEffect(() => {
    axios.post("/api/event/getEvent").then((response) => {
      if (response.data.success) {
        setAllEvents(
          response.data.event.filter((el) => el.Validation === true)
        );
      }
    });
  }, []);
  console.log(props);
  useEffect(() => {
    let array = [];
    let Titre = allEvents.map((a) => a.Titre.toLowerCase());
    let City = allEvents.map((a) => a.City);
    let Country = allEvents.map((a) => a.Country);
    array = array.concat(Titre, City, Country);
    let uniq = [...new Set(array)];
    setkeys(uniq);
  }, [allEvents]);
  const onSearch = (value) => {
    if (props.navEvent === "/evenemet") {
      props.refrechFunction(value);
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
    if (props.navEvent === "/evenemet") {
      props.refrechFunction(e.target.value);
    }
    onSearch(e.target.value);
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = keys.sort().filter((v) => regex.test(v));
    }

    setSuggetions(suggestions);
  };

  const suggestionsSelected = (value) => {
    setInput(value);
    setSuggetions([]);
  };
  const renderSuggetions = () => {
    if (Suggetions.length === 0) {
      return null;
    }
    return (
      <ul>
        {Suggetions.map((el, i) => {
          return (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/evenemet"
            >
              <li key={i} onClick={() => suggestionsSelected(el)}>
                {el}
              </li>
            </Link>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="AutoCompleteTexts">
      <Input.Search
        style={{
          width: 150,
          marginLeft: `${props.auth ? "60px" : "10px"}`,
          fontFamily: "Arial, Helvetica, sans-serif",
          marginTop: 4,
          outline: "none",
        }}
        onSearch={onSearch}
        onChange={handleChange}
        size="small"
        value={input}
        placeholder="input here"
      />
      {renderSuggetions()}
    </div>
  );
};

const mapSatetToProps = (state) => {
  return {
    auth: state.auth.isAuthenticated,
  };
};
export default connect(mapSatetToProps)(Serach);
