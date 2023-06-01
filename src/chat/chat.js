import {collection, getDocs} from 'firebase/firestore';
import {db} from '../services/firestore.js';

/**
  * Graba un mensaje de chat.
 *
 * @param {string} name
 * @param {string} text
 * @returns {Promise<DocumentReference<{name: string, created_at: FieldValue, text: string}>>}
 */
export async function verMensaje() {
    const chatRef = collection(db, 'prueba');
    const docSnap = await getDocs(chatRef);
    console.log(docSnap.docs.map(doc => doc.data().nombre));
    // getDoc(chatRef)
    //     .then(snapshot => {
    //         console.log(snapshot.docs)
    // })
}

