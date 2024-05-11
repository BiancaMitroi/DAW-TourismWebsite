import { useState } from "react";
import styled from "styled-components";
import { SectionContent } from "../interfaces/ISectionContent";

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
  width: 100vw;
  height: auto;
  text-align: center;
  font-family: Arial, sans-serif;
  overflow-x: hidden;
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

const SectionCard = styled.div<{ available: boolean; booking: boolean }>`
  display: block;
  color: black;
  text-align: left;
  margin-left: 10px;
  font-size: 0.9em;
  height: 500px;
  width: 350px;
  pointer-events: ${(props) => props.booking && (props.available ? "auto" : "none")};
  &:hover {
    background-color: #A8D8EA;
  }
  img {
    width: 100%;
    height: auto;
  }
  p {
    overflowY: scroll,
    overflowX: hidden
  }
`;

const MainSection = styled.div`
  height: auto;
  margin-bottom: 20px;
`;

const CardLabel = ({
  label,
  labelValue,
}: {
  label: string;
  labelValue: string;
}) => {
  return (
    <div
      style={{
        marginRight: "15px",
        background: "#aa96da",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      {label}: {labelValue}
    </div>
  );
};

const Card = ({
  id,
  booking,
  type,
  title,
  description,
  image,
  location,
  pricePerNight,
  capacity,
  offer,
  link,
  rating,
  user,
  available,
}: SectionContent) => {
  console.log(available, booking);
  return (
    <SectionCard
      available={available!}
      booking={booking!}
      onClick={() => {
        localStorage.setItem(
          "destination",
          JSON.stringify({
            id,
            title,
            description,
            image,
            location,
            pricePerNight,
            capacity,
            offer,
          }),
        );
        booking
          ? (window.location.pathname = "/booking")
          : (window.location.pathname = "/reservations");
      }}
    >
      <h2>{title}</h2>
      {type !== "Reviews" && (
        <div style={{ overflow: "hidden", height: "25vh" }}>
          <img src={`http://localhost:8000${image}`} alt="destination" />
        </div>
      )}
      <p>{description}</p>
      {type === "Articles" && <a href={link}>Read More</a>}
      {type === "Reviews" && (
        <div style={{ display: "flex" }}>
          <CardLabel label={"user"} labelValue={user!} />
          <CardLabel label={"rating"} labelValue={`${String(rating!)}/5`} />
        </div>
      )}
      {(type === "Destinations" || type === "Offers") && (
        <div style={{ display: "flex" }}>
          <CardLabel label={"location"} labelValue={location!} />
          <CardLabel
            label={"price/night"}
            labelValue={String(pricePerNight!)}
          />
        </div>
      )}
      <br />
      <div style={{ display: "flex" }}>
        {type === "Offers" && (
          <CardLabel label={"offer"} labelValue={`${String(offer)}% off`} />
        )}
        {(type === "Destinations" || type === "Offers") && (
          <CardLabel
            label={"capacity"}
            labelValue={`${String(capacity)} people`}
          />
        )}
      </div>
    </SectionCard>
  );
};

const Section = ({
  sectionTitle,
  sectionContent,
  id,
  booking,
}: {
  sectionTitle: string;
  sectionContent: SectionContent[];
  id?: string;
  booking?: boolean;
}) => {
  console.log(sectionContent);
  const [index, setIndex] = useState(0);

  function handleSectionCards(direction: string) {
    if (direction === "back" && index > 0) {
      setIndex(index - 1);
    } else if (direction === "next" && index < sectionContent.length - 3) {
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
          {sectionContent &&
            sectionContent
              .filter((item, value) => value >= index && value < index + 3)
              .map((item: SectionContent) => {
                return (
                  <div
                    style={{
                      cursor: booking
                        ? item.available
                          ? "pointer"
                          : "not-allowed"
                        : "pointer",
                    }}
                  >
                    <Card
                      available={item.available}
                      id={item.id}
                      booking={booking}
                      index={index}
                      type={sectionTitle}
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      location={item.location}
                      pricePerNight={item.pricePerNight}
                      capacity={item.capacity}
                      offer={item.offer}
                      link={item.link}
                      rating={item.rating}
                      user={item.user}
                    />
                  </div>
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
