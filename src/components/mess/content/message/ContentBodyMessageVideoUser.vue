<template>
    <div class="d-flex message-container user-message justify-content-end">
        <div class="image-message">
            <video controls :title="message.message"
                :src="
                    '/api/img/' +
                    conversationId +
                    '/' +
                    message.fromId +
                    message.sent +
                    message.messageExt
                "
                @play="pauseAllOthers(message.sent)"
                ref="videoMessage"
            />
        </div>
        <figure class="message-avatar mb-0 mt-auto" :title="message.from">
            <img
                :src="'/api/src/assets/avatar/' + message.from"
                onerror="this.src='/src/assets/avatar/default.png'"
                class="rounded-circle"
            />
            <figcaption class="figure-caption">
                <p class="sent">{{ sent }}</p>
            </figcaption>
        </figure>
    </div>
</template>

<script>
export default {
    name: 'ContentBodyMessageVideoUser',
    props: ['message'],
    async mounted() {
        this.$emitter.on('pauseAll', (data) => {
            if (data != this.message.sent) {
                this.$refs.videoMessage.pause();
            }
        })
    },
    computed: {
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
    methods: {
        pauseAllOthers(data) {
            this.$emitter.emit('pauseAll', data);
        }
    }
}
</script>

<style>
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
</style>