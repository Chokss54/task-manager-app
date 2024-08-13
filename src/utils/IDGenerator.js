/**
 * Basic ID generator for each Task
 */

let currentId = 0;

const generateId = () => {
  const result = currentId;
  currentId++;
  return result;
}

export default {generateId};