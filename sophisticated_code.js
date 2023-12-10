/*
File: sophisticated_code.js

Description: This code demonstrates a complex and sophisticated implementation of a multi-threaded web application that uses various advanced JavaScript concepts and techniques.

Author: [Your Name]

Date: [Current Date]

*/

// *****************************************************
// ******************** Global Variables ****************
// *****************************************************

let usersData = []; // Stores users' information
let globalCounter = 0; // A global counter variable
let appState = "running"; // Represents the current state of the application
const maxThreads = 5; // Maximum number of parallel threads

// *****************************************************
// ************************* Utils *********************
// *****************************************************

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} - The random number generated
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Simulates an asynchronous API request returning a promise
 * @param {string} endpoint - The API endpoint
 * @param {number} delay - The delay in milliseconds before resolving the promise
 * @returns {Promise} - The API request's Promise
 */
function simulateAPIRequest(endpoint, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Response from ${endpoint}`);
    }, delay);
  });
}

// *****************************************************
// ****************** User Management ******************
// *****************************************************

/**
 * Fetches users' information using multiple parallel threads
 */
async function fetchUsersInformation() {
  console.log("Fetching users' information...");

  const threads = [];

  for (let i = 0; i < maxThreads; i++) {
    threads.push((async () => {
      while (appState === "running") {
        try {
          const userData = await simulateAPIRequest('users', getRandomNumber(500, 2000));
          usersData.push(userData);
        } catch (err) {
          console.error(err);
        }
      }
    })());
  }

  await Promise.all(threads);
}

/**
 * Stops fetching users' information
 */
function stopFetchingUsersInformation() {
  appState = "stopped";
}

// *****************************************************
// ******************** Data Analysis ******************
// *****************************************************

/**
 * Calculates the total number of users in the system
 * @returns {number} - The total number of users
 */
function calculateTotalUsers() {
  return usersData.length;
}

/**
 * Calculates the average age of users in the system
 * @returns {number} - The average age of users
 */
function calculateAverageAge() {
  const totalAge = usersData.reduce((sum, user) => sum + user.age, 0);
  return totalAge / usersData.length;
}

// *****************************************************
// ********************** UI Logic *********************
// *****************************************************

/**
 * Renders the current state of the application
 */
function render() {
  console.log(`Application state: ${appState}`);
  console.log(`Total Users: ${calculateTotalUsers()}`);
  console.log(`Average Age: ${calculateAverageAge().toFixed(2)}`);
}

/**
 * Starts the application and renders the UI
 */
async function startApplication() {
  await fetchUsersInformation();

  while (appState === "running") {
    render();
    await simulateAPIRequest('analytics', getRandomNumber(1000, 3000));
  }
}

// Start the application
startApplication();