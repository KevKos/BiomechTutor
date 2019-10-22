export const state = () => ({
    adminClasses: [],
  })

export const getters = {
    adminClasses(state) {
        return state.adminClasses;
    },
}

export const mutations = {
    SET_ADMIN_CLASSES: function (classes) {
        state.adminClasses = classes
    }
}

export const actions = {
    async getAdminClasses( {commit}, {username}){
        this.$axios.get('/classes/admin', {
            params: {username: username}
        })
        .then((res) => {
            if (res.status === 401) {
                throw new Error('Unable to find classes')
            } else {
                return res.data
            }
        })
        .then((classes) => {
            commit('SET_ADMIN_CLASSES', classes)
            return classes;
        }).catch((e)=>{
            console.log('Error has occured:'.concat(e));
        })
    }
}