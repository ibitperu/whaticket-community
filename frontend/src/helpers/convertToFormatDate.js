import { format } from "date-fns";

const convertToFormatDate = (date) => {
  const dateFormated = format(new Date(date), "dd/MM/yy");

  return dateFormated;
};

export default convertToFormatDate;
