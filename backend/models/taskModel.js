 const db = require("../db");

/**
 * Retrieves all tasks from the database, ordered by creation date in descending order.
 * @returns {Promise<Array>} An array of task objects.
 */
const getTasks = async () => {
  const res = await db.query(
    // Corrected SQL query to select all columns from the tasks table
    "SELECT * FROM tasks ORDER BY created_at DESC"
  );
  return res.rows;
};

/**
 * Inserts a new task into the database with the provided title and description.
 * Sets is_complete to false and records the current timestamp as created_at.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @returns {Promise<Object>} The newly created task object.
 */
const addTask = async (title, description) => {
  const res = await db.query(
    // SQL query to insert a new task and return the inserted row
    "INSERT INTO tasks (title, description, is_complete, created_at) VALUES ($1, $2, false, NOW()) RETURNING *",
    [title, description]
  );
  return res.rows[0];
};

module.exports = { getTasks, addTask };
