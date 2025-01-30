import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Alert,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import StatusChip from "./StatusChip";
import { formatUTCDateTime, getApiUrl } from "../common/utils";
import { Flight } from "../common/types";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:hover": {
    backgroundColor: "#e0f7fa",
  },
}));

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(getApiUrl());
        setFlights(response.data);
        setError(null);
      } catch (err) {
        if (err.response?.status) {
          setError(
            err.response?.status === 429
              ? "API limit exceeded. Please try again later."
              : "Network error. Failed to fetch flight data."
          );
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: "15px" }}>
        Flight Status Board
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {error == null && (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ mt: 2, borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Flight Number
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Airline
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Origin
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Destination
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Departure Time
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error == null && flights.length < 1 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <div
                      style={{
                        width: "100%",
                        padding: "20px",
                        textAlign: "center",
                      }}
                    >
                      <CircularProgress
                        sx={{ display: "block", mx: "auto", my: 4 }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {flights.map((flight) => (
                <StyledTableRow key={flight.id}>
                  <TableCell>{flight.flightNumber}</TableCell>
                  <TableCell>{flight.airline}</TableCell>
                  <TableCell>{flight.origin}</TableCell>
                  <TableCell>{flight.destination}</TableCell>
                  <TableCell>
                    {formatUTCDateTime(flight.departureTime)}
                  </TableCell>
                  <TableCell>
                    <StatusChip label={flight.status} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/flights/${flight.id}`}
                    >
                      View
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default FlightTable;
