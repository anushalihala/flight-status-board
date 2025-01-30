import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import FlightDetail from "../components/FlightDetail";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("FlightDetail Component", () => {
  test("renders flight details correctly", async () => {
    const flight = {
      id: "1",
      flightNumber: "AA123",
      airline: "American Airlines",
      origin: "JFK",
      destination: "LAX",
      departureTime: "2024-06-01T12:00:00Z",
      status: "On Time",
    };
    (axios.get as jest.Mock).mockResolvedValue({ data: flight });

    render(
      <BrowserRouter>
        <FlightDetail />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("AA123")).toBeInTheDocument());
    expect(screen.getByText("American Airlines")).toBeInTheDocument();
    expect(screen.getByText("JFK")).toBeInTheDocument();
    expect(screen.getByText("LAX")).toBeInTheDocument();
    expect(screen.getByText("On Time")).toBeInTheDocument();
  });

  test("displays error message on API failure", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(
      <BrowserRouter>
        <FlightDetail />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(
          "Failed to fetch flight details. Please try again later."
        )
      ).toBeInTheDocument()
    );
  });
});
