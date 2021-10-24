import { add, format, isAfter, isSameDay, isValid } from "date-fns";

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

  const newDates = dates.filter((date) => {
    if (!isAfter(scheduledAt, new Date(date))) {
      return true;
    }
  });

  if (newDates.length > 0) {
    if (typeof newDates !== "undefined") {
      throw new Error("Invalid Date");
    }
  }

  return format(scheduledAt, "yyyy-MM-dd kk:mm:ss");
}

export { checkBirthDate, checkScheduledAtFromAnimalTimestamp };
