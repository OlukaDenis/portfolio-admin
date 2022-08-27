import moment from 'moment';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'KES',
  minimumFractionDigits: 0,
});

const currencyFormatter = (currency) => formatter.format(Math.round(currency));

const formatLongDate = (date) => moment(date).format('DD, MMMM YYYY');

const getDateDiff = (startDate, endDate) => {
  const diffInMs = new Date(endDate) - new Date(startDate);
  return (diffInMs / (1000 * 60 * 60 * 24));
};

const isDateOverdue = (timestamp) => {
  const todayMoment = moment(new Date());
  const today = todayMoment.format('YYYY-MM-DD');

  const currentTime = new Date(today).getTime();
  const dueTime = new Date(correctDate(timestamp)).getTime();

  return currentTime > dueTime;
};

const correctDate = (timestamp) => {
  if (timestamp !== undefined) {
    const splitted = timestamp.toString().split('-');

    if (splitted[1] && splitted[1].length === 1) {
      splitted[1] = `0${splitted[1]}`;
    }

    if (splitted[2] && splitted[2].length === 1) {
      splitted[2] = `0${splitted[2]}`;
    }

    return splitted.join('-');
  }
  return timestamp;
};

export {
  currencyFormatter, formatLongDate, getDateDiff, isDateOverdue,
};
