<script setup>
    import {updateUserProfile} from "../services/auth.js";
    import UserProfileDetails from "../components/UserProfileDetails.vue";
    import {onMounted, ref, computed} from 'vue';
    import {getUsuariosDatos, getProfesionalesDatos} from "../services/private-chats.js";
    import {obtenerServicios, deleteServicios, getServicioRef} from "../services/servicios.js"
    import useAuth from "../composition/useAuth.js";
    const {user} = useAuth();
    const usuarios = ref([]);
    const servicios = ref([]);
    const form = ref({displayName: ''})

    async function getUsers() {
        getUsuariosDatos(user.value.id)
        .then(result => {
            usuarios.value = result;
        })
    }

    async function getProfessionals() {
        getProfesionalesDatos(user.value.id)
        .then(result => {
            usuarios.value = result;
        })
    }
    
    async function getServicios() {
        obtenerServicios(user.value.id)
        .then(result =>{
            servicios.value = result;
        })
    }
    onMounted(() => {
        getUsers();
        getServicios();
        getServicioRef(user.value.id);
        console.log("USUARIOS VALUE", usuarios.value)
    });

    function handleProfileUpdate() {
        updateUserProfile({
            displayName: form.value.displayName
        })
    }

    function handleEliminar() {
        deleteServicios(user.value.id)
        .then(() => {
            console.log("ELIMINÓ BIEN")
            
            location.reload()
        })
    }
    </script>

    <template>
        <div class="container py-3">
            <div class="mb-3 shadow-lg  mb-5 bg-body rounded rounded-5 p-3">
                <h1>Mi Perfil</h1>

                <div>
                    <UserProfileDetails :user="user" />
                </div>
                <div>

                    <form
                        action="#"
                        method="post"
                        @submit.prevent="handleProfileUpdate"
                    >
                        <div class="mb-3">
                            <label for="displayName" class="form-label">Nombre de usuario</label>
                            <input
                                type="text"
                                id="displayName"
                                class="form-control"
                                :disabled="loading"
                                v-model="form.displayName"
                            >
                        </div>
                        <button type="submit" class="btn btn-primary">Editar</button>
                    </form>
                </div>

            </div>

            <div class="my-5 py-5 shadow-lg  mb-5 bg-body rounded rounded-5 p-3">
                <h2>Servicios</h2>
                <hr>
                <div>
                    <div>
                        <router-link to="/nuevo-servicio" class="btn btn-small btn-primary">Nuevo Servicio</router-link>
                        
                        <h3 class="fs-4 mt-4">Lista de servicios:</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="serv in servicios">
                                    <td>{{serv.nombre}}</td>
                                    <td>${{serv.precio}}</td>
                                    <td>
                                        <!-- <router-link to="/ver-servicio" class="btn btn-primary">Ver</router-link> -->
                                        <router-link :to="`/servicios/${serv.id}/editar`" class="btn btn-secondary me-3">Editar</router-link>
                                        <!-- <router-link to="/eliminar-servicio" class="btn btn-danger">Eliminar</router-link> -->
                                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Eliminar
                                        </button>
                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                              <div class="modal-content">
                                                <div class="modal-header">
                                                  <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar Servicio</h1>
                                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                  Está por eliminar el servicio: "{{serv.nombre}}" <br>
                                                  ¿Desea eliminarlo?
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                    <form action="#" method="post" @submit.prevent="handleEliminar">
                                                        <button type="submit" class="btn btn-danger">Eliminar</button>
                                                    </form>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="mt-5 shadow-lg  mb-5 bg-body rounded rounded-5 p-3">
                <h2>Mis mensajes</h2>
                
                <hr>
                <template v-if="usuarios != []">
                    <div v-for="user in usuarios">
                        <div class="div-msj d-flex justify-content-between align-items-center mt-4 w-75 m-auto">
                        <img src="https://via.placeholder.com/70" alt="" class="img-fluid ms-2 rounded-5">
                        <p>{{user.nombre}} {{user.apellido}}</p>
                        <router-link
                            :to="`/usuario/${user.id}/chat`"
                            class="btn btn-primary me-3"
                        ><i class="fa-solid fa-comments"></i>
                        <!-- Responder -->
                        </router-link>
                        </div>
                    </div>
                </template>
                <template v-if="usuarios.length == 0">
                    <p>No hay mensajes por el momento...</p>
                </template>
            </div>
        </div>
    </template>

<style scoped>
.div-msj{
    border-radius: 10px;
    height: 75px;
    background-color: rgb(199, 200, 235);
}
.btn-primary{
    background-color: #8099c9;
    border: #8099c9;
}
</style>