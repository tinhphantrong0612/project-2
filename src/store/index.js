import { createStore } from 'vuex'
import user from './modules/user'
import conversation from './modules/conversation';
import authenticator from './modules/athenticator';
import view from './modules/view'

const store = createStore({
    modules: {
        user: user,
        conversation: conversation,
        auth: authenticator,
        view: view
    }
});

export default store;
