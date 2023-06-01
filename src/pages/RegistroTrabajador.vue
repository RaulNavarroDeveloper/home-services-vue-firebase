<script>
import {register} from "../services/auth.js";

export default {
    name: "Registro",
    data: () => ({
        user: {
            nombre: null,
            apellido: null,
            email: null,
            password: null,
            rol: 'profesional',
            telefono: null,
            dni: null
        },
        errores: [],
        enviado: false,
    }),
    computed : {
		hayErrores: function(){
			return this.errores.length; 
		},
	},
    methods: {
        ejecutarSubmit() {
            this.errores = [];

            if (!this.user.nombre) {
                this.errores.push({
                    nombre: 'Tiene que ingresar un nombre.'
                });
            }
            if (!this.user.apellido) {
                this.errores.push({
                    apellido: 'Tiene que ingresar un apellido.'
                });
            }
            if (!this.user.password) {
                this.errores.push({
                    password: 'Tiene que ingresar una contraseña.'});
            }
            if (!this.user.telefono) {
                this.errores.push({
                    telefono: 'Tiene que ingresar un teléfono.'});
            }
            if (!this.user.dni) {
                this.errores.push({
                    dni: 'Tiene que ingresar un dni.'});
            }
            if (!this.user.email) {
                this.errores.push({
                    email: 'Tiene que ingresar un email.'});
            }
            console.log(this.errores)

            if(this.errores.length == 0) {
                register({
                    ...this.user
                })
                // .then(() => {
                // })
                this.nombre = null;
                this.apellido = null;
                this.password = null;
                this.dni = null;
                this.telefono = null;
                this.email = null;
                
            }
        }
    }
}
</script>
<template>
    <section class="container py-3">
        <h1>Registrate en Jandy como Profesional</h1>        
        <form
            class="w-50 m-auto mt-5"
            action="#"
            method="post"
            @submit.prevent="ejecutarSubmit"
        >
            <div class="d-flex justify-content-between">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        class="form-control"
                        v-model="user.nombre"
                    >
                    <div v-for="x in errores">
                        <p v-if="x.nombre" class="text-danger">{{x.nombre}}</p>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="apellido" class="form-label">Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        id="apellido"
                        class="form-control"
                        v-model="user.apellido"
                    >
                    <div v-for="x in errores">
                        <p v-if="x.apellido" class="text-danger">{{x.apellido}}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between">
            <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono:</label>
                <input
                    type="number"
                    name="telefono"
                    id="telefono"
                    class="form-control"
                    v-model="user.telefono"
                >
                <div v-for="x in errores">
                    <p v-if="x.telefono" class="text-danger">{{x.telefono}}</p>
                </div>
            </div>
            <div class="mb-3">
                <label for="dni" class="form-label">DNI:</label>
                <input
                    type="number"
                    name="dni"
                    id="dni"
                    class="form-control"
                    v-model="user.dni"
                >
                <div v-for="x in errores">
                    <p v-if="x.dni" class="text-danger">{{x.dni}}</p>
                </div>
            </div>

            </div>
            
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                    v-model="user.email"
                >
                <div v-for="x in errores">
                    <p v-if="x.email" class="text-danger">{{x.email}}</p>
                </div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    v-model="user.password"
                >
                <div v-for="x in errores">
                    <p v-if="x.password" class="text-danger">{{x.password}}</p>
                </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Registrarse</button>
        </form>
    </section>
</template>

<style scoped>
    .btn-primary{
        background-color: #8099c9;
        border: #8099c9;
    }
</style>