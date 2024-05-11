import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Reservation } from "../interfaces/Reservation";
import dayjs from "dayjs";

export default function Chart({ values }: { values: Reservation[] }) {
  const data = values.map((item: Reservation) => ({
    monthName: dayjs(item.start_date).format("MMMM YYYY"),
  }));

  function createDatesDictionary(dates: { monthName: string }[]) {
    const datesDict: { [key: string]: number } = {};

    dates.forEach(({ monthName }) => {
      if (!datesDict[monthName]) {
        datesDict[monthName] = 0;
      }
      datesDict[monthName]++;
    });

    return Object.entries(datesDict).map(([monthName, count]) => ({
      monthName,
      count,
    }));
  }

  const formattedData = createDatesDictionary(data);

  return (
    <BarChart
      width={500}
      height={300}
      data={formattedData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="monthName" />
      <YAxis tickCount={7} />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#aa96da" />
    </BarChart>
  );
}
