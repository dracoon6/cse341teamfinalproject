require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./db/Course');
const Instructor = require('./db/Instructor');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'finalproj' });
    console.log('Connected to DB for seeding...');

    // Clear existing data
    await Course.deleteMany({});
    await Instructor.deleteMany({});

    // Seed Instructors
    const instructors = await Instructor.insertMany([
      {
        firstName: 'Nathan',
        lastName: 'Birch',
        email: 'birchn@byui.edu',
        officeLocation: 'STC 320',
        highestDegree: 'Masters'
      },
      {
        firstName: 'Daniel',
        lastName: 'Anyora',
        email: 'anyorad@byui.edu',
        officeLocation: 'STC 322',
        highestDegree: 'PhD'
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'doej@byui.edu',
        officeLocation: 'STC 101',
        highestDegree: 'PhD'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'smithj@byui.edu',
        officeLocation: 'STC 102',
        highestDegree: 'Masters'
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'johnsona@byui.edu',
        officeLocation: 'STC 103',
        highestDegree: 'PhD'
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'brownb@byui.edu',
        officeLocation: 'STC 104',
        highestDegree: 'Masters'
      },
      {
        firstName: 'Charlie',
        lastName: 'Davis',
        email: 'davisc@byui.edu',
        officeLocation: 'STC 105',
        highestDegree: 'PhD'
      },
      {
        firstName: 'Diana',
        lastName: 'Evans',
        email: 'evansd@byui.edu',
        officeLocation: 'STC 106',
        highestDegree: 'Masters'
      },
      {
        firstName: 'Edward',
        lastName: 'Frank',
        email: 'franke@byui.edu',
        officeLocation: 'STC 107',
        highestDegree: 'PhD'
      },
      {
        firstName: 'Fiona',
        lastName: 'Green',
        email: 'greenf@byui.edu',
        officeLocation: 'STC 108',
        highestDegree: 'Masters'
      }
    ]);

    // Seed Courses
    await Course.insertMany([
      {
        courseCode: 'CSE341',
        title: 'Web Backend Development II',
        description: 'Learn to build robust backend APIs using Node.js and MongoDB.',
        credits: 3,
        departmentId: 'CSE',
        instructorId: instructors[0]._id,
        syllabusUrl: 'http://example.com/cse341'
      },
      {
        courseCode: 'CSE121B',
        title: 'JavaScript Language',
        description: 'Introduction to JavaScript programming.',
        credits: 2,
        departmentId: 'CSE',
        instructorId: instructors[1]._id,
        syllabusUrl: 'http://example.com/cse121b'
      },
      {
        courseCode: 'CSE210',
        title: 'Programming with Classes',
        description: 'Object-oriented programming concepts.',
        credits: 2,
        departmentId: 'CSE',
        instructorId: instructors[2]._id,
        syllabusUrl: 'http://example.com/cse210'
      },
      {
        courseCode: 'CSE111',
        title: 'Programming with Functions',
        description: 'Functional programming basics.',
        credits: 2,
        departmentId: 'CSE',
        instructorId: instructors[3]._id,
        syllabusUrl: 'http://example.com/cse111'
      },
      {
        courseCode: 'WDD130',
        title: 'Web Fundamentals',
        description: 'HTML and CSS basics.',
        credits: 2,
        departmentId: 'WDD',
        instructorId: instructors[4]._id,
        syllabusUrl: 'http://example.com/wdd130'
      },
      {
        courseCode: 'WDD230',
        title: 'Web Frontend Development',
        description: 'Client-side web development.',
        credits: 3,
        departmentId: 'WDD',
        instructorId: instructors[5]._id,
        syllabusUrl: 'http://example.com/wdd230'
      },
      {
        courseCode: 'WDD330',
        title: 'Web Frontend Development II',
        description: 'Advanced client-side techniques.',
        credits: 3,
        departmentId: 'WDD',
        instructorId: instructors[6]._id,
        syllabusUrl: 'http://example.com/wdd330'
      },
      {
        courseCode: 'CSE450',
        title: 'Machine Learning',
        description: 'Introduction to AI and ML.',
        credits: 3,
        departmentId: 'CSE',
        instructorId: instructors[7]._id,
        syllabusUrl: 'http://example.com/cse450'
      },
      {
        courseCode: 'CSE230',
        title: 'Computer Organization',
        description: 'Architecture and assembly.',
        credits: 3,
        departmentId: 'CSE',
        instructorId: instructors[8]._id,
        syllabusUrl: 'http://example.com/cse230'
      },
      {
        courseCode: 'CSE310',
        title: 'Applied Programming',
        description: 'Solving problems with software.',
        credits: 3,
        departmentId: 'CSE',
        instructorId: instructors[9]._id,
        syllabusUrl: 'http://example.com/cse310'
      }
    ]);

    console.log('Database seeded successfully!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedData();