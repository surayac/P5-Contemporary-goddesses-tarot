// services/ApiHistory.jsx
import axios from "axios";

const BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";
const HISTORY_PATH = "/history";

const api = axios.create({
  baseURL: BASE_URL,
});

const withNormalizedId = (item) => ({
  ...item,
  id: item.id ?? item._id, 
});

export const getHistory = async () => {
  try {
    const { data } = await api.get(HISTORY_PATH);
    const list = Array.isArray(data) ? data.map(withNormalizedId) : [];
    return list;
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};

export const addHistory = async (reading) => {
  try {
    const { data } = await api.post(HISTORY_PATH, reading);
    return data ? withNormalizedId(data) : null;
  } catch (error) {
    console.error("Error adding history:", error);
    return null;
  }
};

export const deleteHistory = async (id) => {
  if (!id) {
    console.error("deleteHistory: id ausente/inválido");
    return false;
  }
  try {
    await api.delete(`${HISTORY_PATH}/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting history ${id}:`, error);
    return false;
  }
};

export const clearAllHistory = async () => {
  try {
    const history = await getHistory();
    await Promise.all(
      history.map((h) => deleteHistory(h.id)) 
    );
    return true;
  } catch (error) {
    console.error("Error clearing history:", error);
    return false;
  }
};

