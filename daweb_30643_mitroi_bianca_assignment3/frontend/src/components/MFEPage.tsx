import styled from "styled-components";
import Home from "../pages/Home";
import Destinations from "../pages/Destinations";
import Contact from "../pages/Contact";
import { Pages } from "../interfaces/Pages";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Booking from "../pages/Booking";
import Reservations from "../pages/Reservations";

const MFEContainer = styled.div`
  background: rgba(255, 255, 210, 0.9);
  position: absolute;
  top: 20px;
  left: 340px;
  right: 20px;
  bottom: 20px;
  overflow: auto;
`;

const MFEPage = ({ value, location }: { value: Pages; location: string }) => {
  return (
    <>
      <MFEContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route
            path="/Destinations"
            element={
              <Destinations
                location={location}
                viewOffer={value && value.ViewOffers}
              />
            }
          />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </MFEContainer>
    </>
  );
};

export default MFEPage;
