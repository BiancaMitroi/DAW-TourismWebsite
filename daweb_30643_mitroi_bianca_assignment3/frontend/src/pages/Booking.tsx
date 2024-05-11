import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import dayjs, { Dayjs } from "dayjs";
import { User } from "../interfaces/User";
import { SectionContent } from "../interfaces/ISectionContent";

const ContentCard = styled.div`
  width: 40vw;
  height: 55vh;
  padding: 20px;
  padding-left: 40px;
  position: absolute;
  top: 100px;
  left: 30vw;
  font-size: 20px;
  margin-left: -200px;
  p {
    display: flex;
    align-items: center;
  }
`;

const InfoButton = styled.div`
  width: 20vw;
  height: 50px;
  background-color: #aa96da;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 9vw;
  margin-top: 45px;
  text-shadow: none;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background: #a8d8ea;
    opacity: 0.8;
    cursor: pointer;
  }
`;

async function makeReservation(reservation: {
  destination: number;
  start_date: string | undefined;
  end_date: string | undefined;
  price: number;
}) {
  await fetch("http://localhost:8000/api/v1/reservations/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokens")!).access}`,
    },
    body: JSON.stringify(reservation),
  }).catch((error) => console.error(error));
}

const Booking = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens")!);
  const destination = JSON.parse(
    localStorage.getItem("destination")!,
  ) as SectionContent;
  const decodedTokens = jwtDecode(tokens.access) as User;
  const localStorageStartValue = localStorage.getItem("startValue");
  const localStorageEndValue = localStorage.getItem("endValue");

  const startValue = localStorageStartValue
    ? dayjs(localStorage.getItem("startValue")! as unknown as Dayjs)
    : null;
  const endValue = localStorageEndValue
    ? dayjs(localStorage.getItem("endValue")! as unknown as Dayjs)
    : null;
  return (
    <ContentCard>
      <p>user email: {decodedTokens?.email}</p>
      <p>location: {destination?.location}</p>
      <p>price: {destination?.pricePerNight}</p>
      <p>capacity: {destination?.capacity}</p>
      <p>
        selected interval: {startValue?.format("dddd DD MMMM YYYY")} -
        {endValue?.format("dddd DD MMMM YYYY")}
      </p>
      {destination?.offer !== 0 && <p>offer: {destination?.offer}</p>}
      <p>
        total price:
        {(destination?.pricePerNight ?? 0) *
          (destination?.capacity ?? 0) *
          (1 - (destination?.offer ?? 0) / 100) *
          (endValue?.diff(startValue, "day") ?? 0)}
      </p>
      <InfoButton
        onClick={() => {
          makeReservation({
            destination: destination?.id || 0,
            start_date: startValue?.format("YYYY-MM-DD"),
            end_date: endValue?.format("YYYY-MM-DD"),
            price:
              (destination?.pricePerNight ?? 0) *
              (destination?.capacity ?? 0) *
              (1 - (destination?.offer ?? 0) / 100) *
              (endValue?.diff(startValue, "day") ?? 0),
          });
          localStorage.removeItem("startValue");
          localStorage.removeItem("endValue");
        }}
      >
        Book
      </InfoButton>
    </ContentCard>
  );
};
export default Booking;
