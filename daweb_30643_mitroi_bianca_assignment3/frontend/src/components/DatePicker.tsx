import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({
  setStartValue,
  setEndValue,
}: {
  setStartValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  setEndValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Start date"
          value={
            localStorage.getItem("startValue")
              ? dayjs(localStorage.getItem("startValue"))
              : null
          }
          onChange={(newValue: dayjs.Dayjs | null) => {
            newValue &&
              (localStorage.setItem("startValue", newValue.toString()),
              setStartValue(newValue));
            window.location.reload();
          }}
        />
        <DatePicker
          label="End date"
          value={
            localStorage.getItem("endValue")
              ? dayjs(localStorage.getItem("endValue"))
              : null
          }
          onChange={(newValue: dayjs.Dayjs | null) => {
            newValue &&
              (localStorage.setItem("endValue", newValue.toString()),
              setEndValue(newValue));
            window.location.reload();
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
