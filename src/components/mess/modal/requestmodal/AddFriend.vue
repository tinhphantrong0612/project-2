<template>
    <div class="friend-not-in-group d-flex">
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
            <div class="d-flex m-auto col-10">
                <div>
                    <p class="friend-not-in-group-name text-primary text-left">
                        {{ friend.username }}
                    </p>
                </div>
            </div>
            <div class="d-flex m-auto col-2 justify-content-evenly">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="addToGroup()"
                >
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddFriend',
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
        groupName() {
            return this.$store.getters['conversation/otherName']
        },
    },
    methods: {
        async addToGroup() {
            let response = await this.$store.dispatch('user/addToGroup', {
                fromId: this.userId,
                from: this.username,
                toId: this.friend.userId,
                to: this.friend.username,
                groupName: this.groupName,
                conversationId: this.conversationId,
            })
            if (!response) {
                this.$emitter.emit('toggleButton', 'failed')
            }
        },
    },
}
</script>

<style scoped>
.friend-not-in-group {
    height: 60px;
    border: 1px #3d4559 solid;
    margin-top: -1px;
}

.friend-not-in-group .figure-container {
    height: 60px;
}

.friend-not-in-group .figure-container > img {
    height: 50px;
    width: 50px;
    min-width: 50px;
    min-height: 50px;
    object-fit: contain;
}

.friend-not-in-group-name {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 1.5rem;
    color: wheat;
}

.online {
    border: 2px green solid;
}

.offline {
    border: 2px gray solid;
}
</style>