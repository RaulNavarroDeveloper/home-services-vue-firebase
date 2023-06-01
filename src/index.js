// Incluimos los css.
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// // Importamos nuestros servicios de Firebase.
import './services/firebase.js';
import './services/firestore.js';

// Inicializamos nuestra app de Vue.
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router/router.js";

const app = createApp(App);

// Agregamos el router.
app.use(router);

// Montamos la app de Vue en el div#app.
app.mount('#app');