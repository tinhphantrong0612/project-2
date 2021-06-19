<template>
    <div class="d-flex justify-content-start message-container">
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
        <div class="message-content">
            {{ message.message }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentBodyMessageText',
    props: ['message'],
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
        }
    },
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

.message-avatar {
    margin: 0 0.5rem 0 1rem;
    text-align: center;
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