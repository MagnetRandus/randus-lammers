function convertDateString(date: Date): string {
  // Parse the input date string into a Date object

  // Get the components of the date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Get the timezone offset in hours and minutes
  const timezoneOffset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
    .toString()
    .padStart(2, "0");
  const offsetMinutes = (Math.abs(timezoneOffset) % 60)
    .toString()
    .padStart(2, "0");
  const offsetSign = timezoneOffset >= 0 ? "+" : "-";

  // Construct the ISO 8601 string
  const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;

  return isoString;
}

export default convertDateString;
