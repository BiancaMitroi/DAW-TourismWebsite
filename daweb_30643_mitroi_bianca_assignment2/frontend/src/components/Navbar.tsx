import { TextField } from "@mui/material";
import styled, { css } from "styled-components";
import { Pages } from "../interfaces/Pages";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  background: rgba(255, 255, 210, 0.9);
  top: 20px;
  bottom: 20px;
  left: 20px;
  width: 300px;
  position: absolute;
  border-radius: 10px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
  id: boolean | undefined;
  pages: Pages;
  setPages: React.Dispatch<React.SetStateAction<Pages | undefined>>;
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
          Login: false,
        })
      : setPages({
          Home: window.location.pathname === "/",
          Destinations: window.location.pathname === "/Destinations",
          Offers: window.location.pathname === "/Destinations",
          ViewOffers: false,
          Search: pages.Search,
          Contact: window.location.pathname === "/Contact",
          Login: window.location.pathname === "/Login",
        });
  };
  const { logout } = useContext(AuthContext);
  return (
    <MenuOptionContainer
      id={`${id}`}
      onClick={() => {
        label === "Login" && (logout(), localStorage.removeItem("tokens"));
        handlePages(label);
        console.log(pages);
        label !== "Search"
          ? (window.location.pathname = `/${label}`)
          : window.location.pathname !== `/Destinations`;
        if (label === "Destinations") {
          const destinations = document.getElementById("destinations");
          console.log(destinations);
          if (destinations) {
            destinations.scrollIntoView({ behavior: "smooth" });
          }
        }
      }}
    >
      <MenuOptionIcon src={imgsrc} />
      <MenuOptionText>{label}</MenuOptionText>
    </MenuOptionContainer>
  );
};

const SerchContainer = styled.div`
  ${NavStyle}
`;

const Search = ({
  setLocation,
}: {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <SerchContainer>
      <TextField
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        placeholder={"Enter desired location"}
      ></TextField>
    </SerchContainer>
  );
};

const Offers = ({
  pages,
  setPages,
}: {
  pages: Pages;
  setPages: React.Dispatch<React.SetStateAction<Pages | undefined>>;
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

const Navbar = ({
  pages,
  setPages,
  setLocation,
}: {
  pages: Pages | undefined;
  setPages: React.Dispatch<React.SetStateAction<Pages | undefined>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <NavbarContainer>
      <Logo src="src/assets/images/logo.png" alt="Sunshine Vacations Logo" />
      <Link style={{ textDecoration: "none" }} to="/Home">
        <MenuOption
          id={pages && pages["Home"]}
          imgsrc="src/assets/images/home.png"
          label="Home"
          pages={pages!}
          setPages={setPages!}
        />
      </Link>
      <Link style={{ textDecoration: "none" }} to="/Destinations">
        <MenuOption
          id={pages && pages["Destinations"]}
          imgsrc="src/assets/images/destinations.png"
          label="Destinations"
          pages={pages!}
          setPages={setPages}
        />
      </Link>
      {pages && pages["Offers"] && (
        <Offers pages={pages!} setPages={setPages} />
      )}
      <MenuOption
        id={pages && pages["Search"]}
        imgsrc="src/assets/images/search.png"
        label="Search"
        pages={pages!}
        setPages={setPages}
      />
      {pages && pages["Search"] && <Search setLocation={setLocation} />}
      <Link style={{ textDecoration: "none" }} to="/Contact">
        <MenuOption
          id={pages && pages["Contact"]}
          imgsrc="src/assets/images/contact.png"
          label="Contact"
          pages={pages!}
          setPages={setPages}
        />
      </Link>
      <Link style={{ textDecoration: "none" }} to="/Login">
        <MenuOption
          id={pages && pages["Login"]}
          imgsrc="src/assets/images/account.png"
          label="Login"
          pages={pages!}
          setPages={setPages}
        />
      </Link>
    </NavbarContainer>
  );
};

export default Navbar;
