import {
    getFirestore,
    doc,
    getDocs,
    addDoc,
    collection,
    serverTimestamp,
    query,
    where,
    limit, orderBy, onSnapshot,
} from "firebase/firestore";


const db = getFirestore();

async function getPrivateChatRef({from, to}) {
    let privateChatRef;
    const queryChat = query(collection(db, 'private-chats'), where('users', '==', {
        [from]: true,
        [to]: true,
    }), limit(1));

    const docsSnap = await getDocs(queryChat);
    if(docsSnap.empty) {
        // Si la sala no existe, entonces tenemos que crearla.
        privateChatRef = await addDoc(collection(db, 'private-chats'), {
            users: {
                [from]: true,
                [to]: true,
            }
        });
    } else {
        privateChatRef = docsSnap.docs[0];
    }

    return privateChatRef;
}

export async function sendPrivateMessage({from, to, text}) {
    const privateChatRef = await getPrivateChatRef({from, to});

    return addDoc(collection(db, 'private-chats', privateChatRef.id, 'messages'), {
        from,
        text,
        created_at: serverTimestamp(),
    });
}

export async function subscribeToPrivateChat({from, to}, callback) {
    const privateChatRef = await getPrivateChatRef({from, to});

    const queryChat = query(
        collection(db, 'private-chats', privateChatRef.id, 'messages'),
        orderBy('created_at'),
    );

    return onSnapshot(queryChat, snapshot => {
        const messages = snapshot.docs.map(item => {
            return {
                text: item.data().text,
                from: item.data().from,
                created_at: item.data().created_at?.toDate(),
            };
        });

        callback(messages);
    });
}

export async function getMensajesHaciaAlguien(id) {
    const q = query(collection(db, 'private-chats'), where(`users.${id}`, '==', true));
    const docs = await getDocs(q);
    return docs.docs.map(item => item.data());
}

export async function getArrayUsuariosId(id) {
    let arrayChat = await getMensajesHaciaAlguien(id);
    let arrayUsuarios = [];
    for(let a of arrayChat) {
        for(let b of Object.keys(a.users)) {
            if(b !== id) {
                arrayUsuarios.push(b);
            }
        }
    }
    return arrayUsuarios;
}

export async function getUsuariosDatos(id) {
    const arrayIds = await getArrayUsuariosId(id);
    const q2 = query(collection(db, 'usuarios'), where("id", "in", arrayIds))
    const docs2 = await getDocs(q2);
    return docs2.docs.map(item => item.data());
}

export async function getProfesionalesDatos(id) {
    const arrayIds = await getArrayUsuariosId(id);
    console.log(arrayIds);
    const q2 = query(collection(db, 'profesionales'), where("id", "in", arrayIds))
    const docs2 = await getDocs(q2);
    return docs2.docs.map(item => item.data());
}

export async function getProfesionalPerfil(id) {
    const q = query(collection(db, 'profesionales'), where('id', '==', id))
    const docs = await getDocs(q)
    return docs.docs.map(item => item.data())
}

export async function getTrabajadoresRegistrados() {
    const q = await getDocs(collection(db, 'profesionales'));
    return q.docs.map(item => item.data());
}