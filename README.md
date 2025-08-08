**TourBD: Explore Bangladesh - Your Ultimate Travel Companion**
<img width="1885" height="917" alt="Screenshot 2025-08-08 125405" src="https://github.com/user-attachments/assets/caff8b6a-23f3-4a34-8762-03adbca18c7b" />

**Description**
TourBD is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to connect travelers with the enchanting beauty and rich culture of Bangladesh. It provides a comprehensive platform for discovering tour packages, managing bookings, and engaging with a vibrant community of fellow travelers.

**Live Demo**
 Please Visit: https://a12-tourbd.web.app/

**Features**
TourBD offers a robust set of features categorized by user roles:

**General Features (Accessible to All)**
- User Authentication: Secure login, registration, and Google Sign-in for seamless access.
- Forgot Password: Functionality to reset forgotten passwords via email.

**All Trips Page:**
- Browse a wide array of tour packages.
- Sorting Functionality: Sort packages by price (low to high, high to low).
- Animations: Engaging scroll-in animations for trip cards using Framer Motion.

**Package Details Page:** 
- View comprehensive information about individual tour packages.

**Community Stories Page:**
- Read inspiring travel stories shared by community members.
- Pagination: Efficiently browse through numerous stories with clear pagination controls.
- Animations: Smooth scroll-in animations for story cards using Framer Motion.

**About Us Page:** 
- Learn about TourBD's mission and meet the dedicated team
- featuring professional animations for sections and a responsive carousel for team members.

**Tourist Dashboard**
- My Bookings: View a list of all their booked tour packages and manage their status (e.g., cancel pending bookings).
- My Profile: User can edit their name, profile image and change password
- Application portal for becoming a Tourist Guide

**Tour Guide Dashboard**
- My Profile: Tour guides can update their profile information, including name, photo, experience, and bio.
- My Assigned Tours: View the tours that are assigned to that guide.

**Admin Dashboard**
- Manage Users: View all registered users, update their roles (e.g., make a user a Tour Guide or Admin), and delete user accounts.
- Manage Candidates: Review and manage applications from users wishing to become tour guides (approve or reject).
- Manage Bookings: Oversee all tour bookings, update booking statuses (pending, approved, rejected, cancelled).
- Add Package: Add new tour packages to the system, including detailed information, images, and tour plans.

**Technologies Used**

**Frontend (React.js)**
- React.js: A JavaScript library for building user interfaces.
- Vite: A fast build tool for modern web projects.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- TanStack Query (React Query): For efficient data fetching, caching, and synchronization.
- Framer Motion: A production-ready motion library for React to create animations.
- React Slick: A carousel component for React.
- SweetAlert2: A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes.
- Axios: A promise-based HTTP client for making API requests.
- Firebase (Authentication): For user authentication (email/password, Google Sign-in, password reset).
- React Router: For declarative routing in the application.

**Backend (Node.js & Express.js)**
- Node.js: JavaScript runtime environment.
- Express.js: A fast, unopinionated, minimalist web framework for Node.js.
- MongoDB: A NoSQL database for storing application data.
- MongoDB Driver: For interacting with MongoDB.
- JSON Web Tokens (JWT): For secure user authentication and authorization.
- CORS: Middleware to enable Cross-Origin Resource Sharing.

Installation & Setup
Follow these steps to set up the TourBD project locally.

**1. Clone the Repository**
git clone <your-repository-url>
cd tour-management-system # Or whatever your root project folder is named

**2. Backend Setup**
Navigate to the backend directory (or wherever your index.js and package.json for the backend are located).

cd backend # Adjust path if your backend is in the root or a different folder

**Install Dependencies:**
- npm install or yarn install

**Environment Variables:**
Create a .env file in the root of your backend directory and add your MongoDB connection URI and any other sensitive keys (e.g., JWT secret).

# backend/.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Add any other backend-specific environment variables here

**Run the Backend Server:**
- nodemon index.js

The backend server should start on http://localhost:5000 (or the port you configured).

3. Frontend Setup
Navigate to the client directory (or wherever your package.json for the frontend is located).

cd ../client # Adjust path based on your project structure

**Install Dependencies:**
- npm install


**Environment Variables:**
Create a .env file in the root of your frontend directory and add your Firebase client configuration.

# client/.env
VITE_apiKey=AIzaSy...
VITE_authDomain=your-app.firebaseapp.com
VITE_projectId=your-project-id
VITE_storageBucket=your-bucket.appspot.com
VITE_messagingSenderId=...
VITE_appId=1:...:web:...

**Run the Frontend Development Server:**
- npm run dev

_The frontend application should open in your browser, typically at http://localhost:5173.
_
**Contributing**
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

**Note: **
There's a bit of an issue with the tour guide's dashboard, like updating their profile is not working.
