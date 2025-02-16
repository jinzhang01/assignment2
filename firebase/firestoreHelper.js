import { addDoc, collection } from 'firebase/firestore'; 
import { database } from './firebaseSetup';
import { deleteDoc, doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
 


export async function writeToDb(data, collectionName) {
    console.log("databae", database);
    try{
    console.log ("document added to db");
    await addDoc(collection(database, collectionName), data);
    }
    catch(e){
        console.error("error adding document:", e);
    }
}

export async function deleteFromDb(docId, collectionName) {
    try{
    await deleteDoc(doc(database, collectionName, docId));
    }
    catch(e){
        console.error("error deleting document:", e);
    }
}

export async function updateDb(docId, data, collectionName) {
    try{
    await setDoc(doc(database, collectionName, docId), data);
    }
    catch(e){
        console.error("error updating document:", e);
    }
}