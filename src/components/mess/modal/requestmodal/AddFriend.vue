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
            <div class="d-flex m-auto col-8">
                <div>
                    <p class="friend-not-in-group-name text-primary text-left">
                        {{ friend.username }}
                    </p>
                </div>
            </div>
            <div class="d-flex m-auto col-3 justify-content-start">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="addToGroup()"
                >
                    <p class="d-sm-block d-none">Add</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-plus d-sm-none d-block"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                        />
                    </svg>
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
button {
    padding: 0.375rem;
}
</style>