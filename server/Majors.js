
const majors = [
  {
    id: 'cs-bs',
    name: 'B.S. Computer Science',
    description: 'Simplified CS major with 6 example classes.',
    totalCredits: 24,
    requiredCourses: [
      { code: 'CS 101', name: 'Intro to Programming', credits: 4, suggestedTerm: 'Fall 1' },
      { code: 'CS 102', name: 'Data Structures', credits: 4, suggestedTerm: 'Spring 1' },
      { code: 'CS 201', name: 'Algorithms', credits: 4, suggestedTerm: 'Fall 1' },
      { code: 'CS 210', name: 'Computer Systems', credits: 4, suggestedTerm: 'Spring 1' },
      { code: 'CS 300', name: 'Software Engineering', credits: 4, suggestedTerm: 'Fall 1' },
      { code: 'CS 302', name: 'AI Development', credits: 4, suggestedTerm: 'Spring 1' },
    ],
  },
  {
    id: 'it-bs',
    name: 'B.S. Information Technology',
    description: 'Simplified IT major with 6 example classes.',
    totalCredits: 24,
    requiredCourses: [
      { code: 'IT 101', name: 'Intro to IT', credits: 4, suggestedTerm: 'Fall 1' },
      { code: 'IT 120', name: 'Networking Fundamentals', credits: 4, suggestedTerm: 'Spring 1' },
      { code: 'IT 150', name: 'Web Development', credits: 4, suggestedTerm: 'Fall 1' },
      { code: 'IT 210', name: 'Databases', credits: 4, suggestedTerm: 'Spring 1' },
      { code: 'IT 250', name: 'Cloud & DevOps Basics', credits: 4, suggestedTerm: 'Fall 1' },
      { code: 'IT 267', name: 'Is Comp Sci Better', credits: 4, suggestedTerm: 'Spring 1' },
    ],
  },
];

module.exports = majors;
