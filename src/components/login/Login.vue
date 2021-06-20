<template>
    <div class="layout">
        <title>{{ title }}</title>
        <div
            class="card col-4 ml-auto mr-auto h-75 mt-5 text-white"
            style="
                background-color: #252a36;
                min-width: 300px;
                min-height: 150px;
                height: auto;
            "
        >
            <div class="card-header text-center">
                <h1>Mess</h1>
            </div>
            <div
                class="card-body"
                style="overflow: hidden scroll; padding: 1.25rem"
            >
                <div>
                    <ul
                        class="nav nav-tabs justify-content-between"
                        role="tablist"
                        style="
                            visibility: visible;
                            border-bottom: #3d4559 solid 1px;
                        "
                    >
                        <li class="nav-item w-50">
                            <a
                                class="
                                    nav-link
                                    active
                                    show
                                    text-white text-center
                                "
                                data-bs-toggle="tab"
                                href="#signin"
                                role="tab"
                                style="border-top-right-radius: 0px !important"
                                aria-selected="true"
                                @click="clearInformAndUpdateTitle('Login')"
                                >Sign In</a
                            >
                        </li>
                        <li class="nav-item w-50">
                            <a
                                class="nav-link text-white text-center"
                                data-bs-toggle="tab"
                                href="#signup"
                                role="tab"
                                style="border-top-left-radius: 0px !important"
                                aria-selected="false"
                                @click="clearInformAndUpdateTitle('Register')"
                                >Sign Up</a
                            >
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div
                            id="signin"
                            class="
                                container
                                tab-pane
                                active
                                show
                                border-top-0
                                h-100
                            "
                            style="
                                border: #3d4559 solid 1px;
                                border-radius: 10px;
                                border-top-left-radius: 0px;
                                border-top-right-radius: 0px;
                            "
                        >
                            <form class="pt-2" @submit.stop.prevent="prevent">
                                <div class="input-group p-3 pb-1">
                                    <input
                                        v-model="username"
                                        type="text"
                                        class="form-control bg-dark text-white"
                                        style="
                                            box-shadow: none;
                                            outline: none;
                                            border: #3d4559 solid 1px;
                                        "
                                        required
                                        placeholder="Username"
                                        maxlength="14"
                                        minlength="6"
                                        @input="onInputChange()"
                                    />
                                </div>
                                <div class="input-group p-3 pb-1">
                                    <input
                                        v-model="password"
                                        type="password"
                                        class="form-control bg-dark text-white"
                                        style="
                                            box-shadow: none;
                                            outline: none;
                                            border: #3d4559 solid 1px;
                                        "
                                        required
                                        placeholder="Password"
                                        maxlength="20"
                                        minlength="6"
                                        @input="onInputChange()"
                                    />
                                </div>
                                <span class="text-danger p-1">{{
                                    inform
                                }}</span>
                                <div class="text-center p-1 pb-2">
                                    <button
                                        type="submit"
                                        class="btn btn-primary col-5"
                                        style="font-size: 1.2rem"
                                        @click="login({ username, password })"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div
                            id="signup"
                            class="container tab-pane fade border-top-0"
                            style="
                                border: #3d4559 solid 1px;
                                border-radius: 10px;
                                border-top-left-radius: 0px;
                                border-top-right-radius: 0px;
                            "
                        >
                            <form class="pt-2" @submit.stop.prevent="prevent">
                                <div class="input-group p-3 pb-0 mb-3">
                                    <input
                                        v-model="username"
                                        type="text"
                                        class="form-control bg-dark text-white"
                                        style="
                                            box-shadow: none;
                                            outline: none;
                                            border: #3d4559 solid 1px;
                                        "
                                        required
                                        placeholder="Username"
                                        maxlength="14"
                                        minlength="6"
                                        @input="onInputChange()"
                                    />
                                </div>
                                <div class="input-group p-3 pt-0 pb-0 mb-3">
                                    <input
                                        v-model="password"
                                        type="password"
                                        class="form-control bg-dark text-white"
                                        style="
                                            box-shadow: none;
                                            outline: none;
                                            border: #3d4559 solid 1px;
                                        "
                                        required
                                        minlength="6"
                                        maxlength="20"
                                        placeholder="Password"
                                        @input="onInputChange()"
                                    />
                                </div>
                                <div class="input-group p-3 pt-0 pb-0 mb-3">
                                    <input
                                        v-model="email"
                                        type="email"
                                        class="form-control bg-dark text-white"
                                        style="
                                            box-shadow: none;
                                            outline: none;
                                            border: #3d4559 solid 1px;
                                        "
                                        required
                                        placeholder="Email"
                                        @input="onInputChange()"
                                    />
                                </div>
                                <div
                                    class="
                                        input-group
                                        justify-content-between
                                        p-3
                                        pt-0
                                        pb-0
                                        m-0
                                    "
                                >
                                    <select
                                        v-model="gender"
                                        class="
                                            form-control
                                            bg-dark
                                            text-white
                                            w-25
                                        "
                                        style="
                                            box-shadow: none;
                                            outline: none;
                                            border: #3d4559 solid 1px;
                                        "
                                        required
                                        @input="onInputChange()"
                                    >
                                        <option selected disabled value="">
                                            Gender...
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input
                                        v-model="dateOfBirth"
                                        type="date"
                                        class="
                                            form-control
                                            bg-dark
                                            text-white
                                            w-50
                                        "
                                        style="
                                            box-shadow: none;
                                            outline: none;
                                            border: #3d4559 solid 1px;
                                        "
                                        @input="onInputChange()"
                                        required
                                    />
                                </div>
                                <span class="text-danger p-1">{{
                                    inform
                                }}</span>
                                <div class="text-center p-1 mb-2">
                                    <button
                                        class="btn btn-primary col-5"
                                        style="font-size: 1.2rem"
                                        @click="
                                            register({
                                                username,
                                                password,
                                                email,
                                                gender,
                                                dateOfBirth,
                                            })
                                        "
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            title: 'Login',
            username: '',
            password: '',
            gender: '',
            email: '',
            dateOfBirth: this.formatDate(Date.now()),
        }
    },
    computed: {
        inform() {
            return this.$store.getters['auth/inform']
        },
    },
    methods: {
        login(loginData) {
            if (this.username.length < 6 || this.password.length < 6) return
            this.$store.dispatch('auth/login', loginData).then((isSuccess) => {
                if (isSuccess) {
                    this.$router.push({ path: '/' })
                }
            })
        },
        register(registerData) {
            if (this.username.length < 6 || this.password.length < 6) return
            this.$store.dispatch('auth/register', registerData)
        },
        onInputChange() {
            if (this.username.length < 6 || this.password.length < 6) return
            this.$store.dispatch('auth/updateAuthenticator', {
                username: this.username,
                password: this.password,
                gender: this.gender,
                email: this.email,
                dateOfBirth: new Date(this.dateOfBirth),
            })
        },
        clearInformAndUpdateTitle(title) {
            this.title = title
            this.$store.dispatch('auth/clearInform')
        },
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear()

            if (month.length < 2) month = '0' + month
            if (day.length < 2) day = '0' + day

            return [year, month, day].join('-')
        },
    },
}
</script>

<style scoped>
.layout {
    font-size: 1rem;
    height: calc(var(--vh, 1vh) * 100);
    color: rgba(255, 255, 255, 0.75);
    background-color: #1a2236 !important;
    display: flex;
    max-height: 100%;
}

.nav-link {
    line-height: 1.6;
    background-color: #252a36 !important;
    border-color: #3d4559 #3d4559 #3d4559 #3d4559 !important;
}

.nav-link:focus {
    background-color: #252a36 !important;
}

.nav-link.active {
    border-color: #3d4559 #3d4559 #252a36 #3d4559 !important;
}

.nav-link:hover {
    background-color: #3d4559 !important;
    border-color: #3d4559 #3d4559 #3d4559 #3d4559 !important;
}

::-webkit-scrollbar {
    width: 5px;
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #252a36;
    border-radius: 10px;
}

button {
    padding: 0.375rem;
}
</style>