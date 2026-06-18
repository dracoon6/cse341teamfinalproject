require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./db/course");
const Instructor = require("./db/instructor");
const Department = require("./db/department");
const User = require("./db/user");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "finalproj" });
    console.log("Connected to DB for seeding...");

    // Clear existing data
    await Course.deleteMany({});
    await Instructor.deleteMany({});
    await Department.deleteMany({});
    await User.deleteMany({});

    // Seed Departments
    const departments = await Department.insertMany([
      {
        name: "Department of Computer Science & Engineering",
        code: "CSE",
        officePhone: "(801) 123-4567",
        budgetCode: "CSE-2024-001",
      },
      {
        name: "Department of Web Design & Development",
        code: "WDD",
        officePhone: "(801) 123-4568",
        budgetCode: "WDD-2024-001",
      },
    ]);

    // Seed Instructors
    const instructors = await Instructor.insertMany([
      {
        firstName: "Nathan",
        lastName: "Birch",
        email: "birchn@byui.edu",
        officeLocation: "STC 320",
        highestDegree: "Masters",
      },
      {
        firstName: "Daniel",
        lastName: "Anyora",
        email: "anyorad@byui.edu",
        officeLocation: "STC 322",
        highestDegree: "PhD",
      },
      {
        firstName: "John",
        lastName: "Doe",
        email: "doej@byui.edu",
        officeLocation: "STC 101",
        highestDegree: "PhD",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "smithj@byui.edu",
        officeLocation: "STC 102",
        highestDegree: "Masters",
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "johnsona@byui.edu",
        officeLocation: "STC 103",
        highestDegree: "PhD",
      },
      {
        firstName: "Bob",
        lastName: "Brown",
        email: "brownb@byui.edu",
        officeLocation: "STC 104",
        highestDegree: "Masters",
      },
      {
        firstName: "Charlie",
        lastName: "Davis",
        email: "davisc@byui.edu",
        officeLocation: "STC 105",
        highestDegree: "PhD",
      },
      {
        firstName: "Diana",
        lastName: "Evans",
        email: "evansd@byui.edu",
        officeLocation: "STC 106",
        highestDegree: "Masters",
      },
      {
        firstName: "Edward",
        lastName: "Frank",
        email: "franke@byui.edu",
        officeLocation: "STC 107",
        highestDegree: "PhD",
      },
      {
        firstName: "Fiona",
        lastName: "Green",
        email: "greenf@byui.edu",
        officeLocation: "STC 108",
        highestDegree: "Masters",
      },
    ]);

    // Seed Courses
    await Course.insertMany([
      {
        courseCode: "CSE341",
        title: "Web Backend Development II",
        description:
          "Learn to build robust backend APIs using Node.js and MongoDB.",
        credits: 3,
        departmentId: departments[0]._id,
        instructorId: instructors[0]._id,
        syllabusUrl: "http://example.com/cse341",
      },
      {
        courseCode: "CSE121B",
        title: "JavaScript Language",
        description: "Introduction to JavaScript programming.",
        credits: 2,
        departmentId: departments[0]._id,
        instructorId: instructors[1]._id,
        syllabusUrl: "http://example.com/cse121b",
      },
      {
        courseCode: "CSE210",
        title: "Programming with Classes",
        description: "Object-oriented programming concepts.",
        credits: 2,
        departmentId: departments[0]._id,
        instructorId: instructors[2]._id,
        syllabusUrl: "http://example.com/cse210",
      },
      {
        courseCode: "CSE111",
        title: "Programming with Functions",
        description: "Functional programming basics.",
        credits: 2,
        departmentId: departments[0]._id,
        instructorId: instructors[3]._id,
        syllabusUrl: "http://example.com/cse111",
      },
      {
        courseCode: "WDD130",
        title: "Web Fundamentals",
        description: "HTML and CSS basics.",
        credits: 2,
        departmentId: departments[1]._id,
        instructorId: instructors[4]._id,
        syllabusUrl: "http://example.com/wdd130",
      },
      {
        courseCode: "WDD230",
        title: "Web Frontend Development",
        description: "Client-side web development.",
        credits: 3,
        departmentId: departments[1]._id,
        instructorId: instructors[5]._id,
        syllabusUrl: "http://example.com/wdd230",
      },
      {
        courseCode: "WDD330",
        title: "Web Frontend Development II",
        description: "Advanced client-side techniques.",
        credits: 3,
        departmentId: departments[1]._id,
        instructorId: instructors[6]._id,
        syllabusUrl: "http://example.com/wdd330",
      },
      {
        courseCode: "CSE450",
        title: "Machine Learning",
        description: "Introduction to AI and ML.",
        credits: 3,
        departmentId: departments[0]._id,
        instructorId: instructors[7]._id,
        syllabusUrl: "http://example.com/cse450",
      },
      {
        courseCode: "CSE230",
        title: "Computer Organization",
        description: "Architecture and assembly.",
        credits: 3,
        departmentId: departments[0]._id,
        instructorId: instructors[8]._id,
        syllabusUrl: "http://example.com/cse230",
      },
      {
        courseCode: "CSE310",
        title: "Applied Programming",
        description: "Solving problems with software.",
        credits: 3,
        departmentId: departments[0]._id,
        instructorId: instructors[9]._id,
        syllabusUrl: "http://example.com/cse310",
      },
    ]);

    // Seed Users
    await User.insertMany([
      {
        githubId: "86674590",
        username: "dracoon6",
        email: "daniel@example.com",
        displayName: "Daniel Koepke",
        role: "Administrator",
      },
      {
        githubId: "193935382",
        username: "Elias-cdv",
        email: "elias@example.com",
        displayName: "Elias Octavio Cabeza de Vaca Lopez",
        role: "Administrator",
      },
      {
        githubId: "12345678",
        username: "student1",
        email: "student1@example.com",
        displayName: "Student One",
        role: "Viewer",
      },
      {
        githubId: "87654321",
        username: "student2",
        email: "student2@example.com",
        displayName: "Student Two",
        role: "Viewer",
      },
    ]);

    console.log("Database seeded successfully!");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedData();
