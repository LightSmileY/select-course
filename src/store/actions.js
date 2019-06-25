import {OPENID, MYWXINFO, MYCOSINFO} from './mutation-type'
// import listData from '../datas/list-data'

export default {
  getOpenId({commit}, data){
    commit(OPENID, data)
  },
  getMyWxInfo({commit}, data){
    commit(MYWXINFO, data)
  },
  getMyCosInfo({commit}, data){
    commit(MYCOSINFO, data)
  },
}