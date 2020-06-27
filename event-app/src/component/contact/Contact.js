import React, { useState } from "react";
import NavApp from "../nav-app/NavApp";
import Fotter from "../footer/Footer";
import BackToTop from "../Back-to-top/BackTop";
import "./Contact.css";
import { addcontact } from "../../actions/contactaction";
import { connect } from "react-redux";

import { Row, Container, Col, Form } from "react-bootstrap";

const Contact = (props) => {
  console.log(props);
  const [Contact, setContact] = useState({
    name: "",
    email: "",
    sujet: "",
    message: "",
  });

  const handleChange = (e) => {
    setContact({ ...Contact, [e.target.name]: e.target.value });
  };
  const handleSubmilt = (e) => {
    e.preventDefault();
    if (
      Contact.email === "" ||
      Contact.name === "" ||
      Contact.sujet === "" ||
      Contact.message === ""
    ) {
      alert("svp remplir tous les champs");
    } else {
      props.addcontact(Contact);
      alert("votre message est bien reçu");
      setContact({
        name: "",
        email: "",
        sujet: "",
        message: "",
      });
    }
  };
  return (
    <div>
      <NavApp navContact={props.location.pathname} />
      <section
        id="contact"
        style={{
          marginTop: "40px",
          display: "flex",
          paddingLeft: 30,
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Container style={{ marginTop: -20 }}>
          <div className="sectionheader">
            <h2 style={{ color: "#fa95a7b9" }}>CONTACTEZ NOUS</h2>
          </div>
        </Container>
        <Container
          fluid={true}
          style={{
            textAlign: "center",
          }}
        >
          <Form className="contactForm ">
            <Row className="form-row " style={{ width: "50.7%" }}>
              <Col
                style={{ textAlign: "center" }}
                xs={12}
                sm={6}
                className="form-group "
              >
                <input
                  style={{ border: "1px solid #ced4da", marginBottom: 20 }}
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Nom"
                  onChange={handleChange}
                  value={Contact.name}
                />
              </Col>
              <Col xs={12} sm={6} className="form-group ">
                <input
                  style={{
                    border: "1px solid #ced4da",
                    width: "100%",
                    marginBottom: 20,
                  }}
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder=" E-mail"
                  data-rule="email"
                  onChange={handleChange}
                  value={Contact.email}
                />
              </Col>
            </Row>
            <div
              style={{ width: "50%", marginBottom: 40 }}
              className="form-group"
            >
              <input
                style={{ border: "1px solid #ced4da" }}
                type="text"
                className="form-control"
                name="sujet"
                id="subject"
                placeholder="Sujet"
                onChange={handleChange}
                value={Contact.sujet}
              />
            </div>
            <div style={{ width: "50%" }} className="form-group">
              <textarea
                style={{ border: "1px solid #ced4da", marginBottom: 20 }}
                className="form-control"
                name="message"
                rows={5}
                id="message"
                placeholder="Message"
                onChange={handleChange}
                value={Contact.message}
              />

              <div className="text-center">
                <button
                  onClick={handleSubmilt}
                  style={{
                    background: "#fa95a7b9",
                    border: 0,
                    padding: "10px 25px",
                    color: "#fff",
                    transition: "0.4s",
                    borderRadius: "50px",
                    cursor: "pointer",
                    outline: "none",
                    height: "45px",
                    marginTop: 20,
                  }}
                >
                  <p id="button" style={{ fontSize: "15px" }}>
                    Envoyer Message
                  </p>
                </button>
              </div>
            </div>
          </Form>
        </Container>
      </section>
      <Fotter />
      <BackToTop />
    </div>
  );
};

export default connect(null, { addcontact })(Contact);
