<template>
    <div class="group d-flex">
        <figure class="mt-0 mb-0 figure-container pl-2">
            <img
                :src="'/api/src/assets/avatar/' + group.groupName"
                onerror="this.src='/src/assets/avatar/default.png'"
                class="rounded-circle figure-img m-1"
                alt="image"
            />
        </figure>
        <div class="col-10 d-flex ml-2">
            <div class="d-flex m-auto col-8 col-sm-8">
                <div>
                    <p class="group-name text-primary text-left">
                        {{ group.groupName }}
                    </p>
                </div>
            </div>
            <div class="d-flex m-auto col-4 col-sm-4 justify-content-start">
                <button
                    type="button"
                    class="btn btn-primary mr-1"
                    @click="openConversation()"
                >
                    <p class="d-none d-sm-block m-0">Open</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-box-arrow-in-right d-sm-none"
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
                    @click="leaveGroup()"
                >
                    <p class="d-none d-sm-block m-0">Leave</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-box-arrow-right d-sm-none"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Group',
    props: ['group'],
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
        async leaveGroup() {
            await this.$store.dispatch('user/leaveGroup', {
                fromId: this.userId,
                from: this.username,
                conversationId: this.group.conversationId,
            })
            this.$store.dispatch('user/getGroups', { fromId: this.userId })
        },
        async openConversation() {
            if (this.conversationId == this.group.conversationId) {
                this.$emitter.emit('discardModal')
                return
            }
            let response = await this.$store.dispatch(
                'conversation/getConversation',
                {
                    name: this.group.groupName,
                    conversationId: this.group.conversationId,
                    Id: this.group.conversationId,
                    type: 'group',
                    userId: this.userId,
                }
            )
            if (!response) {
                this.$emitter.emit('toggleModal', 'failed')
            } else {
                this.$socket.emit('seen', {
                    conversationId: this.group.conversationId,
                    userId: this.$store.getters['user/userId'],
                    username: this.$store.getters['user/username'],
                })
                this.$emitter.emit('discardModal')
            }
        },
    },
}
</script>

<style scoped>
.group {
    height: 60px;
    border: 1px #3d4559 solid;
    margin-top: -1px;
}

.group .figure-container {
    height: 60px;
}

.group .figure-container > img {
    height: 50px;
    width: 50px;
    min-width: 50px;
    min-height: 50px;
    object-fit: contain;
}

.group-name {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 1.5rem;
    color: wheat;
}
button {
    padding: 0.375rem;
}
</style>