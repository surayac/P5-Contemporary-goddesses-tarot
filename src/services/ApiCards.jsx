import axios from "axios";

const API_URL = "https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot";

export const getAllCards = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
};

//Estoy agregando esto para poder obtener varias cartas por un array → En la prueba que hago no interviene con lo que tienen mis compis.

export const getCardById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching card ${id}:`, error);
    return null;
  }
};

export const getCardsByIds = async (ids) => {
  try {
    const promises = ids.map((id) => getCardById(id));
    return Promise.all(promises);
  } catch (error) {
    console.error("Error fetching multiple cards:", error);
    return [];
  }
};