import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import Navbar from "./components/Navbar";
import { Pages } from "./interfaces/Pages";
import MFEPage from "./components/MFEPage";
import { BrowserRouter } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import { AuthProvider } from "./context/AuthContext";

const GlobalStyle = createGlobalStyle`
  :root {
    background-color: #A8D8EA;
    text-align: left;
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }
  
    /* Hide scrollbar for IE, Edge and Firefox */
    html {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
`;

function App() {
  const [pages, setPages] = useState<Pages | undefined>({
    Home:
      window.location.pathname === "/" || window.location.pathname === "/Home",
    Destinations: window.location.pathname === "/Destinations",
    Offers: window.location.pathname === "/Destinations",
    ViewOffers: false,
    Search: false,
    Contact: window.location.pathname === "/Contact",
    Login: window.location.pathname === "/Login",
  });
  const [location, setLocation] = useState<string>("");

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    localStorage.setItem(
      "isGeolocationAvailable",
      isGeolocationAvailable.toString(),
    );
    localStorage.setItem(
      "isGeolocationEnabled",
      isGeolocationEnabled.toString(),
    );
    localStorage.setItem("latitude", coords?.latitude.toString() || "0");
    localStorage.setItem("longitude", coords?.longitude.toString() || "0");
    localStorage.setItem("altitude", coords?.altitude?.toString() || "0");
  }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthProvider e={null}>
        <Navbar pages={pages} setPages={setPages} setLocation={setLocation} />
        <MFEPage value={pages!} location={location} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
