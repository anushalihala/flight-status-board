import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { default as axios } from "axios";
import FlightTable from "../components/FlightTable";
import "@testing-library/jest-dom";

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
        airline: "British Airlines",
        origin: "JFK2",
        destination: "LAX2",
        departureTime: "2025-06-01T12:00:00Z",
        status: "Boarding",
      },
    ];
    axios.get = jest.fn().mockResolvedValue({ data: flights });

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

  describe("API errors", () => {
    test("displays error message on 500 API failure", async () => {
      axios.get = jest.fn().mockRejectedValue({ response: { status: 500 } });

      render(
        <BrowserRouter>
          <FlightTable />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(
          screen.getByText("Network error. Failed to fetch flight data.")
        ).toBeInTheDocument()
      );
    });

    test("displays error message on 429 API failure", async () => {
      axios.get = jest.fn().mockRejectedValue({ response: { status: 429 } });

      render(
        <BrowserRouter>
          <FlightTable />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(
          screen.getByText("API limit exceeded. Please try again later.")
        ).toBeInTheDocument()
      );
    });
  });
});
