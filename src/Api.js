import axios from "axios";

const fetchIdentifiers = async () => {
  const response = await axios.get(
    "https://api.ipma.pt/open-data/distrits-islands.json"
  );
  return response.data.data;
};

const fetchAwareness = async () => {
  const response = await axios.get(
    "https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json"
  );
  return response.data;
};

const fetchForecast = async (id) => {
  const response = await axios.get(
    `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${id}.json`
  );
  return response.data;
};

export { fetchIdentifiers, fetchAwareness, fetchForecast };
