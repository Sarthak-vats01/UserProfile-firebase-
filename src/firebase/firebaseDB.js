import { ref, set, update, remove } from "firebase/database";
import { database } from "./firebase.js";

// Function to create data in Firebase Realtime Database
const createData = async (path, data) => {
  try {
    const dbRef = ref(database, path);
    await set(dbRef, data);
    console.log("Data created successfully.");
  } catch (error) {
    console.error("Error creating data:", error);
  }
};

// Function to update data in Firebase Realtime Database
const updateData = async (path, updates) => {
  try {
    const dbRef = ref(database, path);
    await update(dbRef, updates);
    console.log("Data updated successfully.");
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

// Function to delete data from Firebase Realtime Database
const deleteData = async (path) => {
  try {
    const dbRef = ref(database, path);
    await remove(dbRef);
    console.log("Data deleted successfully.");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

export { createData, updateData, deleteData };
