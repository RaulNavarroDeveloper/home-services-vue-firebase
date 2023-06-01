<script setup>
    import {updateUserProfile} from "../services/auth.js";
    
    import {onMounted, ref, computed} from 'vue';
    import {getUsuariosDatos, getProfesionalesDatos} from "../services/private-chats.js";
    import useAuth from "../composition/useAuth.js";
    const {user} = useAuth();
    const usuarios = ref([]);
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
    console.log(user.value.id)

    onMounted(() => {
        getProfessionals() 
    });

    function handleProfileUpdate() {
        updateUserProfile({
            displayName: form.value.displayName
        })
    }

    </script>

    <template>
        <div class="container py-3">


            <div class="mb-3 shadow-lg  mb-5 bg-body rounded rounded-5 p-4">
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

            <div class="mt-5 row shadow-lg  mb-5 bg-body rounded rounded-5 p-3">
                <h2>Mis mensajes</h2>
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
    </style>.