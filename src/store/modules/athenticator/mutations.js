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

export default mutations;