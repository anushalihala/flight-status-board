import { Chip } from "@mui/material";
import styled from "@mui/system/styled";

const StatusChip = styled(Chip)(({ label }: { label: string }) => {
  const statusStyles = {
    "on time": {
      backgroundColor: "#4caf50",
      color: "white",
      fontWeight: "bold",
    },
    delayed: { backgroundColor: "#ff9800", color: "white", fontWeight: "bold" },
    cancelled: {
      backgroundColor: "#f44336",
      color: "white",
      fontWeight: "bold",
    },
    boarding: {
      backgroundColor: "#2196f3",
      color: "white",
      fontWeight: "bold",
    },
    departed: {
      backgroundColor: "#d32f2f",
      color: "white",
      fontWeight: "bold",
    },
  };
  return (
    statusStyles[label?.toLowerCase()] || {
      backgroundColor: "#9e9e9e",
      color: "white",
      fontWeight: "bold",
    }
  );
});

export default StatusChip;
