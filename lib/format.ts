const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: string | Date): string {
  return dateFormatter.format(new Date(date));
}
