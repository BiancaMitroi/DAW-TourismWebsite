import { useState } from "react";
import styled from "styled-components";
import { SectionContent } from "../assets/interfaces";

const SectionContainer = styled.section`
  position: relative;
  display: flex;
  margin-bottom: 20px;
  margin-left: 0px;
  margin-right: 0px;
  align-items: center;
  height: auto;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  background-color: transparent;
  margin-left: 0px;
  width: 100%;
  height: auto;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const NavButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: transparent;
  border: none;
  &:hover {
    background-color: #a8d8ea;
    opacity: 50%;
  }
`;

const SectionCard = styled.div`
  display: block;
  text-align: left;
  margin-left: 10px;
  height: auto;
  width: 250px;
  &:hover {
    background-color: #a8d8ea;
    opacity: 50%;
  }
  img {
    width: 100%;
    height: auto;
  }
  #img {
    overflow: hidden;
    width: 100%;
    height: 100px;
  }
`;

const MainSection = styled.div`
  height: auto;
  margin-bottom: 20px;
`;

const Card = ({
  title,
  content,
  image,
  link,
  location,
  pricePerNight,
  capacity,
}: SectionContent) => {
  return (
    <SectionCard>
      <h2>{title}</h2>
      <div id="img">
        <img src={image} />
      </div>
      <p style={{ height: "20px", overflow: "hidden" }}>{content}</p>
      {location && <p>location: {location}</p>}
      {pricePerNight && <p>price/night: {pricePerNight}</p>}
      {capacity && <p>capacity: {capacity}</p>}
      <p style={{ height: "20px", overflow: "hidden" }}>link: {link}</p>
    </SectionCard>
  );
};

const Section = ({
  sectionTitle,
  sectionContent,
  id,
}: {
  sectionTitle: string;
  sectionContent: SectionContent[];
  id?: string;
}) => {
  const [index, setIndex] = useState(0);

  function handleSectionCards(direction: string) {
    if (direction === "back" && index > 0) {
      setIndex(index - 1);
    } else if (direction === "next" && index < sectionContent.length - 4) {
      setIndex(index + 1);
    }
  }

  return (
    <MainSection>
      <h1 id={id}>{sectionTitle}</h1>
      <SectionContainer>
        <NavButton onClick={() => handleSectionCards("back")}>
          <img src="src/assets/images/back.png" width={"100%"} />
        </NavButton>
        <Content className={sectionTitle}>
          {sectionContent
            .filter((_item, value) => value >= index && value <= index + 3)
            .map((item: SectionContent) => {
              return (
                <Card
                  title={item.title}
                  content={item.content}
                  image={item.image}
                  location={item.location}
                  pricePerNight={item.pricePerNight}
                  capacity={item.capacity}
                  link={item.link}
                />
              );
            })}
        </Content>
        <NavButton onClick={() => handleSectionCards("next")}>
          <img src="src/assets/images/next.png" width={"100%"} />
        </NavButton>
      </SectionContainer>
    </MainSection>
  );
};
export default Section;
