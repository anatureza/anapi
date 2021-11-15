import {
  add,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isValid,
  parse,
} from "date-fns";

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

function checkExpectedAtTimestamp(expectedAt: string) {
  if (!isValid(expectedAt)) {
    throw new Error("Invalid Date");
  }

  const formatExpectedAt = parse(expectedAt, "yyyy-MM-dd HH:mm:ss", new Date());

  return formatExpectedAt;
}

export { checkBirthDate, checkExpectedAtTimestamp };
