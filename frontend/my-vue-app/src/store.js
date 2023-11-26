import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      timetableData: null,
      isLoggedIn:false,
      currentcomponent:'kebiao',
    };
  },
  mutations: {
    setTimetableData(state, data) {
      state.timetableData = data;
      //存储到localstorage里面2023-11-22
    localStorage.setItem('timetableData',JSON.stringify(data));
    },
    //改变登录状态
    setLoggedIn(state,status){
        state.isLoggedIn= status;
    },
  
    //导航按钮
    changecomponent(state,component){
      state.currentcomponent=component;
    }
  },
  actions: {
    //changenavbar
    changenavbar({commit},component){
      commit('changecomponent',component)
    },
    //
    fetchTimetableData({ commit }, { gradeNumber, classNumber }) {
      fetch(`/api/getData?gradeNumber=${gradeNumber}&classNumber=${classNumber}`)
        .then(response => response.json())
        .then(data => {
          commit('setTimetableData', data);
        })
        .catch(error => {
          console.error('error', error);
        });
    },
    //登录逻辑
    login({commit},{ gradeNumber,classNumber}){
        if (gradeNumber >= 1 && gradeNumber <= 3 && classNumber >= 1 && classNumber <= 14) {
            commit('setLoggedIn', true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('gradeNumber', gradeNumber);
            localStorage.setItem('classNumber', classNumber);
          } else {
            console.error('登录条件不满足');
            // 处理不符合条件的情况
          }
    },
    checkLoggedIn({ commit, dispatch }) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        commit('setLoggedIn', isLoggedIn);
      
        if (isLoggedIn) {
          const gradeNumber = localStorage.getItem('gradeNumber');
          const classNumber = localStorage.getItem('classNumber');
          if (gradeNumber && classNumber) {
            dispatch('fetchTimetableData', {
              gradeNumber: parseInt(gradeNumber),
              classNumber: parseInt(classNumber)
            });
          }
        }
      },
    //登出
    outLoggedIn({commit}){
        commit('setLoggedIn',false)
    localStorage.removeItem('isLoggedIn');
    // 清理时间表结构
    localStorage.removeItem('timetableData');
    }
  }
});