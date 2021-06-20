import actions from './actions'
import mutations from './mutations'
import getters from './getters'
const state = {
    username: '',
    password: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    inform: ''
}

const authenticator = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default authenticator;
