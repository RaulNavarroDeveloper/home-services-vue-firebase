import { async } from "@firebase/util";
import {
    getFirestore,
    doc,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    collection,
    updateDoc,
    serverTimestamp,
    query,
    where,
    limit, orderBy, onSnapshot,
} from "firebase/firestore";

const db = getFirestore();

export async function getServicioRef(id) {
    let servicioRef;
    const queryServicio = query(collection(db, 'servicios'), where('user', '==', id));

    const docsSnap = await getDocs(queryServicio);

    if(!docsSnap.empty) {
        servicioRef = docsSnap.docs[0];
    }
    console.log("HOLAA:", docsSnap.docs[0].id)

    return servicioRef;
}


export async function agregarServicio({nombre, descripcion, precio, user}) 
{
    const servicioData = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        user: user,
    }

    const addDocumento = addDoc(collection(db, "servicios"), {
        ...servicioData
    });

    const docAddId = await addDocumento

    updateDoc(doc(db, 'servicios', docAddId.id), {
        ...servicioData,
        id: docAddId.id,
    });
    

}

export async function obtenerServicios(id) {
    const q = query(collection(db, 'servicios'), where('user', '==', id))
    const docs = await getDocs(q)
    return docs.docs.map(item => item.data())
}

export async function servicioEspecifico(id) {
    const docRef = doc(db, 'servicios', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}

export async function getServiciosRegistrados() {
    const q = await getDocs(collection(db, 'servicios'));
    return q.docs.map(item => item.data());
}


export async function deleteServicios(id) {
    const servicesRef = await getServicioRef(id)
    return deleteDoc(doc(db, 'servicios', servicesRef.id));
}



export async function editarServicio(id, data) {
    return updateDoc(doc(db, 'servicios', id), {
        ...data,
        edited_at: serverTimestamp(),
    });
}