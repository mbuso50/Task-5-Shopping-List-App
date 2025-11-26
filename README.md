Shopping List App - Documentation
Project Overview
A full-stack shopping list application built with React, TypeScript, Node.js, and JSON Server. Features user authentication, shopping list management, and real-time updates.

npm or yarn

Installation & Setup
install dependencies:


# Install all dependencies
npm install
Start the backend server:

bash
# Terminal 1 - Start the JSON Server with authentication
cd server
node server-fixed.cjs
Expected output:

text
 Starting CommonJS server...
Server instances created
Middlewares applied
Starting server listen on port 3001
Server is ACTUALLY RUNNING on port 3001
 Test: curl http://localhost:3001/api/health
 Server started at: 2025-11-26T19:16:34.802Z
 Server process should stay running...
Start the frontend development server:

bash
# Terminal 2 - Start React app
npm run dev
Open your browser:


 Authentication
Default Test User
Email: test@example.com

Password: password

Available Users in Database
John Doe

Email: john.doe@example.com

Password: password123

James Last

Email: user1@example.com

Password: (hashed)

API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/profile - Get user profile (protected)

PATCH /api/profile - Update user profile (protected)

Shopping Lists
GET /api/shoppingLists - Get user's shopping lists

GET /api/shoppingListItems - Get shopping list items

POST /api/shoppingListItems - Create new item

PATCH /api/shoppingListItems/:id - Update item

DELETE /api/shoppingListItems/:id - Delete item

Health Check
GET /api/health - Server status

🛠️ Development
Running in Development Mode
bash
# Terminal 1 - Backend (keep this running)
cd server
node server-fixed.cjs

# Terminal 2 - Frontend
npm run dev
Building for Production
bash
# Build the React app
npm run build



# Health check
curl http://localhost:3001/api/health

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Get profile (with token)
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/profile
Deployment
Frontend (GitHub Pages)
bash
npm run build
npm run deploy
Backend
The backend can be deployed to any Node.js hosting service (Heroku, Railway, Render, etc.).

If you encounter issues:

Check the server logs in Terminal 1

Check browser console for frontend errors

Verify all services are running on correct ports

Test API endpoints directly with curl


