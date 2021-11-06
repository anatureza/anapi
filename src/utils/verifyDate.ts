import { add, format, isAfter, isSameDay, isValid, parse } from "date-fns";

interface ICheckBirthDate {
  birth_date: string;
}

type CheckScheduledAtTimestamp = string[];

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

function checkScheduledAtFromAnimalTimestamp(
  scheduledAtString: string,
  dates: CheckScheduledAtTimestamp
) {
  const scheduledAt = new Date(scheduledAtString);

  if (!isValid(scheduledAt)) {
    throw new Error("Invalid Data Input");
  }

  const validDates = dates.filter((date) => {
    if (!isAfter(scheduledAt, new Date(date))) {
      return true;
    }
  });

  if (typeof validDates !== "undefined") {
    if (validDates.length > 0) {
      throw new Error("Invalid Date");
    }
  }

  return format(scheduledAt, "yyyy-MM-dd kk:mm:ss");
}

function checkExpectedAtTimestamp(expectedAt: string) {
  if (!isValid(expectedAt)) {
    throw new Error("Invalid Date");
  }

  const formatExpectedAt = parse(expectedAt, "yyyy-MM-dd kk:mm:ss", new Date());

  return formatExpectedAt;
}

export {
  checkBirthDate,
  checkScheduledAtFromAnimalTimestamp,
  checkExpectedAtTimestamp,
};
