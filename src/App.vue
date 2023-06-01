<script>
import {logout, subscribeToAuthChanges, buscarRol} from "./services/auth.js";

import logoJandy from '../public/imgs/logo-jandy.png'
// import {logout} from "./services/auth.js";

export default {
    name: "App",
    data: () => ({
        user: {
            id: null,
            email: null,
        },
        rol: '',
        logoJandy: logoJandy,
    }),
    methods: {
        ejecutarLogout() {
            logout();
            this.$router.push({
                path: '/iniciar-sesion',
            });
          },
        },
    mounted() {
      subscribeToAuthChanges(user => this.user = user)
      buscarRol(this.user.id).then(r => {
        this.rol = r;
      })
            
    }
};
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Jandy</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>           

              <template v-if="this.rol == 'usuario'">
                <li class="nav-item">
                  <router-link class="nav-link" to="/trabajadores">Servicios</router-link>
                </li>
                <li>
                  <router-link class="nav-link" to="/perfil-usuario">Perfil</router-link>
                </li>
              </template>
              <template v-else>
              </template>

              <template v-if="this.rol == 'profesional'">
                <li class="nav-item">
                  <router-link class="nav-link" to="/perfil-profesional">Perfil</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/sala-chat-profesional">Mensajes</router-link>
                </li>
              </template>

              <template v-if="user.id === null">
                <li class="nav-item">
                  <router-link class="nav-link" to="/registro">Registro</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/iniciar-sesion">iniciar Sesión</router-link>
                </li>
                <li class="nav-item ms-5 me-3">
                  <router-link class="nav-link btn btn-primary" to="/registro-trabajadores">Únete como Pro</router-link>
                </li>
              </template>

              <template v-else>
                <li class="nav-item">
                  <form
                    action="#"
                    method="post"
                    @submit.prevent="ejecutarLogout"
                  >
                    <button class="btn nav-link">Cerrar Sesión </button>
                  </form>
                </li>
              </template>
              

            </ul>
          </div>
        </div>
      </nav>
    <main>
        <router-view/>
    </main>
    <footer class="container-fluid bg-dark mb-0 footer">
      <section class="text-center text-lg-start text-white container">
        <div class="pt-4">
          <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <hr class="mb-4 mt-0 d-inline-block mx-auto"/>
                <img :src="logoJandy" width="100" alt="Logo Jandy">
              </div>
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold">Secciones</h6>
              <hr class="mb-4 mt-0 d-inline-block mx-auto"/>
              <p>
                <a href="/" class="nav-link p-0 text-muted">Home</a>
              </p>
            </div>
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 class="text-uppercase fw-bold">Contacto</h6>
              <hr class="mb-4 mt-0 d-inline-block mx-auto" />
                <a href="https://www.instagram.com/escueladavinci/?hl=es" class="nav-link p-0 text-muted">
                  <i class="fa-brands fa-instagram mr-5"></i>
                  Instagram
                </a>
                <a href="https://es-la.facebook.com/EscuelaDavinci/" class="nav-link p-0 text-muted">
                  <i class="fa-brands fa-facebook"></i>
                  Facebook
                </a>
                  <a href="https://davinci.edu.ar/" class="nav-link p-0 text-muted">
                    <i class="fa-solid fa-graduation-cap"></i>
                    DaVinci
                  </a>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center p-3 footer-abajo">
          © 2022 Copyright:
          <a class="text-white" href="https://davinci.edu.ar/">
              Escuela DaVinci
          </a>
        </div>
      </section>
    </footer>
                  
</template>

<style scoped>
  .btn-primary{
        background-color: #8099c9;
        border: #8099c9;
        color: white;
  }
  .btn-primary:hover{
    transition: 0.5s;
        background-color: #d99567;
        border: #d99567;
  }
</style>