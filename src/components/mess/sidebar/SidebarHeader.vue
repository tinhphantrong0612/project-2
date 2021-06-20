<template>
    <div class="sidebar-header">
        <div class="user-info m-0 media p-2 align-items-center d-block">
            <figure class="avatar-figure pl-0 m-auto">
                <img
                    class="user-avatar rounded-circle"
                    onerror="this.src='/src/assets/avatar/default.png'"
                    :src="'/api/src/assets/avatar/' + username"
                />
            </figure>
            <div>
                <h5 class="user-name media-body d-block">{{ username }}</h5>
            </div>
        </div>
        <div class="search-box d-flex input-group w-100 p-3">
            <span class="search-icon p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style="padding-top: 0.3rem"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                    />
                </svg>
            </span>
            <input
                type="search"
                v-model="searchName"
                class="p-1 w-75"
                placeholder="Search..."
                results="5"
                maxlength="14"
                @keypress.enter="onSearch(searchName)"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarHeader',
    data() {
        return {
            searchName: '',
        }
    },
    computed: {
        username() {
            return this.$store.getters['user/username']
        },
        groups() {
            return this.$store.getters['user/groups']
        },
    },
    methods: {
        async onSearch(searchName) {
            await this.$store.dispatch('user/search', searchName)
        },
    },
}
</script>

<style scoped>
.sidebar-header {
    height: 165px;
    border-width: 1px !important;
    border: #3d4559 solid;
    border-bottom: 0px;
    border-top: 0px;
    border-left: 0px;
}

.sidebar-header {
    align-items: center;
}

.sidebar-header .user-info {
    display: flex;
    height: 55%;
    width: 100%;
}

.sidebar-header .user-info .avatar-figure {
    height: 60px;
    width: 60px;
    margin: 0 8px;
}

.sidebar-header .user-info .user-avatar {
    height: 60px;
    width: 60px;
    object-fit: contain;
    border: green 1px solid;
}

.sidebar-header .user-name {
    text-align: center;
}

.sidebar-header .search-box {
    height: 45%;
}

.sidebar-header .search-box .search-icon {
    border: #3d4559 1px solid;
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

input[type='search'] {
    appearance: textfield;
    background: inherit;
    box-shadow: none;
    color: rgba(255, 255, 255, 0.75);
    outline-offset: 0px;
    border: #3d4559 1px solid;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

input[type='search']:focus {
    outline: none;
    box-shadow: none;
    border: #3d4559 1px solid;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>