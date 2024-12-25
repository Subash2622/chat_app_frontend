# ChatApp

## Overview
ChatApp is a real-time chat application that allows users to create chat rooms, join existing rooms, and participate in group conversations. The backend is built using Spring Boot and MongoDB, and the frontend is developed with React and Vite, ensuring a seamless and responsive user experience.

## Features
- **Room Management**: Users can create and join chat rooms.
- **Real-Time Messaging**: Multiple participants can send and receive messages in real time.
- **MongoDB Integration**: Chat data is stored in a MongoDB database.
- **Pagination**: Supports pagination for retrieving chat messages.

## Technologies Used
- **Backend**: Spring Boot
- **Database**: MongoDB
- **Frontend**: React with Vite

## Prerequisites
- Java 17 or higher
- MongoDB installed and running
- Node.js and npm installed
- Maven installed

## Backend Setup and Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd chatapp
   ```

2. **Configure MongoDB**:
   - Ensure MongoDB is running on `localhost:27017`.
   - Update the `application.properties` file if necessary:
     ```properties
     spring.application.name=chat-app-backend
     spring.data.mongodb.uri=mongodb://localhost:27017/chatapp
     ```

3. **Build the Application**:
   ```bash
   mvn clean install
   ```

4. **Run the Application**:
   ```bash
   mvn spring-boot:run
   ```

5. **Access the APIs**:
   - Base URL: `http://localhost:8080`
   - API documentation (if included): e.g., Swagger at `http://localhost:8080/swagger-ui.html`

## Frontend Setup and Installation
1. **Navigate to the Frontend Directory**:
   ```bash
   cd chatapp-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Backend API URL**:
   - Update the `API_BASE_URL` in the frontend configuration file (e.g., `.env` or `src/config.js`) to match your backend URL:
     ```env
     VITE_API_BASE_URL=http://localhost:8080
     ```

4. **Run the Frontend Application**:
   ```bash
   npm run dev
   ```

5. **Access the Frontend**:
   - Open the application in your browser at `http://localhost:5173` (default Vite port).

## API Endpoints
### Chat Messaging
- **Send a Message**: 
  - Endpoint: `POST /app/sendMessage/{roomId}`
  - Request Body:
    ```json
    {
      "roomId": "roomId",
      "content": "message content",
      "sender": "sender name"
    }
    ```
  - Response: Message object with content, sender, and timestamp.

- **Subscribe to Messages**:
  - WebSocket: `/topic/room/{roomId}`

### Room Management
- **Create a Room**:
  - Endpoint: `POST /api/v1/rooms`
  - Request Body: `"roomId"` (string)
  - Response: Newly created room object.

- **Join a Room**:
  - Endpoint: `GET /api/v1/rooms/{roomId}`
  - Response: Room object or error if not found.

- **Retrieve Messages in a Room**:
  - Endpoint: `GET /api/v1/rooms/{roomId}/messages`
  - Query Parameters:
    - `page` (default: 0): Page number.
    - `size` (default: 20): Number of messages per page.
  - Response: List of paginated messages.

## Key Components
### Backend
#### ChatController
Handles WebSocket communication for real-time messaging. Messages are sent to and received from specific rooms.

#### RoomController
Manages room creation, joining, and retrieval of messages with pagination support.

### Frontend
- **React Components**: 
  - **Room Management**: Allows users to create and join rooms.
  - **Chat Interface**: Displays messages and supports real-time updates.

## Future Enhancements
- Add user authentication and authorization.
- Implement WebSocket for real-time updates.
- Enhance UI for a better user experience.

## Contributing
Feel free to contribute by submitting issues or pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

