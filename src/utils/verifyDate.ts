import { add, format, isAfter, isSameDay, isValid } from "date-fns";

interface ICheckBirthDate {
  birth_date: string;
}

function checkBirthDate({ birth_date }: ICheckBirthDate) {
  const birthDate = add(new Date(birth_date), { days: 1 });

  if (!isValid(birthDate)) {
    throw new Error("Invalid Data Input");
  }

  if (isSameDay(birthDate, Date.now()) || isAfter(birthDate, Date.now())) {
    throw new Error("Invalid Date");
  }

  const formatBirthDate = format(birthDate, "yyyy-MM-dd");

  return formatBirthDate;
}

export { checkBirthDate };
