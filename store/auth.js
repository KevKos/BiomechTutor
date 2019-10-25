import { Error } from "mongoose";
  
  export const state = () => ({
    accessToken: '',
    username: '',
    admin: {},
    classes: [],
    hello: 'this is the thing'
  })

  export const mutations = {
    SET_ADMIN: function (state, admin) {
      state.accessToken = admin.token;
      state.admin = admin;
    },
    SET_ADMINID: function (state, admin){
      state.adminId = admin;
    },
    SET_USERNAME: function (state, username){
      state.username = username;
    },
    SET_CLASSES: function (state, classes){
      state.classes = classes;
    },
    RESET_STATE: (state)  =>  {
      Object.assign(state, getDefaultState());
    },
  }

  export const getters = {
    isAuthenticated(state){return state.accessToken;},
    getToken: state => {
      return state.accessToken;
    },
    getAdmin: state  =>  {
      return state.admin;
    },
    getAdminUsername: state  =>  {
      return state.admin.username;
    },
    getAdminId: state  =>  {
      return state.admin._id;
    },
  }

  export const actions = {
    //   login user
    //    - does not need catch block as the error is caught on the other page
    async login ({ commit }, { email, password }) {
      //need to return promise for async
      return this.$axios.post('auth/login',{
        email: email,
        password: password
      })
      .then((res) => {
          if(res.data.error){
            throw new Error(res.data.msg);
          }else{
            // console.log(res.data)
            return res.data
          }
      })
      .then((authUser) => {
        commit('SET_ADMIN', authUser);
        return authUser.confirmed;
      });
    },
    //  universal logout method
    async logout ({ commit }) {
        return this.$axios.post('/logout')
        .then(() => {
          localStorage.clear();
          commit('RESET_STATE'); 
        })
      },

// -----------------------------------------------------------



}
