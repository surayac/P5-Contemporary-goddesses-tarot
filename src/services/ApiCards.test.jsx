import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getAllCards } from "./ApiCards";

vi.mock("axios"); 

describe("getAllCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return cards when the API is correctly called", async () => {
    const mockData = [{ id: 1, name: "El Loco" }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getAllCards();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://6872278c76a5723aacd3cbb3.mockapi.io/api/v1/tarot"
    );
  });

  it("should return [] when the API fails", async () => {
    axios.get.mockRejectedValue(new Error("API down"));

    const result = await getAllCards();

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalled();
  });
});
