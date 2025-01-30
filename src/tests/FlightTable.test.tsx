import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import FlightTable from "../components/FlightTable";
import React from "react";

jest.mock("axios");

describe("FlightTable Component", () => {
  test("renders flight data correctly", async () => {
    const flights = [
      {
        id: "1",
        flightNumber: "AA123",
        airline: "American Airlines",
        origin: "JFK",
        destination: "LAX",
        departureTime: "2024-06-01T12:00:00Z",
        status: "On Time",
      },
      {
        id: "2",
        flightNumber: "BB123",
        airline: "American Airlines",
        origin: "JFK",
        destination: "LAX",
        departureTime: "2024-06-01T12:00:00Z",
        status: "On Time",
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: flights });

    render(
      <BrowserRouter>
        <FlightTable />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("AA123")).toBeInTheDocument());
    expect(screen.getByText("American Airlines")).toBeInTheDocument();
    expect(screen.getByText("JFK")).toBeInTheDocument();
    expect(screen.getByText("LAX")).toBeInTheDocument();
    expect(screen.getByText("On Time")).toBeInTheDocument();
    expect(screen.getByText("BB123")).toBeInTheDocument();
  });

  test("displays error message on API failure", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(
      <BrowserRouter>
        <FlightTable />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText("Failed to fetch flight data. Please try again later.")
      ).toBeInTheDocument()
    );
  });
});
