export function sanitizeAnswer(answer: string) {
  return answer
    .replace(/["',!.$-]|(<i>|<\/i>|^a |^the )/g, "")
    .replace(/( and | & )/g, " ")
    .toLowerCase()
}
