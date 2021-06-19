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
            <div class="d-flex m-auto col-8">
                <div>
                    <p class="group-name text-primary text-left">
                        {{ group.groupName }}
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
                    @click="leaveGroup()"
                >
                    Leave
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
</style>