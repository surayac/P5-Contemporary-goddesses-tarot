import axios from "axios";

const API_URL = "https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot";

export const getAllCards = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
};

export const getSelectedCards = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting readings:", error);
    throw error;
  }
};