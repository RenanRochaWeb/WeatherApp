import "./App.css";
import React, { useState, useRef } from "react";
import Nav from "./components/Nav";
import Map from "./components/Map";
import Home from "./components/Home";
import Details from "./components/Details";

export default function App() {
  //States
  const [info, setInfo] = useState(null);
  const [awareness, setAwareness] = useState(null);
  const [type, setType] = useState(null);

  //Refs
  const contentRef = useRef();

  //Changes to state
  const updateInfo = (data) => {
    setInfo(data);
  };
  const updateAwareness = (data) => {
    setAwareness(data);
  };
  const updateType = (data, scroll) => {
    setType(data);
    if (scroll) {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //Render
  let content = <Home />;

  if (type) {
    content = (
      <div className="wrapper">
        <div id="mapWrapper">
          <Map updateInfo={updateInfo} updateAwareness={updateAwareness} />
        </div>
        <div id="detailsWrapper">
          <Details info={info} awareness={awareness} type={type} />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Nav updateType={updateType} />
      <div className="mainContent" ref={contentRef}>
        {content}
      </div>
    </div>
  );
}
