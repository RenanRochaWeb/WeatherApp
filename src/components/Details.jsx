import { fetchForecast } from "../Api";
import React, { useState, useEffect } from "react";
import styles from "../styles/details.module.css";

export default function Details({ info, awareness, type }) {
  //States
  const [receivedInfo, setReceivedInfo] = useState(info || "");
  const [receivedForecast, setReceivedForecast] = useState("");
  const [receivedAwareness, setReceivedAwareness] = useState("");

  //Fetch the data
  useEffect(() => {
    if (info) {
      setReceivedInfo(info);

      const getDataFromApi = async (id) => {
        const resFore = await fetchForecast(id);
        setReceivedForecast(resFore);
      };

      getDataFromApi(info.globalIdLocal);
    }

    if (awareness) {
      setReceivedAwareness(awareness);
    }
  }, [info, awareness]);

  let content = (
    <div>
      <p>{receivedInfo.globalIdLocal}</p>
      <p>{receivedInfo.idAreaAviso}</p>
    </div>
  );

  //Render
  if (type === "Temperatura") {
    content = (
      <div className={styles.wrapper}>
        {receivedForecast && (
          <div>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th>Dia</th>
                  <th>Termperatura Mínima</th>
                  <th>Termperatura Máxima</th>
                  <th>% Precipitação</th>
                  <th>Direção do Vento</th>
                </tr>
              </thead>

              <tbody>
                {receivedForecast.data.map((entry, index) => {
                  return (
                    <tr key={index}>
                      <td>{entry.forecastDate}</td>
                      <td>{entry.tMin}</td>
                      <td>{entry.tMax}</td>
                      <td>{entry.precipitaProb}</td>
                      <td>{entry.predWindDir}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  if (type === "Alertas") {
    content = (
      <div className={styles.wrapper}>
        {receivedAwareness && (
          <div>
            <p>{receivedAwareness.awarenessLevelID}</p>
            <p>{receivedAwareness.awarenessTypeName}</p>
            <p>{receivedAwareness.text}</p>
            <p>
              Deste {receivedAwareness.startTime} até{" "}
              {receivedAwareness.endTime}
            </p>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={styles.content}>
      <p className={styles.type}>{type}</p>
      {(receivedInfo && (
        <div>
          <p className={styles.districtName}>{receivedInfo.local}</p>
          {content}
        </div>
      )) || <p>{"Escolha um distrito do mapa para visualizar " + type}</p>}
    </div>
  );
}
