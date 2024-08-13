# Learning Notes
This notepad is just a reminder for me to not make the same mistakes when I come across similar issues next time.

### 1. State Mutation issue with react states
  - For re-rendering components. If we mutate a state directly, the reference to the state object remains the same (shallow referencing) so react won't see it as a change, hence does not trigger re-render.

  E.g.
  ```
  const [tasksData, setTasksData] = useState(TasksList.getTasks());
  .
  .
  .
  TasksList.addTask(form.title, form.desc);
  const updatedTasks = [TasksList.getTasks()];
  setTasksData(updatedTasks); 
  ```

  ^^ Here we are only mutating the original array and react does not see it as a change to trigger re-render

  ```
  const updatedTasks = [...TasksList.getTasks()];
  ```

  ^^ We should use '...' that create new instances instead of modifying existing ones


### 2. How to make sure the height of card is consistent? (matches the longest card)

  -ez fix is to set the height of all card to take up max height (h-100)

  - ref: https://www.youtube.com/watch?v=wolSRMGJ-Ls


###3. Using anonymous functions
  - Generally we wanna use anonymous functions with event handlers like `onClick` because this event doesn't take functions with arguments

  E.g.
  ```
  <button onClick={() => handlePageClick(pageNo)}>Click Me</button>
  ```

### 4. Object destructuring
  - we can extract values directly by using { key } from a data object 

  E.g.
  ```
  const user = { 
    'name': 'Alex',
    'address': '15th Park Avenue',
    'age': 43 }
    
    so instead of using:
    const name = user.name;
    const age = user.age;

    we can do:
    const { name,age } = user;
  ```
