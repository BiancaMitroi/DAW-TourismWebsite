import { createGlobalStyle } from "styled-components";
import Section from "../components/Section";
import { articleContent, reviewsContent } from "../assets/constants";

const GlobalStyle = createGlobalStyle`
  body {
    text-align: left;
    font-family: Arial, sans-serif;
  }
  h1 {
    margin-left: 60px;
  }
`;

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <Section sectionTitle={"Articles"} sectionContent={articleContent} />
      <Section sectionTitle={"Reviews"} sectionContent={reviewsContent} />
    </>
  );
};

export default Home;
