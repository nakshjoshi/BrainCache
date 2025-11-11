import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Approutes.jsx";
import Navbar from "./components/Navbar.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
 
    <>
     <Toaster
    position="top-center"
    toastOptions={{
      style: {
        background: "#181e2a",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        borderRadius: "1rem",
        boxShadow: "0 4px 32px 0 rgba(80,80,180,0.15)",
      },
      success: {
        iconTheme: {
          primary: '#34d399',
          secondary: '#fff',
        },
      },
      error: {
        iconTheme: {
          primary: '#f87171',
          secondary: '#fff',
        },
      },
    }}
  />
      <Navbar/>
      <Layout>
        <AppRoutes />
      </Layout>

    
    </>
  
    
  );
}

export default App;
