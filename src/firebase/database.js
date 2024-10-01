import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc, getDoc  } from "firebase/firestore";
import { GetUserData } from "./firebase.js";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyC1mUSnoAU56SpLnxMDLIW6-bDK5orpgrw",
    authDomain: "ramschroyal.firebaseapp.com",
    projectId: "ramschroyal",
    storageBucket: "ramschroyal.appspot.com",
    messagingSenderId: "407442902464",
    appId: "1:407442902464:web:6d2db255534bbcd092cc25",
  };
  
// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db)
// Helper to convert Firestore data to array
const convertCollectionToArray = async (collectionRef) => {
    const snapshot = await getDocs(collectionRef);
    const array = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return array;
};

// 1. Get the entire database (returns all collections)
const GetDataBase = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    return await convertCollectionToArray(collectionRef);
};

// 2. Get a specific database entry
const GetSpecificDataBaseEntry = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
        throw new Error("No such document!");
    }
};

// 3. Write to the entire database (add new entry)
const WriteDataBase = async (collectionName, data) => {
    const newDocRef = doc(collection(db, collectionName)); // auto-generate ID
    await setDoc(newDocRef, data);
    return await GetDataBase(collectionName); // return updated database
};

// 4. Write to a specific database entry (with provided ID)
const WriteSpecificDataBaseEntry = async (collectionName, documentId, data) => {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, data);
    return await GetDataBase(collectionName); // return updated database
};

// 5. Update the entire database (this would need to be handled case-by-case)
const UpdateDataBase = async (collectionName, updateFunction) => {
    const data = await GetDataBase(collectionName);
    const updatedData = updateFunction(data); // Apply custom update logic
    await Promise.all(updatedData.map(async (entry) => {
        const docRef = doc(db, collectionName, entry.id);
        await updateDoc(docRef, entry);
    }));
    return await GetDataBase(collectionName); // return updated database
};

// 6. Update a specific database entry
const UpdateSpecificDataBaseEntry = async (collectionName, documentId, updatedData) => {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, updatedData);
    return await GetDataBase(collectionName); // return updated database
};

// 7. Remove the entire database (delete all entries in a collection)
const RemoveDataBase = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    await Promise.all(snapshot.docs.map(async (doc) => {
        const docRef = doc.ref;
        await deleteDoc(docRef);
    }));
    return await GetDataBase(collectionName); // return empty array
};

// 8. Remove a specific database entry
const RemoveSpecificDataBaseEntry = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    return await GetDataBase(collectionName); // return updated database
};

const collectionName = "sessions"
function CreateSession(db){
    const userData = GetUserData()
    var sessionData = {
        host: userData.uid,
        round: 0,
        start: false,
        players: {}
    }
}

function GetSessionHost(userData, documentId){

}

function JoinSession(){
    const userData = GetUserData()
}

function StartSession(){
    const userData = GetUserData()
}

function ReconnectSession(){
    const userData = GetUserData()
}

function LeaveSession(){
    const userData = GetUserData()
}

function DestroySession(){
    const userData = GetUserData()
}

console.log(GetUserData())


const documentId = "User1"
const sessionData = {
    name: "Peter Schmitd",
    points: 30,
    email: "johndoe@example.com"
};

var database = await GetDataBase(collectionName);
if (database.length === 0) {
    database = await WriteDataBase(collectionName, sessionData)
}

//WriteSpecificDataBaseEntry(database)
console.log(await GetDataBase(collectionName))
console.log(database[0].id)