
import Navbar from "./components/Shared/Navbar.jsx";
import Footer from "./components/Shared/Footer.jsx";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-light text-gray-800">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default App;