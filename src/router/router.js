// Definimos el routeo de nuestra aplicación con Vue Router.
import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../pages/Home.vue";
import Precios from "../pages/Precios.vue";
// import Chat from "../pages/ChatNuevo.vue";
//REGISTRO
import Login from "../pages/Login.vue";
import Registro from "../pages/Registro.vue";
import RegistroTrabajador from "../pages/RegistroTrabajador.vue";
//CHAT
import ChatNuevo from "../pages/ChatNuevo.vue";
import SalaChatProfesionales from "../pages/SalaChat.vue";
//PERFILES
import PerfilUsuario from "../pages/PerfilUsuario.vue";
import PerfilProfesional from "../pages/PerfilProfesional.vue";
import PerfilServicio from "../pages/PerfilServicio.vue";
import Trabajadores from "../pages/Trabajadores.vue";
//SERVICIOS
import VerServicio from "../pages/VerServicio.vue";
import NuevoServicio from "../pages/NuevoServicio.vue";
// import EliminarServicio from "../pages/EliminarServicio.vue";
import VerServicioPerfil from "../pages/verServPerfil.vue";
import EditarServicio from "../pages/EditarServicio.vue";

// import TrabajadorIntro from "../pages/TrabajadorIntro.vue"
import {subscribeToAuthChanges} from "../services/auth.js";

// Empezamos por definir el array de rutas.
const routes = [
    {
        component: Home,
        path: '/',
    },
    {
        component: Precios,
        path: '/precios',
    },
    {
        component: ChatNuevo,
        path: '/ChatNuevo',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: Trabajadores,
        path: '/trabajadores',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: PerfilUsuario,
        path: '/perfil-usuario',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: PerfilProfesional,
        path: '/perfil-profesional',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: PerfilServicio,
        path: '/trabajador/:id',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: Login,
        path: '/iniciar-sesion',
    },
    {
        component: Registro,
        path: '/registro',
    },
    {
        component: ChatNuevo,
        path: '/usuario/:id/chat',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: SalaChatProfesionales,
        path: '/sala-chat-profesional',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: RegistroTrabajador,
        path: '/registro-trabajadores',
    },
    {
        component: VerServicio,
        path: '/ver-servicio',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: NuevoServicio,
        path: '/nuevo-servicio',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: VerServicioPerfil,
        path: '/servicios/:nombre/servicio/:id',
        meta: {
            requiresAuth: true,
        }
    },
    {
        component: EditarServicio,
        path: '/servicios/:id/editar',
        meta: {
            requiresAuth: true,
        }
    },
    // {
    //     component: TrabajadorIntro,
    //     path: '/trabajador-intro',
    // },
];

// Inicializamos el router con las rutas que definimos, y con el WebHashHistory.
// Este último define cómo queremos que se maneje la navegación de la página.
// WebHashHistory utiliza los "hashes" de la URL (#) para definir qué vista mostrar.
// WebHistory, en cambio, usa la API de HTML5 para manejar las rutas, haciendo que las rutas se vean
//  "limpias" (sin el #).
// La ventaja del WebHistory, obviamente, es un historial mucho más limpio, y mejor también para el
// posicionamiento/SEO.
// La contra, es que requiere tener un backend con Node.js que implemente el SSR (Server-Side Rendering) de
// Vue.
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let user = {
    id: null,
    email: null,
};

subscribeToAuthChanges(newData => user = newData);

router.beforeEach((to, from) => {
    // Si la ruta requiere que el usuario esté autenticado, y no lo está, lo redireccionamos al login.
    if(to.meta.requiresAuth && user.id === null) {
        return {
            path: '/iniciar-sesion',
        }
    }
});

export default router;