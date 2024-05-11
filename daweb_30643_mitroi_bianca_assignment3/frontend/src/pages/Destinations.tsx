import styled, { createGlobalStyle } from "styled-components";
import Section from "../components/Section";
import BasicDatePicker from "../components/DatePicker";
import { useContext, useEffect, useState } from "react";
import { SectionContent } from "../interfaces/ISectionContent";
import AuthContext from "../context/AuthContext";
import Admin from "../components/admin/Admin";
import dayjs, { Dayjs } from "dayjs";
import { Reservation } from "../interfaces/Reservation";

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

const Destinations = ({
  viewOffer,
  location,
}: {
  viewOffer: boolean;
  location: string;
}) => {
  if (viewOffer) {
    scrollToOffers();
  }
  const { user } = useContext(AuthContext);
  console.log(user);
  const [destinations, setDestinations] = useState<SectionContent[]>([]);
  const [offers, setOffers] = useState<SectionContent[]>([]);
  const [error, setError] = useState<Error | null>();
  const localStorageStartValue = localStorage.getItem("startValue");
  const localStorageEndValue = localStorage.getItem("endValue");

  const [startValue, setStartValue] = useState<Dayjs | null>(
    localStorageStartValue ? dayjs(localStorageStartValue) : null,
  );
  const [endValue, setEndValue] = useState<Dayjs | null>(
    localStorageEndValue ? dayjs(localStorageEndValue) : null,
  );

  localStorage.removeItem("destination");
  localStorage.removeItem("id");
  const getDestinationsByLocation = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");

      const [reservationsResponse, response] = await Promise.all([
        fetch(`http://localhost:8000/api/v1/reservations/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${tokens.access}` },
        }),
        location && location.length > 2
          ? fetch(
              `http://localhost:8000/api/v1/destinations/filter/${location}/`,
              {
                method: "GET",
                headers: { Authorization: `Bearer ${tokens.access}` },
              },
            )
          : fetch(`http://localhost:8000/api/v1/destinations/`, {
              method: "GET",
              headers: { Authorization: `Bearer ${tokens.access}` },
            }),
      ]);

      if (!reservationsResponse.ok || !response.ok) {
        throw new Error(
          `HTTP error! status: ${reservationsResponse.status}, ${response.status}`,
        );
      }

      const reservationsData = await reservationsResponse.json();
      console.log(reservationsData);
      const data = await response.json();

      const unavailableDestinations = reservationsData
        .filter((reservation: Reservation) => {
          return startValue && endValue
            ? !(
                endValue.isBefore(dayjs(reservation.start_date)) ||
                dayjs(reservation.end_date).isBefore(startValue)
              )
            : null;
        })
        .map(
          (reservation: Reservation) => reservation && reservation.destination,
        );

      console.log(unavailableDestinations);

      const filteredDestinations = data.filter(
        (destination: SectionContent) => {
          const available = !unavailableDestinations.includes(destination.id);
          destination.available = available;
          return (
            destination.offer === 0 ||
            destination.offer === null ||
            destination.offer === undefined
          );
        },
      );

      const filteredOffers = data.filter((destination: SectionContent) => {
        const available = !unavailableDestinations.includes(destination.id);
        destination.available = available;
        console.log(destination.available);
        return (
          destination.offer !== 0 &&
          destination.offer !== null &&
          destination.offer !== undefined
        );
      });

      setDestinations(filteredDestinations);
      setOffers(filteredOffers);
      setError(null);
    } catch (error: any) {
      setError(error);
      console.error(error);
    }
  };
  useEffect(() => {
    getDestinationsByLocation();
  }, [location, viewOffer, setDestinations, setError]);

  return (
    <>
      <GlobalStyle />
      {user &&
        (!user.is_staff ? (
          <DatePickerContainer>
            <BasicDatePicker
              setStartValue={setStartValue}
              setEndValue={setEndValue}
            />
          </DatePickerContainer>
        ) : (
          <Admin />
        ))}
      {!error ? (
        <>
          <div id="destinations">
            <Section
              sectionTitle={"Destinations"}
              sectionContent={destinations}
              booking={user && !user.is_staff}
            />
          </div>
          <div id="offers">
            <Section
              sectionTitle={"Offers"}
              sectionContent={offers}
              booking={user && !user.is_staff}
            />
          </div>
        </>
      ) : (
        <>Not Found</>
      )}
    </>
  );
};

export default Destinations;
