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
        background: "oklch(0.18 0 0)",
        color: "oklch(0.95 0.25 130)",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        borderRadius: "1rem",
        boxShadow: "0 0 10px oklch(0.85 0.25 130), 0 4px 32px rgba(0,255,0,0.15)",
        border: "2px solid oklch(0.35 0.20 130)",
      },
      success: {
        iconTheme: {
          primary: 'oklch(0.85 0.25 130)',
          secondary: 'oklch(0.12 0 0)',
        },
      },
      error: {
        iconTheme: {
          primary: 'oklch(0.65 0.27 25)',
          secondary: 'oklch(0.95 0.25 130)',
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
