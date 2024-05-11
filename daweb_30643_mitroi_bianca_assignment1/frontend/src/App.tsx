import { useState } from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Contact from "./pages/Contact";
import { TextField } from "@mui/material";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #A8D8EA;
    text-align: left;
  }
`;

const Navbar = styled.nav`
  background: rgba(255, 255, 210, 0.9);
  top: 20px;
  bottom: 20px;
  left: 20px;
  width: 300px;
  position: absolute;
  border-radius: 10px;
<<<<<<< HEAD
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
=======
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
>>>>>>> c371cbf697f0ecbfee5f4d31935eca3621b45762
`;

const NavStyle = css`
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
  width: 260px;
  height: 60px;
`;

const Logo = styled.img`
  ${NavStyle}
`;

const Selected = css`
  background-color: #a8d8ea;
  opacity: 50%;
  cursor: pointer;
<<<<<<< HEAD
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
=======
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
>>>>>>> c371cbf697f0ecbfee5f4d31935eca3621b45762
`;

const MenuOptionContainer = styled.div`
  ${NavStyle}
  display: flex;
  z-index: 10;
  &:hover {
    ${Selected}
  }
  ${(props) =>
    props.id === "true" &&
    css`
      ${Selected}
    `}
`;

const MenuOptionIcon = styled.img`
  width: 60px;
  height: 60px;
  position: relative;
`;

const MenuOptionText = styled.p`
  margin-left: 20px;
  width: 180px;
  height: 60px;
  position: relative;
  text-align: left;
  font-family: Arial, sans-serif;
`;

const MenuOption = ({
  imgsrc,
  label,
  id,
  pages,
  setPages,
}: {
  imgsrc: string;
  label: string;
  id: boolean;
  pages: {
    Home: boolean;
    Destinations: boolean;
    Offers: boolean;
    ViewOffers: boolean;
    Search: boolean;
    Contact: boolean;
  };
  setPages: React.Dispatch<
    React.SetStateAction<{
      Home: boolean;
      Destinations: boolean;
      Offers: boolean;
      ViewOffers: boolean;
      Search: boolean;
      Contact: boolean;
    }>
  >;
}) => {
  const handlePages = (selectedPage: string) => {
    selectedPage === "Search"
      ? setPages({
          Home: false,
          Destinations: true,
          Offers: true,
          Search: !pages.Search,
          ViewOffers: false,
          Contact: false,
        })
      : setPages({
          Home: selectedPage === "Home",
          Destinations: selectedPage === "Destinations",
          Offers: selectedPage === "Destinations",
          ViewOffers: false,
          Search: selectedPage === "Destinations",
          Contact: selectedPage === "Contact",
        });
  };

  return (
    <MenuOptionContainer
      id={`${id}`}
      onClick={() => {
        handlePages(label);
      }}
    >
      <MenuOptionIcon src={imgsrc} />
      <MenuOptionText>{label}</MenuOptionText>
    </MenuOptionContainer>
  );
};

const MFEContainer = styled.div`
  background: rgba(255, 255, 210, 0.9);
  position: absolute;
  top: 20px;
  left: 340px;
  right: 20px;
  bottom: 20px;
  overflow: auto;
`;

const SerchContainer = styled.div`
  ${NavStyle}
`;

const Search = () => {
  return (
    <SerchContainer>
      <TextField fullWidth placeholder={"Enter desired location"}></TextField>
    </SerchContainer>
  );
};

const Offers = ({
  pages,
  setPages,
}: {
  pages: {
    Home: boolean;
    Destinations: boolean;
    Offers: boolean;
    ViewOffers: boolean;
    Search: boolean;
    Contact: boolean;
  };
  setPages: React.Dispatch<
    React.SetStateAction<{
      Home: boolean;
      Destinations: boolean;
      Offers: boolean;
      ViewOffers: boolean;
      Search: boolean;
      Contact: boolean;
    }>
  >;
}) => {
  return (
    <MenuOptionContainer
      id={`${pages.ViewOffers}`}
      onClick={() => {
        setPages({
          ...pages,
          Destinations: true,
          ViewOffers: true,
        });
      }}
    >
      <MenuOptionIcon src="src/assets/images/offer.png" />
      <MenuOptionText>Offers</MenuOptionText>
    </MenuOptionContainer>
  );
};

const MFEPage = ({
  value,
}: {
  value: {
    Home: boolean;
    Destinations: boolean;
    Offers: boolean;
    ViewOffers: boolean;
    Search: boolean;
    Contact: boolean;
  };
}) => {
  return (
    <MFEContainer>
      {value.Home && <Home />}
      {value.Destinations && <Destinations viewOffer={value.ViewOffers} />}
      {value.Contact && <Contact />}
    </MFEContainer>
  );
};

function App() {
  const [pages, setPages] = useState({
    Home: true,
    Destinations: false,
    Offers: false,
    ViewOffers: false,
    Search: false,
    Contact: false,
  });

  return (
    <>
      <GlobalStyle />
      <Navbar>
        <Logo src="src/assets/images/logo.png" alt="Sunshine Vacations Logo" />
        <MenuOption
          id={pages["Home"]}
          imgsrc="src/assets/images/home.png"
          label="Home"
          pages={pages}
          setPages={setPages}
        />
        <MenuOption
          id={pages["Destinations"]}
          imgsrc="src/assets/images/destinations.png"
          label="Destinations"
          pages={pages}
          setPages={setPages}
        />
        {pages["Offers"] && <Offers pages={pages} setPages={setPages} />}
        <MenuOption
          id={pages["Search"]}
          imgsrc="src/assets/images/search.png"
          label="Search"
          pages={pages}
          setPages={setPages}
        />
        {pages["Search"] && <Search />}
        <MenuOption
          id={pages["Contact"]}
          imgsrc="src/assets/images/contact.png"
          label="Contact"
          pages={pages}
          setPages={setPages}
        />
      </Navbar>
      <MFEPage value={pages} />
    </>
  );
}

export default App;
