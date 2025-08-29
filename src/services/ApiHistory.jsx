import axios from "axios";

const HISTORY_URL = "http://localhost:3001/history";


export const getHistory = async () => {
  try {
    const response = await axios.get(HISTORY_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};


export const addHistory = async (reading) => {
  try {
    const response = await axios.post(HISTORY_URL, reading);
    return response.data;
  } catch (error) {
    console.error("Error adding history:", error);
    return null;
  }
};

export const deleteHistory = async (id) => {
  try {
    await axios.delete(`${HISTORY_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting history ${id}:`, error);
    return false;
  }
};

export const clearHistory = async () => {
  try {
    const history = await getHistory();
    await Promise.all(history.map((h) => deleteHistory(h.id)));
    return true;
  } catch (error) {
    console.error("Error clearing history:", error);
    return false;
  }
};
