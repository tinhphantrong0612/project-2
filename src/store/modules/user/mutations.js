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

export default mutations;