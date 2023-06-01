import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { getFirestore, doc, collection, setDoc, getDoc, query, where, getDocs} from "firebase/firestore";
const db = getFirestore();

import app from "./firebase";
const firestore = getFirestore(app)

const auth = getAuth();

export const AUTH_ERROR_MESSAGES = {
    'auth/invalid-email': 'El email ingresado no existe en nuestro registros.',
    'auth/internal-error': 'Los datos ingresados no parecen correctos. Por favor, revisá que estén los valores para el email y el password.',
    'auth/wrong-password': 'El password es incorrecto.',
    'auth/user-not-found': 'El usuario a ingresar, no está registrado. Para poder acceder, registrá el usuario'
}

export const REGISTER_ERROR_MESSAGES = {
    'auth/invalid-email': 'El email ingresado no es válido.',
    'auth/internal-error': 'Los datos ingresados no parecen correctos. Por favor, revisá que estén los valores sean correctos',
    'auth/wrong-password': 'El password es incorrecto.',
    'auth/user-not-found': 'El usuario a ingresar, no está registrado. Para poder acceder, registrá el usuario'
}

let userData = {
    id: null,
    email: null,
    displayName: null,
    // rol: null,
    // photoURL: null,
};


if(localStorage.getItem('user') !== null) {
    userData = JSON.parse(localStorage.getItem('user'));
}

export async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal
}

onAuthStateChanged(auth, user => {

    if(user) {
        userData = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
        };
    } else {
        userData = {
            id: null,
            email: null,
            displayName: null,
        };
    }
    
    localStorage.setItem('user', JSON.stringify(userData));
    notifyAll();
});

/*
 |--------------------------------------------------------------------------
 | Login/logout
 |--------------------------------------------------------------------------
 */
/**
 * Registra un usuario.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export async function register({email, password, rol, nombre, apellido, telefono, dni}) {
    const firestore = getFirestore(app);
    const usuarioInfo = await createUserWithEmailAndPassword(auth, email, password)
        .then((usuarioBase => {
            return usuarioBase
        }));
        // console.log(usuarioInfo);
        if(rol == 'usuario'){
            const docuRef = doc(firestore, `usuarios/${usuarioInfo.user.uid}`);
            setDoc(docuRef, { correo: email, rol: rol, id: usuarioInfo.user.uid, nombre: nombre, apellido: apellido});
        } else {
            const docuRef = doc(firestore, `profesionales/${usuarioInfo.user.uid}`);
            setDoc(docuRef, { correo: email, rol: rol, id: usuarioInfo.user.uid, nombre: nombre, apellido: apellido, telefono:telefono, dni: dni});
        }
    }

/**
 * Inicia sesión.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export function login({ email, password }) {
    return signInWithEmailAndPassword(auth, email, password);
        // .then(user => {
        //     if(user) {
        //         console.log("El usuario está autenticado.");
        //     } else {
        //         console.log("El usuario _no_ está autenticado.");
        //     }
        // })
        // .catch(error => {
        //     console.log("[auth.login] error: ", error.code, error.message);
        // });
}

/**
 * Cierra la sesión.
 *
 * @returns {Promise<void>}
 */
export function logout() {
    return signOut(auth)
        .then(() => {
            console.log('Cerraste Sesión');
        });
}

/**
 * Actualiza el perfil del usuario.
 *
 * @param {string} displayName
 * @returns {Promise<void>}
 */
export function updateUserProfile({displayName}) {
    return updateProfile(auth.currentUser, {
        displayName,
    })
        .then(() => {
            // Actualizamos la data actual del usuario a la nueva.
            userData = {
                ...userData,
                displayName,
            };

            // Notificamos los cambios en la data del usuario.
            notifyAll();
        });
}

let observers = [];

export function subscribeToAuthChanges(callback) {
    observers.push(callback);

    console.log("Observer agregado con éxito. ", observers);

    notify(callback);

    return () => {
        observers = observers.filter(observerCallback => observerCallback !== callback);
    }
}

function notify(callback) {
    callback({...userData});
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}

export async function buscarRol (id) {
    const q = query(collection(db, 'profesionales'), where('id', '==', id));
    const docs = await getDocs(q);
    const resultPro = docs.docs.map(item => item.data());
    // console.log(resultPro)
        if(resultPro.length > 0) {
            return resultPro[0].rol;
        }


    const q2 = query(collection(db, 'usuarios'), where('id', '==', id));
    const docs2 = await getDocs(q2);
    const resultUser = docs2.docs.map(item => item.data())
    if(resultUser.length > 0) {
        return resultUser[0].rol;
    }
}