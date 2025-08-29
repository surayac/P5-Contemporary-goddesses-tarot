import axios from "axios";

const API_URL = "https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot";


export const getCardById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching card with id ${id}:`, error);
    return null;
  }
};

export const getCardsByIds = async (ids = []) => {
  try {
    const results = await Promise.all(ids.map((id) => getCardById(id)));
    return results.filter(Boolean);
  } catch (error) {
    console.error("Error fetching multiple cards:", error);
    return [];
  }
};
