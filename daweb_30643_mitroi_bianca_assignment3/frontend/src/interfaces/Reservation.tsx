import { Dayjs } from "dayjs";

export interface Reservation {
  id: number;
  destination: number;
  start_date: Dayjs;
  end_date: Dayjs;
  current_date: Dayjs;
  price: number;
}
