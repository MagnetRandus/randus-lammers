function dateReadable(date: Date): string {
  return date.toLocaleDateString("en-ZA", { weekday: "short", year: "numeric", month: "long", day: "2-digit" });
}
export default dateReadable;
