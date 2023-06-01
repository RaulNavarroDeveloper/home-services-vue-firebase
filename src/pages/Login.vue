<script>
import {login, AUTH_ERROR_MESSAGES} from "../services/auth.js";
import {useRouter} from 'vue-router';
export default {
    name: "Login",
    data: () => ({
        user: {
            email: '',
            password: '',
        },
        status: {
            type: 'success',
            text: '',
        },
        router: useRouter()
    }),
    methods: {
        ejecutarLogin() {
            login({
                ...this.user
            })
            .then(() => {
                this.status = {
                    type: 'success',
                    text: 'Sesión iniciada con éxito.',
                };
            })
            .catch(error => {
                console.log("[auth.login] error: ", error.code, error.message);
                this.status = {
                    type: 'danger',
                    text: AUTH_ERROR_MESSAGES[error.code] || error.code,
                }
            });
        }
    }
};
</script>

<template>
    <section class="container py-3">
        <h1>Inicio de Sesión</h1>
        <div
            v-if="status.text !== ''"
            :class="['alert', `alert-${status.type || 'info'}`]"
            >
                {{ status.text }}
        </div>
        <form
            action="#"
            method="post"
            @submit.prevent="ejecutarLogin"
        >
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                    v-model="user.email"
                >
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    v-model="user.password"
                >
            </div>
            <button type="submit" class="btn btn-primary w-100">Ingresar</button>
        </form>
    </section>
</template>
<style scoped>
    .btn-primary{
        background-color: #8099c9;
        border: #8099c9;
    }
</style>