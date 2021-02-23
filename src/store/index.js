import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    task_sel: "",
    tasks: [],
    isscroll: true,
    user: {},
    cols:[],
    option:[],
    murl:'',
    qjinname:'',
    f_address:'',
    lnglatXY:'',
    userid:'', 
    qlrid:'' 
  },
  mutations: {
    setQlrid(state, qlrid) {
      state.qlrid = qlrid
    },
    setUserid(state, userid) {
      state.userid = userid
    },
    setUser(state, user) {
      state.user = user
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setTaskSel(state, task) {
      state.task_sel = task
    },
    setscorll(state,flag) {
      state.isscroll = flag
    },
    setcols(state,cols) {
      state.cols = cols
    },
    setoption(state,option) {
      state.option = option
    },
    setmurl(state,murl) {
     state.murl= murl
    },
    setqjinname(state,qjinname) {
     state.qjinname = qjinname
    },
    setf_address(state,f_address) {
      state.f_address = f_address
    },
    setlnglatXY(state,lnglatXY) {
        state.lnglatXY = lnglatXY
    },

  }
})
export default store;
