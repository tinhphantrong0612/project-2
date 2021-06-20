import axios from 'axios'

const actions = {
    async getUserInfo({ commit }) {
        commit("view/UPDATE_LOADING", true, { root: true });
        let response = await axios.get('/api/user/userInfo');
        commit("view/UPDATE_LOADING", false, { root: true });
        if (!response.data.success) {
            localStorage.removeItem('token');
            commit("CLEAR_STATE");
            return "FAILED";
        } else {
            commit("UPDATE_USERID", response.data.user._id);
            commit("UPDATE_USERNAME", response.data.user.username);
            commit("UPDATE_FRIENDS", response.data.user.friends);
            commit("UPDATE_GROUPS", response.data.user.groups);
            commit("UPDATE_SENTREQUESTS", response.data.user.sentRequests);
            commit("UPDATE_RECEIVEDREQUESTS", response.data.user.receivedRequests);
            commit("UPDATE_CREATED", response.data.user.created);
            if (!response.data.user.lastContact.contactId) {
                return "NO_LAST_CONTACT";
            } else {
                return {
                    otherId: response.data.user.lastContact.contactId,
                    otherName: response.data.user.lastContact.contactName,
                    otherType: response.data.user.lastContact.contactType,
                    conversationId: response.data.user.lastContact.conversationId
                };
            }
        }
    },
    async search({ commit, getters }, searchName) {
        commit("view/UPDATE_LOADING", true, { root: true });
        commit('view/UPDATE_SEARCHING', true, { root: true });
        if (!searchName) {
            commit('UPDATE_SEARCHRESULT', []);
            commit('UPDATE_GROUPSSEARCHRESULT', []);
            commit("view/UPDATE_LOADING", false, { root: true });
            commit('view/UPDATE_SEARCHING', false, { root: true });
        } else {
            let response = await axios.get('/api/user/search/' + searchName);
            commit("view/UPDATE_LOADING", false, { root: true });
            if (!response.data.success) {
                commit('UPDATE_SEARCHRESULT', []);
            } else {
                commit('UPDATE_SEARCHRESULT', response.data.result);
                var groupsSearchResult = getters['groups'].filter((group) => {
                    return group.groupName.includes(searchName);
                })
                commit('UPDATE_GROUPSSEARCHRESULT', groupsSearchResult);
            }
        }
    },
    async sendFriendRequest({ commit }, payload) {
        commit('view/UPDATE_LOADING', true, { root: true });
        let response = await axios.post('/api/friend/send', payload);
        commit('view/UPDATE_LOADING', false, { root: true });
        if (!response.data.success) {
            return false;
        } else {
            return true;
        }
    },
    async cancelFriendRequest({ commit }, payload) {
        commit("view/UPDATE_LOADING", true, { root: true });
        let response = await axios.post('/api/friend/cancel', payload);
        commit('view/UPDATE_LOADING', false, { root: true });
        if (!response.data.success) {
            return false;
        } else {
            return true;
        }
    },
    async acceptFriendRequest({ commit }, payload) {
        commit("view/UPDATE_LOADING", true, { root: true });
        let response = await axios.post('/api/friend/accept', payload);
        commit('view/UPDATE_LOADING', false, { root: true });
        if (!response.data.success) {
            return false;
        } else {
            return true;
        }
    },
    async rejectFriendRequest({ commit }, payload) {
        commit("view/UPDATE_LOADING", true, { root: true });
        let response = await axios.post('/api/friend/reject', payload);
        commit('view/UPDATE_LOADING', false, { root: true });
        if (!response.data.success) {
            return false;
        } else {
            return true;
        }
    },
    async unfriend({ commit, rootGetters }, payload) {
        commit("view/UPDATE_LOADING", true, { root: true });
        let response = await axios.post('/api/friend/unfriend', payload);
        commit("view/UPDATE_LOADING", false, { root: true });
        if (!response.data.success) {
            return;
        } else {
            if (payload.conversationId == rootGetters['conversation/conversationId']) commit('conversation/CLEAR_STATE', null, { root: true });
            return;
        }
    },
    beingUnfriend({ commit }) {
        commit('conversation/CLEAR_STATE', null, { root: true });
    },
    async getFriends({ commit, getters }) {
        let response = await axios.post('/api/friend/getFriends', { fromId: getters['userId'] });
        if (!response.data.success) {
            return;
        } else {
            commit("UPDATE_FRIENDS", response.data.friends);
        }
    },
    async updateRequests({ commit }, payload) {
        let response = await axios.post('/api/friend/friendRequests', { fromId: payload });
        if (!response.data.success) {
            return;
        } else {
            commit("UPDATE_SENTREQUESTS", response.data.data.sentRequests);
            commit("UPDATE_RECEIVEDREQUESTS", response.data.data.receivedRequests);
        }
    },
    async createGroup({ commit }, payload) {
        commit("view/UPDATE_LOADING", true, { root: true });
        let response = await axios.post('/api/group/create', payload);
        commit('view/UPDATE_LOADING', false, { root: true });
        if (!response.data.success) {
            return false;
        } else {
            return true;
        }
    },
    async leaveGroup({ commit, rootGetters }, payload) {
        commit("view/UPDATE_LOADING", true, { root: true });
        let response = await axios.post('/api/group/leave', payload);
        commit("view/UPDATE_LOADING", false, { root: true });
        if (!response.data.success) {
            return false;
        } else {
            if (payload.conversationId == rootGetters['conversation/conversationId']) commit('conversation/CLEAR_STATE', null, { root: true });
            return true;
        }
    },
    async addToGroup({ commit }, payload) {
        commit("view/UPDATE_LOADING", true, { root: true });
        let response = await axios.post('/api/group/add', payload);
        commit('view/UPDATE_LOADING', false, { root: true });
        if (!response.data.success) {
            return false;
        } else {
            commit('conversation/UPDATE_USERS', response.data.conversation.users, { root: true });
            commit('conversation/UPDATE_SEEN', response.data.conversation.seen, { root: true });
            return true;
        }
    },
    async getGroups({ commit }, payload) {
        let response = await axios.post('/api/group/getGroups', payload);
        if (!response.data.success) {
            return false;
        } else {
            commit("UPDATE_GROUPS", response.data.groups);
        }
    },
    setFriendStatus({ commit }, payload) {
        commit("UPDATE_FRIENDSTATUS", payload);
    },
};

export default actions;