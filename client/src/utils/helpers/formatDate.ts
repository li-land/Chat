import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import ruLocate from "date-fns/locale/ru";

export const getFormattedLastDateDistanceToNow = (
  messageDate: string
): string => {
  return formatDistanceToNow(new Date(messageDate), {
    addSuffix: true,
    locale: ruLocate,
  });
};

export const getFormattedLastDate = (messageDate: string): string => {
  if (isYesterday(new Date(messageDate))) {
    return "Вчера";
  }
  return isToday(new Date(messageDate))
    ? format(new Date(messageDate), "H:mm")
    : format(new Date(messageDate), "d.MM.yy");
};
