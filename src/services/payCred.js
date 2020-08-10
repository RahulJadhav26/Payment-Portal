import Api from '@/services/Api'

export default {
  pay (credentials) {
    return Api().post('pay', credentials)
  },
  paytmpay (credentials) {
    return Api().post('paytmpay', credentials)
  }
}
