// library to decode html entities
import he from "he";

//  ------ Function that change time format (24h format to 12h format)
export const changeTimeFormat = (format24h) => {
  const arr = format24h.split(":");
  let hours = parseInt(arr[0]);
  const minutes = parseInt(arr[1]);

  const amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const format12h =
    hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + amPm;

  return format12h;
};

// ------ Function to normalize text
export const normalizeText = (text) => {
  return he.decode(text);
};
