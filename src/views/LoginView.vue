<template>
    <div class="container vh-100 text-center">
        <div class="d-flex flex-column justify-content-center h-100">
            <div class="row">
                <h1 class="h3 mb-3">
                    請先登入
                </h1>
                <div class="col">
                    <form id="form" class="form-signin w-100">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="email" placeholder="Email" required autofocus
                                v-model="username">
                            <label for="email">信箱</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="password" placeholder="Password" required
                                v-model="password">
                            <label for="password">密碼</label>
                        </div>
                        <button class="btn btn-lg btn-primary w-100 mt-5" type="button" @click="login">
                            登入
                        </button>
                    </form>
                </div>
            </div>
            <p class="mt-5 mb-3 text-muted">
                &copy; 六角學院
            </p>
        </div>
    </div>
</template>

<style lang="scss">
.form-signin {
    max-width: 330px;
    padding: 15px;
    margin: auto;
}
</style>

<script>
import axios from 'axios';
import router from '../router';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        login() {
            if (!this.username || !this.password) {
                alert('請輸入信箱或密碼!');
                return;
            } else {
                axios.post(`${VITE_URL}/admin/signin`, {
                    "username": this.username,
                    "password": this.password
                })
                    .then(res => {
                        const { token, expired } = res.data;
                        document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
                        this.username = "";
                        this.password = "";
                        router.push('/product');
                    })
                    .catch(err => {
                        alert(err.data.message);
                    });
            };
        },
    },
};
</script>