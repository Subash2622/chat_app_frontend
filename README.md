# ChatApp Frontend

## Overview
This repository contains the frontend for ChatApp, a real-time chat application that allows users to create rooms, join them, and chat with multiple participants. Built using React and Vite, the application is designed for a seamless and responsive user experience.

## Features
- Room Management: Users can create and join chat rooms.
- Real-Time Messaging: Messages are updated in real time across all participants.
- Responsive Design: Optimized for devices of all sizes.

## Technologies Used
- Framework: React
- Build Tool: Vite
- State Management: Context API or Redux (if applicable)
- Styling: CSS or Tailwind CSS (if applicable)

## Prerequisites
- Node.js and npm installed
- A running instance of the ChatApp backend

## Installation and Setup
1. Clone the Repository:

2. Install Dependencies:

3. Configure Backend API URL:
- Create a `.env` file in the root of the project.
- Add the following environment variable:
  ```
  VITE_API_BASE_URL=http://localhost:8080
  ```
- Replace `http://localhost:8080` with your backend's base URL if it's deployed elsewhere.

4. Run the Application:

5. Access the Application:
Open the browser at `http://localhost:5173` (default Vite development server port).

Starts the Vite development server.

- Build for Production:
Serves the production build locally for testing.

## Backend Integration
The frontend communicates with the backend API at the specified `VITE_API_BASE_URL`. Ensure the backend server is running and accessible before starting the frontend application.

## Future Enhancements
- Add user authentication.
- Improve UI/UX with animations and advanced themes.
- Support file sharing in chat.

## Contributing
Feel free to contribute by submitting issues or creating pull requests.

## License
This project is licensed under the MIT License.

