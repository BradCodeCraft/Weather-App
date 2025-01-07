function convertWeekday(index) {
  const today = new Date();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekdays[(today.getDay() + index) % 7];
}

export { convertWeekday };
