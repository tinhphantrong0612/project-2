import axios from 'axios'

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
const actions = {
    async userInitiate({ commit }) {
        let response = await axios.get('/api/user/userInfo');
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
            if (!response.data.success) {
                commit('UPDATE_SEARCHRESULT', []);
            } else {
                commit('UPDATE_SEARCHRESULT', response.data.result);
                var groupsSearchResult = getters['groups'].filter((group) => {
                    return group.groupName.includes(searchName);
                })
                commit('UPDATE_GROUPSSEARCHRESULT', groupsSearchResult);
            }
            commit("view/UPDATE_LOADING", false, { root: true });
        }
    },
    updateGroupsSearchResult({ commit }, payload) {
        commit("UPDATE_GROUPSSEARCHRESULT", payload);
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
    setFriendStatus({ commit }, payload) {
        commit("UPDATE_FRIENDSTATUS", payload);
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
            commit('conversation/UPDATE_MESSAGES', response.data.conversation.messages, { root: true });
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
    }
};
const mutations = {
    UPDATE_USERID(state, payload) {
        state.userId = payload;
    },
    UPDATE_USERNAME(state, payload) {
        state.username = payload;
    },
    UPDATE_FRIENDS(state, payload) {
        state.friends = payload;
        state.friends.forEach(friend => {
            friend.status = 'offline'
        })
    },
    UPDATE_GROUPS(state, payload) {
        state.groups = payload;
    },
    UPDATE_SENTREQUESTS(state, payload) {
        state.sentRequests = payload;
    },
    UPDATE_RECEIVEDREQUESTS(state, payload) {
        state.receivedRequests = payload;
    },
    UPDATE_CREATED(state, payload) {
        state.created = payload;
    },
    UPDATE_SEARCHRESULT(state, payload) {
        state.searchResult = payload;
    },
    UPDATE_GROUPSSEARCHRESULT(state, payload) {
        state.groupsSearchResult = payload;
    },
    UPDATE_FRIENDSTATUS(state, payload) {
        var onlineFriend = state.friends.findIndex((friend) => friend.userId == payload.friendId);
        if (onlineFriend != -1) {
            state.friends[onlineFriend].status = payload.status;
        }
    },
    CLEAR_STATE(state) {
        state.username = '';
        state.userId = '';
        state.friends = [];
        state.groups = [];
        state.sentRequests = [];
        state.receivedRequests = [];
        state.created = '';
        state.searchResult = [];
    }
};
const getters = {
    username: (state) => state.username,
    userId: (state) => state.userId,
    friends: (state) => state.friends,
    searchResult: (state) => state.searchResult,
    groups: (state) => state.groups,
    groupsSearchResult: (state) => state.groupsSearchResult,
    sentRequests: (state) => state.sentRequests,
    receivedRequests: (state) => state.receivedRequests
};

const user = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default user;
