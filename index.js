// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require("./Student");
const readline = require("readline");

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - filterByMinYear
      - findBySpecialization
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(" ");

  switch (operation) {
    case "add":
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
      console.log("Adding student...");
      const [name, year, email, specialization] = args;
      // --------> WRITE YOUR CODE BELOW

      if (!name || !year || !email || !specialization) {
        console.log(
          "Please provide all required fields: name, year, email, specialization"
        );
        break;
      }

      const newStudent = new Student(name, year, email, specialization);

      studentManagementSystem.addStudent(newStudent);

      console.log(`Updated Student List: `);

      console.log(studentManagementSystem.displayStudents());

      break;

    // --------> WRITE YOUR CODE ABOVE

    case "remove":
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log("Removing student...");
      // --------> WRITE YOUR CODE BELOW
      const removeEmail = args[0];

      if (!removeEmail) {
        console.log("Please provide the email of the student to remove");
        break;
      }

      studentManagementSystem.removeStudent(removeEmail);

      console.log("Updated Student List:");

      console.log(studentManagementSystem.displayStudents());

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "display":
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */

      // --------> WRITE YOUR CODE BELOW

      console.log("Displaying students...");

      const studentList = studentManagementSystem.displayStudents();

      if (studentList === "") {
        console.log("No students to display");
      } else {
        console.log(studentList);
      }
      break;
    // --------> WRITE YOUR CODE ABOVE

    case "find":
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */

      // --------> WRITE YOUR CODE BELOW

      console.log("Finding student...");
      const findEmail = args[0];
      if (!findEmail) {
        console.log("Please provide the email of the student to find");
        break;
      }

      const studentFound = studentManagementSystem.findStudent(findEmail);

      if (studentFound === -1) {
        console.log("Student does not exist");
      } else {
        console.log(studentFound.getString());
      }
      break;
    // --------> WRITE YOUR CODE ABOVE
    case "findBySpecialization":
      console.log("Finding Student...");
      let studentSpecialization = args[0];
      let filteredStudents = studentManagementSystem.filterBySpecialization(
        studentSpecialization
      );
      console.log(filteredStudents.map((student) => student.getName()));
      break;

    case "filterByMinYear":
      console.log("Filtering students...");
      let minimunYear = args[0];
      let fitleredStudentsByYear =
        studentManagementSystem.filterByMinYear(minimunYear);
      console.log(fitleredStudentsByYear.map((student) => student.getName()));
      break;

    case "save":
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */

      // --------> WRITE YOUR CODE BELOW

      console.log("Saving data...");
      const saveFileName = args[0];
      await studentManagementSystem.saveToJson(saveFileName);
      console.log(`Data saved to ${saveFileName}`);
      break;

    // --------> WRITE YOUR CODE ABOVE

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */

      // --------> WRITE YOUR CODE BELOW

      console.log("Loading data...");
      const loadFileName = args[0];
      await studentManagementSystem.loadFromJSON(loadFileName);
      console.log(`Data loaded from ${loadFileName}`);
      console.log(studentManagementSystem.displayStudents());
      break;

    // --------> WRITE YOUR CODE ABOVE

    case "clear":
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log("Clearing data...");
      // --------> WRITE YOUR CODE BELOW
      studentManagementSystem.clearStudents();
      console.log("All students removed.");
      break;

    // --------> WRITE YOUR CODE ABOVE

    case "q":
      console.log("Exiting...");
      rl.close();
      break;

    default:
      console.log('Unknown command. Type "help" for a list of commands.');
      break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log("Welcome to the Student Management System!");
main();
rl.on("line", async (input) => {
  if (input.trim().toLowerCase() === "help") {
    main();
  } else {
    await handleCommand(input);
  }
});
rl.on("close", () => {
  console.log("Goodbye!");
});
