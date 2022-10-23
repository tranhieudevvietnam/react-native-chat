import Moment from 'moment';
export function convertDateTime({dateTime, typeConvert}) {
  Moment.locale('vi');
  return Moment(dateTime).format(typeConvert);
}
