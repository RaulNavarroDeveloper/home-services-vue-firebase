<script>
import {register, REGISTER_ERROR_MESSAGES} from "../services/auth.js";

export default {
    name: "Registro",
    data: () => ({
        user: {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            rol: 'usuario',
        },
        status: {
            type: 'success',
            text: '',
        },
    }),
    methods: {
        ejecutarSubmit() {
            register({
                ...this.user
            })
            .then(() => {
                    this.status = {
                        ...this.status,
                        type: 'success',
                        text: 'Cuenta creada correctamente. ¡Gracias por registrarte!',
                    }
                })
                .catch(error => {
                    console.log("[auth.login] error: ", error.code, error.message);
                    this.status = {
                        type: 'danger',
                        text: REGISTER_ERROR_MESSAGES[error.code] || error.code,
                    }
                });
        }
    }
};
</script>
<template>
    <section class="container py-3">
        <h1>Registro</h1>
        <div
            v-if="status.text !== ''"
            :class="['alert', `alert-${status.type || 'info'}`]"
            >
                {{ status.text }}
        </div>
        <form
            action="#"
            method="post"
            @submit.prevent="ejecutarSubmit"
        >
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    class="form-control"
                    v-model="user.nombre"
                >
            </div>
            <div class="mb-3">
                <label for="apellido" class="form-label">Apellido</label>
                <input
                    type="text"
                    name="apellido"
                    id="apellido"
                    class="form-control"
                    v-model="user.apellido"
                >
            </div>
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
            <button type="submit" class="btn btn-primary w-100">Registrarme</button>
        </form>
    </section>
</template>

<style scoped>
    .btn-primary{
        background-color: #8099c9;
        border: #8099c9;
    }
</style>