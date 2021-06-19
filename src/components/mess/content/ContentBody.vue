<template>
    <div class="content-body" :class="{'file': fileType}">
        <div class="messages">
            <ContentBodyMessage
                v-for="(message, index) in messages"
                :key="message.sent"
                :message="message"
                :index="index"
            />
        </div>
        <div id="bottom">
            <div
                v-if="seen.length > 0 && messages.length > 0"
                class="d-flex"
                :class="{
                    'justify-content-end mr-6': userId == lastSenderId,
                    'justify-content-start ml-6': userId != lastSenderId,
                }"
            >
                <p class="pr-2 mb-0">Seen by:</p>
                <div class="d-inline-flex">
                    <img
                        class="seen-img"
                        :title="seen[0].username"
                        :src="'/api/src/assets/avatar/' + seen[0].username"
                        onerror="this.src='/src/assets/avatar/default.png'"
                    />
                    <img
                        v-if="seen.length >= 2"
                        class="seen-img"
                        :title="seen[1].username"
                        :src="'/api/src/assets/avatar/' + seen[1].username"
                        onerror="this.src='/src/assets/avatar/default.png'"
                    />
                    <div v-if="seen.length > 2" class="seen-img">
                        +{{ seen.length - 2 }}
                    </div>
                </div>
            </div>
        </div>
        <a href="#bottom" ref="toBottom"></a>
    </div>
</template>

<script>
import ContentBodyMessage from './ContentBodyMessage.vue'
export default {
    name: 'ContentBody',
    components: {
        ContentBodyMessage,
    },
    computed: {
        messages() {
            return this.$store.getters['conversation/messages']
        },
        seen() {
            return this.$store.getters['conversation/seen']
        },
        userId() {
            return this.$store.getters['user/userId']
        },
        conversationId() {
            return this.$store.getters['conversation/conversationId']
        },
        username() {
            return this.$store.getters['user/username']
        },
        lastSenderId() {
            var messages = this.$store.getters['conversation/messages']
            var lastMessage = messages[messages.length - 1]
            if (lastMessage) return lastMessage.fromId
            else return ''
        },
        fileType() {
            return this.$store.getters['view/fileType']
        }
    },
    async created() {
        this.$nextTick(function () {
            this.$socket.on('seen', (data) => {
                this.$store.dispatch('conversation/updateSeen', data)
            })
            this.$socket.on('message', (data) => {
                if (data.conversationId != this.conversationId) return;
                if (data.messageType == 'text' && this.userId == data.fromId) return;
                this.$store.dispatch('conversation/addMessage', data)
                this.$socket.emit('seen', {
                    userId: this.userId,
                    username: this.username,
                    conversationId: this.conversationId,
                })
            })
            this.$socket.on('groupMemberUpdate', (data) => {
                if (data.conversationId == this.conversationId && data.fromId != this.userId) {
                    this.$store.dispatch(
                        'conversation/addMessage',
                        data.informMessage
                    )
                    this.$store.dispatch(
                        'conversation/updateUsers',
                        data.members
                    )
                    this.$socket.emit('seen', {
                        userId: this.userId,
                        username: this.username,
                        conversationId: this.conversationId,
                    })
                }
            })
            this.$emitter.on('toBottom', (index) => {
                if (index == this.messages.length - 1) {
                    if (this.$refs.toBottom) this.$refs.toBottom.click()
                }
            })
        })
    },
}
</script>

<style scoped>
.content-body {
    height: calc(var(--vh, 1vh) * 100 - 110px);
    border-width: 1px !important;
    border: #3d4559 solid;
    border-bottom: 0px;
    border-left: 0px;
    overflow-x: hidden;
    overflow-y: scroll;
    border-right: 0px;
}

.file {
    height: calc(var(--vh, 1vh) * 100 - 210px);
}

.content-body .messages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.content-body .seen-img {
    border-radius: 50%;
    border: 1px white solid;
    height: 15px;
    width: 15px;
    object-fit: contain;
    margin: auto 0 auto -3px;
    font-size: 0.6rem;
}
</style>