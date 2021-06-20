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
        RequestModal,
    },
    async beforeCreate() {
        this.$connectSocket()
    },
    async created() {
        let result = await this.$store.dispatch('user/getUserInfo')
        if (result == 'FAILED') {
            localStorage.removeItem('token')
            this.$router.push({ path: '/login' })
        } else if (result != 'NO_LAST_CONTACT') {
            await this.getConversation(result)
            this.$socket.emit('seen', {
                conversationId: result.conversationId,
                userId: this.userId,
                username: this.username
            })
        }

        this.$socket.on('connect', () => {
            this.$socket.emit('init', this.userId)
        })

        this.$socket.on('online', (friendId) => {
            this.onFriendStatus('online', friendId)
            this.$socket.emit('online-too', {
                from: this.userId,
                to: friendId,
            })
        })

        this.$socket.on('online-too', (friendId) => {
            this.onFriendStatus('online', friendId)
        })

        this.$socket.on('offline', (friendId) => {
            this.onFriendStatus('offline', friendId)
            if (this.callee.userId == friendId) {
                this.$emitter.emit('stop')
            }
        })

        this.$emitter.on('toggleModal', this.onToggleModal)
    },
    computed: {
        userId() {
            return this.$store.getters['user/userId']
        },
        username() {
            return this.$store.getters['user/username']
        },
        width() {
            return this.$store.getters['view/witdh']
        },
        callee() {
            return this.$store.getters['view/callee']
        },
    },
    mounted() {
        this.onResize();
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
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`)
        },
        onFriendStatus(status, friendId) {
            this.$store.dispatch('user/setFriendStatus', { status, friendId })
        },
        onToggleModal(modalType) {
            this.$store.dispatch('view/showRequestModal', modalType)
            if (modalType != '' && this.$refs.modalToggleButton)
                this.$refs.modalToggleButton.click()
        },
        getConversation(result) {
            this.$store.dispatch('conversation/getConversation', {
                Id: result.otherId,
                name: result.otherName,
                status: '',
                type: result.otherType,
                conversationId: result.conversationId,
                userId: this.userId,
            })
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