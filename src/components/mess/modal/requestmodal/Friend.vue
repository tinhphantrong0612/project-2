<template>
    <div class="friend d-flex">
        <figure class="mt-0 mb-0 figure-container pl-2">
            <img
                :src="'/api/src/assets/avatar/' + friend.username"
                onerror="this.src='/src/assets/avatar/default.png'"
                class="rounded-circle figure-img m-1"
                :class="{
                    online: friend.status == 'online',
                    offline: friend.status != 'online',
                }"
                alt="image"
            />
        </figure>
        <div class="col-10 d-flex ml-2">
            <div class="d-flex m-auto col-8">
                <div>
                    <p class="friend-name text-primary text-left">
                        {{ friend.username }}
                    </p>
                </div>
            </div>
            <div class="d-flex m-auto col-4 justify-content-evenly">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="openConversation()"
                >
                    Open
                </button>
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="unfriend()"
                >
                    Unfriend
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Friend',
    props: ['friend'],
    computed: {
        userId() {
            return this.$store.getters['user/userId']
        },
        username() {
            return this.$store.getters['user/username']
        },
        conversationId() {
            return this.$store.getters['conversation/conversationId']
        }
    },
    methods: {
        async openConversation() {
            if (this.conversationId === this.friend.conversationId) {
                this.$emitter.emit('discardModal');
                return;
            }
            let response = await this.$store.dispatch(
                'conversation/getConversation',
                {
                    conversationId: this.friend.conversationId,
                    name: this.friend.username,
                    Id: this.friend.userId,
                    userId: this.userId,
                    status: this.friend.status,
                    type: 'user',
                }
            )
            if (!response) {
                this.$emitter.emit('toggleModal', 'failed')
            } else {
                this.$socket.emit('seen', {
                    conversationId: this.friend.conversationId,
                    userId: this.$store.getters['user/userId'],
                    username: this.$store.getters['user/username'],
                })
                this.$emitter.emit('discardModal');
            }
        },
        async unfriend() {
            await this.$store.dispatch('user/unfriend', {
                fromId: this.userId,
                from: this.username,
                to: this.friend.username,
                toId: this.friend.userId,
            })
            this.$store.dispatch('user/getFriends')
        },
    },
}
</script>

<style scoped>
.friend {
    height: 60px;
    border: 1px #3d4559 solid;
    margin-top: -1px;
}

.friend .figure-container {
    height: 60px;
}

.friend .figure-container > img {
    height: 50px;
    width: 50px;
    min-width: 50px;
    min-height: 50px;
    object-fit: contain;
}

.friend-name {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 1.5rem;
    color: wheat;
}
</style>