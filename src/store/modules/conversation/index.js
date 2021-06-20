import actions from './actions'
import mutations from './mutations'
import getters from './getters'
const state = {
    otherId: '',
    otherName: '',
    otherStatus: '',
    otherType: '',
    conversationId: '',
    users: [],
    messages: [],
    seen: []
};

const conversation = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default conversation;
