import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { default as axios } from "axios";
import FlightDetail from "../components/FlightDetail";
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
    axios.get = jest.fn().mockResolvedValue({ data: flight });

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

  describe("API errors", () => {
    test("displays error message on 404 API failure", async () => {
      axios.get = jest.fn().mockRejectedValue({ response: { status: 404 } });

      render(
        <BrowserRouter>
          <FlightDetail />
        </BrowserRouter>
      );

      await waitFor(() =>
        expect(
          screen.getByText("Flight not found. It may have been removed.")
        ).toBeInTheDocument()
      );
    });

    test("displays error message on 500 API failure", async () => {
      axios.get = jest.fn().mockRejectedValue({ response: { status: 500 } });

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
});
