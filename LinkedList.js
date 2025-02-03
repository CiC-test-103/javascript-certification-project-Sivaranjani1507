// Necessary Imports (you will need to use this)
const { Student } = require("./Student");

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data; // Student
  next; // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head; // Object
  tail; // Object
  length; // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO

    const newNode = new Node(newStudent);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    if (!this.head) {
      console.log("The list is empty");
      return;
    }
    if (this.head.data.getEmail() === email) {
      this.head = this.head.next;
      this.length--;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data.getEmail() === email) {
        current.next = current.next.next;
        if (!current.next) {
          this.tail = current;
        }
        this.length--;
        return;
      }
      current = current.next;
    }
    console.log("Student not found");
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current = this.head;
    while (current) {
      if (current.data.getEmail() === email) {
        return current.data;
      }
      current = current.next;
    }
    return -1;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = null;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    let current = this.head;
    let studentsString = "";
    while (current) {
      studentsString += current.data.getName();
      if (current.next) {
        studentsString += ", ";
      }
      current = current.next;
    }
    return studentsString;
  }

  #sortStudentsByName() {
    let current = this.head;
    let sorted = [];

    while (current) {
      sorted.push(current.data);
      current = current.next;
    }

    sorted.sort((a, b) => a.name().localecompare(b.name()));

    return sorted;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    let current = this.head;
    let filteredStudentsBySpecialization = [];

    while (current) {
      if (current.data.getSpecialization() === specialization) {
        filteredStudentsBySpecialization.push(current.data);
      }
      current = current.next;
    }

    filteredStudentsBySpecialization.sort((a,b) => a.getName()-b.getName());

    return filteredStudentsBySpecialization;
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO

    let current = this.head;
    let filteredStudentsByMinYear = [];

    while (current) {
      if (current.data.getYear() >= minYear) {
        filteredStudentsByMinYear.push(current.data.getName());
      }

      current = current.next;
    }

    filteredStudentsByMinYear.sort();

    return filteredStudentsByMinYear;
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */

  async saveToJson(fileName) {
    // TODO
    const fs = require("fs/promises");

    let studentArray = [];
    let current = this.head;

    while (current) {
      studentArray.push({
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization(),
      });

      current = current.next;
    }
    await fs.writeFile(fileName, JSON.stringify(studentArray, null, 2));
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    //   // TODO
    const fs = require("fs/promises");

    const data = await fs.readFile(fileName, "utf8");

    let studentArray = JSON.parse(data);

    this.clearStudents();

    studentArray.forEach((studentData) => {
      let student = new Student(
        studentData.name,
        studentData.year,
        studentData.email,
        studentData.specialization
      );
      this.addStudent(student);
    });
  }
}

module.exports = { LinkedList };
