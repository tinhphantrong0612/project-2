<template>
    <div class="message-item w-100">
        <ContentBodyMessageTextUser
            v-if="message.fromId === userId && message.messageType === 'text'"
            :message="message"
        />
        <ContentBodyMessageText
            v-if="message.fromId !== userId && message.messageType === 'text'"
            :message="message"
        />
        <ContentBodyMessageImageUser
            v-if="userId === message.fromId && message.messageType == 'image'"
            :message="message"
        />
        <ContentBodyMessageImage
            v-if="userId !== message.fromId && message.messageType == 'image'"
            :message="message"
        />
        <ContentBodyMessageVideoUser
            v-if="userId === message.fromId && message.messageType == 'video'"
            :message="message"
        />
        <ContentBodyMessageVideo
            v-if="userId !== message.fromId && message.messageType == 'video'"
            :message="message"
        />
        <ContentBodyMessageAttachUser
            v-if="userId === message.fromId && message.messageType == 'attachment'"
            :message="message"
        />
        <ContentBodyMessageAttach
            v-if="userId !== message.fromId && message.messageType == 'attachment'"
            :message="message"
        />
        <div
            v-if="message.messageType == 'inform'"
            class="d-block justify-content-center m-auto"
        >
            {{ message.message }}
        </div>
    </div>
</template>

<script>
import ContentBodyMessageTextUser from './message/ContentBodyMessageTextUser.vue'
import ContentBodyMessageText from './message/ContentBodyMessageText.vue'
import ContentBodyMessageImageUser from './message/ContentBodyMessageImageUser.vue'
import ContentBodyMessageImage from './message/ContentBodyMessageImage.vue'
import ContentBodyMessageVideoUser from './message/ContentBodyMessageVideoUser.vue'
import ContentBodyMessageVideo from './message/ContentBodyMessageVideo.vue'
import ContentBodyMessageAttachUser from './message/ContentBodyMessageAttachUser.vue'
import ContentBodyMessageAttach from './message/ContentBodyMessageAttach.vue'
export default {
    name: 'ContentBodyMessage',
    props: ['message', 'index'],
    computed: {
        userId() {
            return this.$store.getters['user/userId']
        },
        sent() {
            var date = new Date(Number(this.message.sent))
            var hour = date.getHours()
            var minute = date.getMinutes()
            var second = date.getSeconds()
            if (hour < 10) hour = '0' + hour
            if (minute < 10) minute = '0' + minute
            if (second < 10) second = '0' + second
            return hour + ':' + minute + ':' + second
        },
        conversationId() {
            return this.$store.getters['conversation/conversationId']
        },
    },
    mounted() {
        this.$emitter.emit('toBottom', this.index)
    },
    components: {
        ContentBodyMessageTextUser,
        ContentBodyMessageText,
        ContentBodyMessageImageUser,
        ContentBodyMessageImage,
        ContentBodyMessageVideoUser,
        ContentBodyMessageVideo,
        ContentBodyMessageAttachUser,
        ContentBodyMessageAttach
    },
}
</script>

<style scoped>
.message-item {
    max-width: 100%;
    text-align: left;
    margin-bottom: 0.5rem;
    display: inline-flex;
    align-items: flex-end;
    margin-top: 1rem;
}

.message-container {
    max-width: 100%;
}

.message-content {
    border-radius: 1rem;
    padding: 0.5rem 0.5rem;
    margin-bottom: 1rem;
    display: block;
    background: #293145;
    word-wrap: break-word;
    max-width: 76%;
}

.user-message {
    margin-left: auto;
}

.image-message {
    max-height: 200px;
    max-width: 200px;
}

.user-message .message-content {
    background-color: #0a80ff;
}

.message-avatar {
    margin: 0 0.5rem 0 1rem;
    text-align: center;
}

.user-message .message-avatar {
    margin: 0 1rem 0 0.5rem;
}

.username {
    margin-bottom: 0;
}

.sent {
    font-style: italic;
    font-size: 12px;
    color: #3d4559;
    margin-bottom: 0;
}

.message-avatar > img {
    margin: auto;
    width: 40px;
    height: 40px;
    object-fit: contain;
    border: 1px white solid;
}

a[href='#bottom'] {
    display: none;
}
</style>