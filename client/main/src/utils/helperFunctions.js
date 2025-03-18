import { format, formatDistanceToNow, isToday, isThisMonth, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

const addCommas = (value) => {
  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};


const formatDate = (dateString) => {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return 'Hoje';
  } else if (isThisMonth(date)) {
    return formatDistanceToNow(date, { addSuffix: true, locale: pt });
  } else {
    return format(date, 'dd-MM-yyyy', { locale: pt });
  }
}

export { isNumber, addCommas, formatDate };