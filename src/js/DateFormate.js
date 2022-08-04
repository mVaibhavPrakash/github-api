export const normalDate = (date) => {
  const newDate = new Date(date).toDateString().split(' ');
  const string = `Joined on ${newDate[1]} ${newDate[2]}, ${newDate[3]}`;
  return string;
};
