# Flight Status Board

## Overview

This React-based application provides a real-time flight status board, fetching flight data from an external API and updating the statuses at regular intervals. Users can also view detailed flight information.

## Features

- Displays a table of flights with details such as flight number, airline, origin, destination, departure time, and status.
- Real-time updates every 30 seconds.
- Click on a flight to navigate to a detailed view.
- Error handling for network issues and unavailable flight details.
- Clean and user-friendly UI using Material-UI components.

## Tech Stack

- **Language:** TypeScript
- **Framework:** React
- **UI Library:** Material-UI
- **HTTP Client:** Axios
- **Routing:** React Router
- **Testing:** Jest, React Testing Library, Vitest

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/anushalihala/flight-status-board.git
   cd flight-status-board
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Running Tests

To run unit tests:

```sh
npm test
```

## API Endpoints

- **Get all flights:** `GET https://flight-status-mock.core.travelopia.cloud/flights`
- **Get flight details:** `GET https://flight-status-mock.core.travelopia.cloud/flights/:id`

## Project Structure

```
src/
├── common/
│   ├── types.ts
│   ├── utils.ts
├── components/
│   ├── FlightTable.tsx
│   ├── FlightDetail.tsx
│   ├── StatusChip.tsx
├── App.tsx
├── main.tsx
├── tests/
│   ├── FlightTable.test.tsx
│   ├── FlightDetail.test.tsx
```

## License

This project is licensed under the MIT License.
