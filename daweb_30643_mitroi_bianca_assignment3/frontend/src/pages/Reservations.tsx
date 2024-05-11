import { useCallback, useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import Chart from "../components/Chart";
import { Reservation } from "../interfaces/Reservation";
import { SectionContent } from "../interfaces/ISectionContent";

const Reservations = () => {
  console.log(localStorage.getItem("destination"));
  const destination = localStorage.getItem("destination");
  const id = destination ? (JSON.parse(destination) as SectionContent).id : "";
  localStorage.removeItem("startValue");
  localStorage.removeItem("endValue");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const getReservations = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
      const response = await fetch(
        `http://localhost:8000/api/v1/reservations/${id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        },
      );
      const data = await response.json();
      setReservations(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getReservationsCallback = useCallback(getReservations, [id]);

  useEffect(() => {
    getReservationsCallback();
  }, [getReservationsCallback]);

  return (
    <div
      style={{
        display: "block",
        marginLeft: "12.5vw",
        marginTop: "5vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Calendar values={reservations} />
        <Chart values={reservations as Reservation[]} />
      </div>
      <table
        style={{
          width: "30vw",
          marginBottom: "5vh",
          marginTop: "5vh",
        }}
      >
        <thead>
          <tr>
            <th>Destination</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reservation Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation: Reservation) => {
            return (
              <tr key={reservation.id}>
                <td>{reservation.destination}</td>
                <td>{String(reservation.start_date)}</td>
                <td>{String(reservation.end_date)}</td>
                <td>{String(reservation.current_date)}</td>
                <td>{reservation.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
