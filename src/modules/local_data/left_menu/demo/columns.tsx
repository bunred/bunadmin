export const demoColumns = [
  { title: "Name", field: "name" },
  { title: "Surname", field: "surname" },
  { title: "Birth Year", field: "birthYear", type: "numeric" },
  {
    title: "Birth Place",
    field: "birthCity",
    lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
  }
]
