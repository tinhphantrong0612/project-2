<template>
    <div class="sidebar-footer row m-0">
        <div class="setting-button w-50 h-100 m-0 p-0 dropup">
            <button
                type="button"
                class="btn btn-shadow dropdown-toggle d-flex w-100 h-100 text-white align-items-center justify-content-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style="padding-bottom: 3px"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-gear"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                    />
                    <path
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                    />
                </svg>
                Settings
            </button>
            <div
                class="setting-dropdown-menu dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                id="#setting-dropdown"
            >
                <div class="dropdown-item" @click="logout()">Logout</div>
            </div>
        </div>
        <div class="account-button w-50 h-100 m-0 p-0 dropup">
            <button
                type="button"
                class="btn btn-shadow dropdown-toggle d-flex w-100 h-100 text-white border-right-0 align-items-center justify-content-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style="padding-bottom: 3px"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                    />
                </svg>
                Account
            </button>
            <div
                class="account-dropdown-menu dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                id="#account-dropdown"
            >
                <div class="dropdown-item dropstart">
                    <div
                        class="dropdown-toggle text-white w-100 m-0 border-0 p-0"
                        data-bs-toggle="dropdown"
                        data-bs-target="#friend-dropdown"
                    >
                        Friend
                    </div>
                    <div
                        class="dropdown-menu dropdown-menu-dark"
                        id="friend-dropdown"
                    >
                        <div class="dropdown-item" @click="openFriendRequest()">
                            Friend Request
                        </div>
                        <div class="dropdown-item" @click="openFriendList()">
                            Friend List
                        </div>
                    </div>
                </div>
                <div class="dropdown-item dropstart">
                    <div
                        class="dropdown-toggle text-white w-100 m-0 border-0 p-0"
                        data-bs-toggle="dropdown"
                        data-bs-target="#group-dropdown"
                    >
                        Groups
                    </div>
                    <div
                        class="dropdown-menu dropdown-menu-dark"
                        id="group-dropdown"
                    >
                        <div class="dropdown-item" @click="createGroup()">
                            Create
                        </div>
                        <div class="dropdown-item" @click="openGroupList()">
                            Group List
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button
            class="d-none"
            ref="modalToggleButton"
            data-bs-toggle="modal"
            data-bs-target="#requestModal"
        ></button>
    </div>
</template>

<script>
export default {
    name: 'SidebarFooter',
    methods: {
        async logout() {
            let response = await this.$store.dispatch('auth/logout')
            this.$router.push({ path: '/login' })
        },
        openFriendRequest() {
            this.$emitter.emit('toggleModal', 'request-list');
        },
        openFriendList() {
            this.$emitter.emit('toggleModal', 'friend-list');
        },
        createGroup() {
            this.$emitter.emit('toggleModal', 'create');
        },
        openGroupList() {
            this.$emitter.emit('toggleModal', 'group-list');
        }
    },
}
</script>

<style scoped>
.sidebar-footer {
    height: 50px;
    border-width: 1px !important;
    border: #3d4559 solid;
    border-left: 0px;
    border-bottom: 0px;
}
@media (max-width: 768px) {
    .sidebar-footer {
        position: fixed;
        bottom: 0;
        border-top: 1px #3d4559 solid;
        width: 35%;
        min-width: 300px;
        z-index: 1;
    }
}

.sidebar-footer .btn {
    box-shadow: none;
    outline: none;
    border-right: #3d4559 1px solid;
    border-radius: 0;
}

.sidebar-footer .dropdown-menu {
    margin-bottom: 0px;
    background-color: #1f273b;
}

.sidebar-footer .dropdown-item {
    color: rgba(255, 255, 255, 0.75);
}

.sidebar-footer .dropdown-item:hover {
    background-color: #3d4559;
    z-index: 1100;
}
</style>