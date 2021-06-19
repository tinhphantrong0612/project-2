<template>
    <div class="friend-not-in-group d-flex">
        <figure class="mt-0 mb-0 figure-container">
            <img
                :src="'/api/src/assets/avatar/' + user.username"
                onerror="this.src='/src/assets/avatar/default.png'"
                class="rounded-circle figure-img m-1"
                alt="image"
            />
        </figure>
        <div class="col-10 d-flex ml-0 ml-sm-2">
            <div class="d-flex ml-0 ml-sm-auto mt-auto mb-auto col-7 col-sm-8">
                <div>
                    <p class="friend-not-in-group-name text-primary text-left">
                        {{ user.username }}
                    </p>
                </div>
            </div>
            <div class="d-flex mr-0 ml-0 mt-auto mb-auto ml-sm-auto mr-sm-auto justify-content-evenly">
                <button
                    type="button"
                    class="
                        btn btn-primary mr-1 mr-sm-1 ml-sm-auto
                        d-block d-sm-block
                        align-content-center
                    "
                    @click="acceptFriendRequest()"
                >
                    <p class="m-0 p-0 d-none d-sm-block">Accept</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-check-lg d-flex m-auto d-sm-none"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    class="btn btn-danger m-auto d-block d-sm-flex"
                    @click="rejectFriendRequest()"
                >
                    <p class="m-0 p-0 d-none d-sm-block">Reject</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x-lg d-flex m-auto d-sm-none"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RequestListReceived',
    props: ['user'],
    computed: {
        userId() {
            return this.$store.getters['user/userId']
        },
        username() {
            return this.$store.getters['user/username']
        },
    },
    methods: {
        async acceptFriendRequest() {
            let response = await this.$store.dispatch(
                'user/acceptFriendRequest',
                {
                    fromId: this.userId,
                    from: this.username,
                    toId: this.user.userId,
                    to: this.user.username,
                }
            )

            if (response)
                this.$store.dispatch('view/showRequestModal', 'success')
            else this.$store.dispatch('view/showRequestModal', 'failed')
        },
        async rejectFriendRequest() {
            let response = await this.$store.dispatch(
                'user/rejectFriendRequest',
                {
                    fromId: this.userId,
                    from: this.username,
                    toId: this.user.userId,
                    to: this.user.username,
                }
            )
            if (response)
                this.$store.dispatch('view/showRequestModal', 'success')
            else this.$store.dispatch('view/showRequestModal', 'failed')
        },
    },
}
</script>

<style scoped>
.friend-not-in-group {
    height: 60px;
    border: 1px #3d4559 solid;
    margin-top: -1px;
    background-color: #282a31;
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