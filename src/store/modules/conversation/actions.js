import axios from 'axios'

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

export default actions;