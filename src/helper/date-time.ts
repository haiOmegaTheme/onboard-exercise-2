export const formatDateToYYMMDD = (date?: Date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export const getCurrentMonth = () => new Date().getMonth();
export const getCurrentYear = () => new Date().getFullYear();
