# Cookie Auth App
This repository contains a full-stack application implementing HTTP-only cookie-based token authentication using Express.js for the backend and React.js for the frontend. The application uses Axios interceptors for handling authentication and token refresh.

### Features
__Express.js Backend:__ Implements user authentication and authorization using HTTP-only cookies for storing JWT tokens.
__React.js Frontend:__ Provides a user interface with protected routes, login, and logout functionality.
__Axios Interceptors:__ Handles attaching tokens to requests and refreshing tokens automatically.
### Technologies
- Node.js
- Express.js
- React.js
- Axios
- JWT

### Installation
##### Prerequisites
- Node.js (v20)
- npm
- git

##### Clone the repository:
```
git clone https://github.com/senthur-kumaran/cookie-auth-app.git
cd cookie-auth-ap
```

#### Backend Setup
Navigate to the server directory:
```
cd server
```

Install dependencies:
```
npm install
```

Create a .env file and add the environment variables:
```
PORT=8000
DB_URI=mongodb://localhost:27017/cookie-auth
SECRET_KEY=jwt-secret-key
REFRESH_SECRET_KEY=jwt-refresh-secret-key
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```
npm start
```

### Frontend Setup

Navigate to the client directory:
```
cd client
```

Install dependencies:
```
npm install
```

Create a .env file and add the environment variables:
```
VITE_API_URL=http://localhost:8000
```

Start the frontend development server:
```
npm run dev
```
