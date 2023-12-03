export function formatAirdate(airdate: string) {
  return new Date(airdate).toDateString()
}
