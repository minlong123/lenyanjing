//demo中的数据是模拟状态数据，用于测试，实际使用中，请根据您自己的业务编写
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    pageTitle: "提交审批",
    flowName: "",
    flowData: {},
    weekUserList: [], //周报人员考勤信息
    weekUser: "", //周报人员
  },
  mutations: {
    setPageTitle(state, pageTitle) {
      state.pageTitle = pageTitle
    },
    setFlowName(state, name) {
      state.flowName = name
    },
    setWeekUserList(state, arr) {
      state.weekUserList = arr
    },
    setFlowData(state, obj) {
      state.flowData = obj
    },
    setWeekUser(state, obj) {
      state.weekUser = obj
    },
  },
  actions: {},
  getters: {
    pageTitle(state, getters) {
      return state.pageTitle
    },
    weekUserList(state, getters) {
      return state.weekUserList
    },
    weekUser(state, getters) {
      return state.weekUser
    },
    flowName(state, getters) {
      return state.flowName
    },
    flowData(state, getters) {
      return state.flowData
    },
  },
})
export default store
