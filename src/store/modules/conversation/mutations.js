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

export default mutations;