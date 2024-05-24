import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTime(dateString: string): string {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight
  const timeString = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
  return timeString;
}

export function getDate(dateString: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dayString = `${day} ${month} ${year}`;
  return dayString;
}

export function convertDateTime(dateTimeString: string): string {
  const date: Date = new Date(dateTimeString);

  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();

  const formattedDate: string =
    (day < 10 ? "0" : "") +
    day +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    year;

  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  const formattedTime: string =
    (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;

  return formattedDate + " " + formattedTime;
}

export const isCountdown = (dateTime: string) => {
  const targetDate = new Date(dateTime);
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference > 0) {
    return {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60),
    };
  }

  return false;
};

export const numWithComma = (num: number) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const onEnterClick = (
  e: React.KeyboardEvent<HTMLInputElement>,
  callback: () => void
) => {
  if (e.key === "Enter") {
    callback();
  }
};
