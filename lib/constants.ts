export const LOCATIONS = [
  { value: "new-york", label: "New York", flag: "🇺🇸" },
  { value: "los-angeles", label: "Los Angeles", flag: "🇺🇸" },
  { value: "london", label: "London", flag: "🇬🇧" },
  { value: "paris", label: "Paris", flag: "🇫🇷" },
  { value: "berlin", label: "Berlin", flag: "🇩🇪" },
  { value: "tokyo", label: "Tokyo", flag: "🇯🇵" },
]

export const TIMES = Array.from(
  { length: 24 },
  (_, hour) => `${String(hour).padStart(2, "0")}:00`
)
