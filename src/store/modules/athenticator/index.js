import axios from 'axios'

const state = {
    username: '',
    password: '',
    email: '',
    gender: '',
    dateOfBirth: Date.now().toString(),
    inform: ''
}

const actions = {
    updateAuthenticator({ commit }, payload) {
        commit('UPDATE_USERNAME', payload.username);
        commit('UPDATE_PASSWORD', payload.password);
        commit('UPDATE_EMAIL', payload.email);
        commit('UPDATE_GENDER', payload.gender);
        commit('UPDATE_DATEOFBIRTH', payload.dateOfBirth);
    },
    async login({ commit }, loginData) { // Empty username or password
        if (!loginData.username || !loginData.password) {
            commit("UPDATE_INFORM", "Enter both username and password!");
            return false;
        }
        let response = await axios.post('/api/auth/login', loginData);
        if (!response.data.success) { // Failed
            commit("UPDATE_INFORM", response.data.error);
            return false;
        } else { // If success, update userId and localstorage
            commit("user/UPDATE_USERID", response.data.userId, { root: true });
            localStorage.setItem('token', response.data.userId);
            commit('CLEAR_STATE');
            commit('user/CLEAR_STATE', null, {root: true});
            return true;
        }
    },
    async register({ commit }, registerData) {
        if (!registerData.username || !registerData.password || !registerData.dateOfBirth || !registerData.gender || !registerData.email) {
            commit("UPDATE_INFORM", "Please fill the form!");
            return false;
        }
        let response = await axios.post('/api/auth/register', registerData);
        if (!response.data.success) {
            commit("UPDATE_INFORM", response.data.error);
            return false;
        } else {
            commit("UPDATE_INFORM", "Register successfully!");
            return true;
        }
    },
    async logout({ commit }) {
        commit("view/UPDATE_LOADING", true, {root: true});
        let response = await axios.post('/api/auth/logout'); // Send logout request
        localStorage.removeItem('token'); // Remove token
        commit("user/CLEAR_STATE", null, { root: true }); // Clear user data
        commit("conversation/CLEAR_STATE", null, { root: true }); // Clear conversation data
        commit("view/UPDATE_LOADING", false, {root: true});
        return response;
    },
    clearInform({ commit }) {
        commit('UPDATE_INFORM');
    }
}

const mutations = {
    UPDATE_USERNAME(state, payload) {
        state.username = payload;
    },
    UPDATE_PASSWORD(state, payload) {
        state.password = payload;
    },
    UPDATE_EMAIL(state, payload) {
        state.email = payload;
    },
    UPDATE_GENDER(state, payload) {
        state.gender = payload;
    },
    UPDATE_DATEOFBIRTH(state, payload) {
        state.dateOfBirth = payload;
    },
    UPDATE_INFORM(state, payload) {
        state.inform = payload;
    },
    CLEAR_STATE(state) {
        state.username = '';
        state.password = '';
        state.email = '';
        state.gender = '';
        state.dateOfBirth = '';
        state.inform = '';
    }
};
const getters = {
    username: state => state.username,
    password: state => state.password,
    email: state => state.email,
    dateOfBirth: state => state.dateOfBirth,
    gender: state => state.gender,
    inform: state => state.inform
}

const authenticator = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default authenticator;
