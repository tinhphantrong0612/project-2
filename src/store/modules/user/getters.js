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

export default getters;