import Vuex, { MutationTree, ActionTree } from 'vuex'

export const state = () => {
    user : undefined
}

export const getters = {
    user : (state) => { return state.user },

}

export const mutations = {
    SET_USER(state, user) {
        state.user = user

    }

}

export const actions = {
    login({ commit }, { username }) {
        const authUser = {
            name : username

        }

        commit('SET_USER', authUser)
    },

    logout({ commit }) {
        commit('SET_USER', undefined)
        
    }
    
}