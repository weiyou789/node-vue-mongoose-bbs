/**
 * Created by root on 2017/7/27.
 */
import moment from 'moment'

export const formatDate = (value,type) => {
  let format = ''
  switch (type) {
    case 'day': format = 'YYYY-MM-DD'
      break
    case 'second': format = 'YYYY-MM-DD HH:MM:SS'
      break
    default : format = type
      break
  }
  return moment(value).format(format)

}
export const fromNow = (value) => {
  return moment(value).fromNow();
}
