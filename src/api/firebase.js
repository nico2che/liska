import firebase from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  getDoc,
  setDoc,
} from "firebase/firestore";

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

// Creators
function getAll(type) {
  const db = collection(firestore, type);
  if (!db) {
    throw new Error(`db ${type} doesn't exist`);
  }
  return async function () {
    const entities = await getDocs(db);
    const docs = [];
    entities.docs.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
    return docs;
  };
}

function create(type) {
  const db = collection(firestore, type);
  if (!db) {
    throw new Error(`db ${type} doesn't exist`);
  }
  return function (entity) {
    return addDoc(db, entity);
  };
}

function update(type) {
  const db = collection(firestore, type);
  if (!db) {
    throw new Error(`db ${type} doesn't exist`);
  }
  return function (id, entity) {
    return updateDoc(doc(firestore, type, id), entity);
  };
}

function remove(type) {
  const db = collection(firestore, type);
  if (!db) {
    throw new Error(`db ${type} doesn't exist`);
  }
  return function (id) {
    return deleteDoc(doc(firestore, type, id));
  };
}

// Session
export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

export function getCurrentSession() {
  return new Promise((res) => onAuthStateChanged(auth, res));
}

// User
export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const getUsers = getAll("users");
export const updateUser = update("users");
export const deleteUser = remove("users");

// Event
export const getEvents = getAll("events");
export const createEvent = create("events");
export const updateEvent = update("events");
export const deleteEvent = remove("events");

// Resource
export async function getResources() {
  const entities = await getDocs(
    query(collection(firestore, "spaces"), orderBy("order"))
  );
  const docs = [];
  entities.docs.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
  return docs;
}

export const createResource = create("resources");
export const updateResource = update("resources");
export const deleteResource = remove("resources");

// Custom fields
export const getCustomFields = getAll("customFields");
export const createCustomFields = create("customFields");
export const updateCustomFields = update("customFields");
export const deleteCustomFields = remove("customFields");

// Roles
export const getRoles = getAll("roles");
export const createRole = create("roles");
export const updateRole = update("roles");
export const deleteRole = remove("roles");

// Setting
export function getSettings() {
  return getDoc(doc(firestore, "settings", "general"));
}

export function setSettings(values) {
  return setDoc(doc(firestore, "settings", "general"), values);
}
