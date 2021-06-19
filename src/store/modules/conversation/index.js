import axios from 'axios'

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
const actions = {
    async getConversation({ commit }, payload) {
        if (!payload) {
            commit('view/UPDATE_SELECTEDUSERNAME', '', { root: true });
            commit('view/UPDATE_SELECTEDUSERID', '', { root: true });
            return false;
        }
        commit('view/UPDATE_LOADING', true, { root: true });
        let response = await axios.post('/api/messages', {
            userId: payload.userId,
            conversationId: payload.conversationId
        });
        commit('view/UPDATE_LOADING', false, { root: true });
        if (!response.data.success) {
            commit('CLEAR_STATE');
            commit('view/UPDATE_SELECTEDUSERNAME', '', { root: true });
            commit('view/UPDATE_SELECTEDUSERID', '', { root: true });
            return false;
        } else {
            commit('UPDATE_OTHERID', payload.Id);
            commit('UPDATE_OTHERNAME', payload.name);
            commit('UPDATE_OTHERSTATUS', payload.status);
            commit('UPDATE_OTHERTYPE', payload.type);
            commit('UPDATE_CONVERSATIONID', payload.conversationId);
            commit('UPDATE_USERS', response.data.conversationData.users);
            commit('UPDATE_MESSAGES', response.data.conversationData.messages);
            commit('UPDATE_SEEN', response.data.conversationData.seen);
            return true;
        }
    },
    updateUsers({commit}, payload) {
        commit("UPDATE_USERS", payload);
    },
    updateSeen({ commit }, payload) {
        commit("UPDATE_SEEN", payload);
    },
    addMessage({ commit }, payload) {
        commit("PUSH_MESSAGES", payload)
    }
};
const mutations = {
    UPDATE_OTHERID(state, payload) {
        state.otherId = payload
    },
    UPDATE_OTHERNAME(state, payload) {
        state.otherName = payload;
    },
    UPDATE_OTHERSTATUS(state, payload) {
        state.otherStatus = payload;
    },
    UPDATE_OTHERTYPE(state, payload) {
        state.otherType = payload;
    },
    UPDATE_CONVERSATIONID(state, payload) {
        state.conversationId = payload;
    },
    UPDATE_USERS(state, payload) {
        state.users = payload;
    },
    UPDATE_MESSAGES(state, payload) {
        state.messages = payload;
    },
    PUSH_MESSAGES(state, payload) {
        state.messages.push(payload);
    },
    UPDATE_SEEN(state, payload) {
        state.seen = payload;
    },
    UPDATE_CONVERSATION(state, payload) {
        state.otherId = payload.otherId;
        state.otherName = payload.otherName;
        state.otherStatus = payload.otherStatus;
        state.otherType = payload.otherStatus;
        state.conversationId = payload.conversationId;
        state.users = payload.users;
        state.messages = payload.messages;
        state.seen = payload.seen;
    },
    CLEAR_STATE(state) {
        state.otherId = '';
        state.otherName = '';
        state.otherStatus = '';
        state.otherType = '';
        state.conversationId = '';
        state.users = [];
        state.messages = [];
        state.seen = [];
    }
};
const getters = {
    otherId: (state) => state.otherId,
    otherName: (state) => state.otherName,
    otherStatus: (state) => state.otherStatus,
    otherType: (state) => state.otherType,
    conversationId: (state) => state.conversationId,
    users: (state) => state.users,
    messages: (state) => state.messages,
    seen: (state) => state.seen
};

const conversation = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default conversation;
