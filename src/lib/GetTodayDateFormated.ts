
export function GetTodayDateFormated() {

  const today = new Date();

  const DayNum = today.getDay();
  const DayTypes = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

  return DayTypes[DayNum] + ` - ${
    (today.getDate()).toString().padStart(2, "0")}/${
    (today.getMonth() + 1).toString().padStart(2, "0")}/${
    (today.getFullYear())}`
}