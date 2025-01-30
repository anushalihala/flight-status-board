import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Alert,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import StatusChip from "./StatusChip";
import { Flight } from "../common/types";
import { formatUTCDateTime, getApiUrl } from "../common/utils";

const FlightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(`${getApiUrl()}/${id}`);
        setFlight(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch flight details. Please try again later.");
      }
    };
    fetchFlight();
  }, [id]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!flight)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Flight Details
      </Typography>
      <Typography>
        <strong>Flight Number:</strong> {flight.flightNumber}
      </Typography>
      <Typography>
        <strong>Airline:</strong> {flight.airline}
      </Typography>
      <Typography>
        <strong>Origin:</strong> {flight.origin}
      </Typography>
      <Typography>
        <strong>Destination:</strong> {flight.destination}
      </Typography>
      <Typography>
        <strong>Departure Time:</strong>{" "}
        {formatUTCDateTime(flight.departureTime)}
      </Typography>
      <Typography>
        <strong>Status:</strong> <StatusChip label={flight.status} />
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        component={Link}
        to="/"
      >
        Back to Flights
      </Button>
    </Container>
  );
};

export default FlightDetail;
