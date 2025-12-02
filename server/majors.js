
const majors = [
  {
    id: 'cs-bs',
    name: 'B.S. Computer Science',
    description: 'Simplified CS major with 5 example classes.',
    totalCredits: 15,
    requiredCourses: [
      { code: 'CS 101', name: 'Intro to Programming', credits: 3, suggestedTerm: 'Fall 1' },
      { code: 'CS 102', name: 'Data Structures', credits: 3, suggestedTerm: 'Spring 1' },
      { code: 'CS 201', name: 'Algorithms', credits: 3, suggestedTerm: 'Fall 2' },
      { code: 'CS 210', name: 'Computer Systems', credits: 3, suggestedTerm: 'Spring 2' },
      { code: 'CS 300', name: 'Software Engineering', credits: 3, suggestedTerm: 'Fall 3' },
    ],
  },
  {
    id: 'it-bs',
    name: 'B.S. Information Technology',
    description: 'Simplified IT major with 5 example classes.',
    totalCredits: 15,
    requiredCourses: [
      { code: 'IT 101', name: 'Intro to IT', credits: 3, suggestedTerm: 'Fall 1' },
      { code: 'IT 120', name: 'Networking Fundamentals', credits: 3, suggestedTerm: 'Spring 1' },
      { code: 'IT 150', name: 'Web Development', credits: 3, suggestedTerm: 'Fall 2' },
      { code: 'IT 210', name: 'Databases', credits: 3, suggestedTerm: 'Spring 2' },
      { code: 'IT 250', name: 'Cloud & DevOps Basics', credits: 3, suggestedTerm: 'Fall 3' },
    ],
  },
];

module.exports = majors;
