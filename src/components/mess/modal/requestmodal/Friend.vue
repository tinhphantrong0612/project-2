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
            <div class="d-flex m-auto col-4 justify-content-start">
                <button
                    type="button"
                    class="btn btn-primary mr-1"
                    @click="openConversation()"
                >
                    <p class="d-sm-flex m-0 d-none">Open</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-box-arrow-in-right d-sm-none d-flex"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="unfriend()"
                >
                    <p class="d-sm-flex m-0 d-none">Unfriend</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-x-fill d-sm-none d-flex"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                        />
                    </svg>
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
        },
    },
    methods: {
        async openConversation() {
            if (this.conversationId === this.friend.conversationId) {
                this.$emitter.emit('discardModal')
                return
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
                    userId: this.userId,
                    username: this.username
                })
            }
        },
        async unfriend() {
            await this.$store.dispatch('user/unfriend', {
                fromId: this.userId,
                from: this.username,
                to: this.friend.username,
                toId: this.friend.userId,
                conversationId: this.friend.conversationId
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
button {
    padding: 0.375rem;
}
</style>