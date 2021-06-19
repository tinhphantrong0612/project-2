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
            <div class="d-flex mt-auto mb-auto ml-sm-auto col-9">
                <div>
                    <p class="friend-not-in-group-name text-primary text-left">
                        {{ user.username }}
                    </p>
                </div>
            </div>
            <div class="d-flex ml-0 mr-0 ml-sm-auto mr-sm-auto mt-auto mb-auto justify-content-evenly">
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="cancelFriendRequest()"
                >
                    <p class="m-0 p-0 d-none d-sm-block">Cancel</p>
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
    name: 'RequestListSent',
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
        async cancelFriendRequest() {
            let response = await this.$store.dispatch(
                'user/cancelFriendRequest',
                {
                    from: this.username,
                    fromId: this.userId,
                    to: this.user.username,
                    toId: this.user.userId,
                }
            )
            if (response)
                this.$store.dispatch('view/showRequestModal', 'success')
            else if (!response)
                this.$store.dispatch('view/showRequestModal', 'failed')
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
</style>