import { DAYS_IN_WEEK } from "constants";
import dayjs from "dayjs";

const localeData = require("dayjs/plugin/localeData");
dayjs.extend(localeData);

export const getMonthYearDateText = (date) => {
  return {
    month: dayjs(date).format("MMMM"),
    year: dayjs(date).year(),
  };
};

export const getWeekDays = () => {
  const weekdayLongName = dayjs.weekdays();
  const weekdayShortName = dayjs.weekdaysShort();

  return weekdayLongName.map((day, index) => ({
    longName: day,
    shortName: weekdayShortName[index],
  }));
};

export const getCurrentMonthCalendarizableDays = (date) => {
  const baseDate = dayjs(date);
  const month = baseDate.format("M");
  const year = baseDate.format("YYYY");

  const amountOfDays = baseDate.daysInMonth() + 1;
  const weekdayOfFirstDayOfCurrentMonth = Number(
    baseDate.startOf("month").day()
  );
  const lastDayOfPreviousMonth = Number(
    getPreviousMonthDate(baseDate).endOf("month").format("D")
  );

  let lastMonthDays = [];
  if (weekdayOfFirstDayOfCurrentMonth > 0) {
    lastMonthDays = [...Array(weekdayOfFirstDayOfCurrentMonth)]
      .map((_, index) => ({
        isEnabled: false,
        number: lastDayOfPreviousMonth - index,
      }))
      .reverse();
  }

  const currentMonthDays = [...Array(amountOfDays).keys()].map((day) => ({
    number: day,
    isEnabled: true,
    month,
    year,
  }));
  currentMonthDays.shift();

  const calendarDays = lastMonthDays.concat(currentMonthDays);

  const nextMonthAmount = DAYS_IN_WEEK - (calendarDays.length % DAYS_IN_WEEK);
  const nextMonthDays = [...Array(nextMonthAmount).keys()].map((day) => ({
    number: day + 1,
    isEnabled: false,
  }));

  return calendarDays.concat(nextMonthDays);
};

export const getPreviousMonthDate = (date) => {
  return dayjs(date).subtract(1, "month");
};

export const getNextMonthDate = (date) => {
  return dayjs(date).add(1, "month");
};

export const getCurrentDate = () => {
  const currentDate = dayjs();
  const { month, year } = getMonthYearDateText(currentDate);

  return {
    date: currentDate,
    month,
    year,
  };
};

export const formatDate = (day, month, year) => {
  if (month < 1 || month > 12) {
    throw new Error("Invalid month. Use a number between 1 and 12.");
  }

  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
};

export function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isDateToday(date) {
  return date === getTodayDate();
}
