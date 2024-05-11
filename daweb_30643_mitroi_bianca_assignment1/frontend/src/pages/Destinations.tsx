import styled, { createGlobalStyle } from "styled-components";
import Section from "../assets/Section";
import { destinationContent, offerContent } from "../assets/constants";
import BasicDatePicker from "../assets/DatePicker";

const GlobalStyle = createGlobalStyle`
  body {
    text-align: left;
    font-family: Arial, sans-serif;
  }
  h1 {
    margin-left: 60px;
  }
`;

const DatePickerContainer = styled.div`
  background-color: #ffffd2;
  z-index: 10;
  padding: 20px;
  display: flex;
  position: sticky;
  top: 0;
  justify-content: center;
  width: auto;
`;

function scrollToOffers() {
  const offers = document.getElementById("offers");
  if (offers) {
    offers.scrollIntoView({ behavior: "smooth" });
  }
}

const Destinations = ({ viewOffer }: { viewOffer: boolean }) => {
  if (viewOffer) {
    scrollToOffers();
  }
  return (
    <>
      <GlobalStyle />
      <DatePickerContainer>
        <BasicDatePicker />
      </DatePickerContainer>
      <Section
        sectionTitle={"Destinations"}
        sectionContent={destinationContent}
      />
      <div id="offers">
        <Section sectionTitle={"Offers"} sectionContent={offerContent} />
      </div>
    </>
  );
};

export default Destinations;
