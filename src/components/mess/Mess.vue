<template>
    <div class="layout m-0">
        <title>Mess</title>
        <!-- Side bar -->
        <Sidebar />
        <!-- Content -->
        <Content />
        <!-- Modal -->
        <RequestModal />
        <button
            class="d-none"
            ref="modalToggleButton"
            data-bs-toggle="modal"
            data-bs-target="#requestModal"
        ></button>
    </div>
</template>

<script>
import Sidebar from './sidebar/Sidebar.vue'
import Content from './content/Content.vue'
import RequestModal from './modal/RequestModal.vue'
export default {
    name: 'Mess',
    components: {
        Sidebar,
        Content,
        RequestModal
    },
    async beforeCreate() {
        this.$connectSocket()
    },
    async created() {
        let result = await this.$store.dispatch('user/userInitiate')
        if (result == 'FAILED') this.$router.push({ path: '/login' })
        else if (result != 'NO_LAST_CONTACT')
            this.$store.dispatch('conversation/getConversation', {
                Id: result.otherId,
                name: result.otherName,
                status: '',
                type: result.otherType,
                conversationId: result.conversationId,
                userId: localStorage.getItem('token'),
            })

        this.$socket.on('connect', () => {
            this.$socket.emit('init', this.$store.getters['user/userId'])
        })

        this.$socket.on('online', (friendId) => {
            this.onFriendStatus('online', friendId)
            this.$socket.emit('online-too', {
                from: this.$store.getters['user/userId'],
                to: friendId,
            })
        })

        this.$socket.on('online-too', (friendId) => {
            this.onFriendStatus('online', friendId)
        })

        this.$socket.on('offline', (friendId) => {
            this.onFriendStatus('offline', friendId);
            if (this.callee.userId == friendId) {
                this.$emitter.emit('stop');
            }
        })

        this.$emitter.on('toggleModal', (modalType) => {
            this.$store.dispatch('view/showRequestModal', modalType)
            if (modalType != '' && this.$refs.modalToggleButton)
                this.$refs.modalToggleButton.click()
        })
    },
    computed: {
        width() {
            return this.$store.getters['view/witdh']
        },
        callee() {
            return this.$store.getters['view/callee']
        }
    },
    mounted() {
        this.$nextTick(function () {
            window.addEventListener('resize', this.onResize)
        })
    },
    beforeUnmounted() {
        window.removeEventListener('resize', this.onResize)
    },
    watch: {
        $route(to, from) {
            if (to.path !== '/') this.$disconnectSocket()
        },
    },
    methods: {
        onResize() {
            this.$store.dispatch('view/onResize')
        },
        onFriendStatus(status, friendId) {
            this.$store.dispatch('user/setFriendStatus', { status, friendId })
        },
    },
}
</script>

<style scoped>
.layout {
    font-size: 1rem;
    height: calc(var(--vh, 1vh) * 100);
    color: rgba(255, 255, 255, 0.75);
    background-color: #1a2236 !important;
    display: flex;
    max-height: 100%;
}

input[type='search'] {
    appearance: textfield;
    background: inherit;
    box-shadow: none;
    color: rgba(255, 255, 255, 0.75);
    outline-offset: 0px;
    border: #3d4559 1px solid;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

input[type='search']:focus {
    outline: none;
    box-shadow: none;
    border: #3d4559 1px solid;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>