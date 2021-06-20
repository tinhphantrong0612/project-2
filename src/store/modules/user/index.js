import actions from './actions'
import mutations from './mutations'
import getters from './getters'
const state = {
    username: '',
    userId: '',
    friends: [],
    groups: [],
    sentRequests: [],
    receivedRequests: [],
    searchResult: [],
    groupsSearchResult: [],
    created: Date.now()
};

const user = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default user;
