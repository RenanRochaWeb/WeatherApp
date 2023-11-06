import React, { useState, useEffect } from "react";
import styles from "../styles/map.module.css";
import map from "../img/Mapa.png";
import mapCoords from "../data/mapCoords.json";
import BeatLoader from "react-spinners/BeatLoader";
import ImageMapper from "react-img-mapper";
import { fetchIdentifiers, fetchAwareness } from "../Api";

export default function Map({ updateInfo, updateAwareness }) {
  //States
  const [identifiers, setIdentifiers] = useState({
    data: mapCoords.map((e) => ({
      local: e.name,
      globalIdLocal: e.id,
      idAreaAviso: "",
    })),
  });
  const [awareness, setAwareness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [mapWidth, setMapWidth] = useState(window.innerWidth * 0.27);

  //Parameters for the map
  const mapParams = {
    name: "portugal",
    areas: mapCoords,
  };

  //click handler for the parent states
  const onMapClick = (area) => {
    const districtInfo = identifiers.find(
      (e) => e.globalIdLocal === parseInt(area.id)
    );
    updateInfo({
      local: districtInfo.local,
      globalIdLocal: districtInfo.globalIdLocal,
      idAreaAviso: districtInfo.idAreaAviso,
    });

    const districtAwareness = awareness.find(
      (e) => e.idAreaAviso === districtInfo.idAreaAviso
    );
    updateAwareness(districtAwareness);
  };

  //handle hover to show district name
  const getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };
  const onEnterArea = (area) => {
    setHoveredArea(area);
  };
  const onLeaveArea = () => {
    setHoveredArea(null);
  };

  //Fetch the data
  useEffect(() => {
    const getDataFromApi = async () => {
      setLoading(true);
      const resIdent = await fetchIdentifiers();
      const resAware = await fetchAwareness();
      setIdentifiers(resIdent);
      setAwareness(resAware);
      setLoading(false);
    };

    getDataFromApi();
  }, []);

  //Resize logic
  useEffect(() => {
    function onScreenResize() {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
      setMapWidth(window.innerWidth * 0.27);
    }

    window.addEventListener("resize", onScreenResize);
  });

  //Render
  if (loading) {
    return (
      <div className={styles.load}>
        <BeatLoader
          color={"rgb(209, 202, 169)"}
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
            borderColor: "gray",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <ImageMapper
        src={map}
        map={mapParams}
        responsive
        stayHighlighted
        toggleHighlighted
        parentWidth={mapWidth}
        onClick={(area) => onMapClick(area)}
        onMouseEnter={(area) => onEnterArea(area)}
        onMouseLeave={() => onLeaveArea()}
      />
      {hoveredArea && (
        <span
          className={styles.tooltip}
          style={{ ...getTipPosition(hoveredArea) }}
        >
          {hoveredArea && hoveredArea.name}
        </span>
      )}
    </div>
  );
}
