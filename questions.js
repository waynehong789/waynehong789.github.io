// Sample questions aligned with the weekly schedule and ASAT-style topics.
// Expand this file with more questions later.

const QUESTIONS = {
  // Monday & Friday - Reading focus
  reading_cloze: [
    {
      id: "r_cloze_1",
      type: "reading",
      subtype: "cloze",
      question: "Choose the best word to complete the sentence:\n\nThe explorer was known for his ________ courage in the face of danger.",
      options: ["timid", "remarkable", "ordinary", "careless"],
      answer: 1,
      explanation: "\"Remarkable\" means unusual or impressive, which fits the context of courage."
    },
    {
      id: "r_cloze_2",
      type: "reading",
      subtype: "cloze",
      question: "Choose the best word:\n\nShe had a ________ habit of checking the door three times before leaving.",
      options: ["rare", "persistent", "sudden", "broken"],
      answer: 1,
      explanation: "\"Persistent\" means continuing firmly, which describes a repeated habit."
    }
  ],

  reading_details: [
    {
      id: "r_detail_1",
      type: "reading",
      subtype: "details",
      question: "Read the short text and answer:\n\n\"Tom arrived at the station twenty minutes early. He bought a newspaper and sat on a bench near platform 3. The train was delayed by fifteen minutes.\"\n\nWhere did Tom sit?",
      options: ["Near platform 1", "Near platform 3", "In the waiting room", "At the ticket office"],
      answer: 1,
      explanation: "The text clearly states he sat on a bench near platform 3."
    }
  ],

  reading_implied: [
    {
      id: "r_implied_1",
      type: "reading",
      subtype: "implied",
      question: "Read the text:\n\n\"Maya looked at the dark clouds and put her umbrella in her bag before leaving the house.\"\n\nWhat can we infer?",
      options: [
        "Maya likes collecting umbrellas",
        "Maya expects it might rain",
        "Maya is going to the beach",
        "Maya forgot her coat"
      ],
      answer: 1,
      explanation: "Putting an umbrella in her bag after seeing dark clouds suggests she thinks it may rain."
    }
  ],

  // Tuesday & Thursday - Math
  math_algebra: [
    {
      id: "m_alg_1",
      type: "math",
      subtype: "algebra",
      question: "What is the value of x?\n\n3x + 7 = 22",
      options: ["3", "5", "7", "15"],
      answer: 1,
      explanation: "3x = 22 - 7 = 15 → x = 5"
    },
    {
      id: "m_alg_2",
      type: "math",
      subtype: "algebra",
      question: "If 5a – 4 = 16, what is a?",
      options: ["2", "3", "4", "5"],
      answer: 2,
      explanation: "5a = 20 → a = 4"
    }
  ],

  math_geometry: [
    {
      id: "m_geo_1",
      type: "math",
      subtype: "geometry",
      question: "A rectangle has a length of 12 cm and a width of 5 cm. What is its perimeter?",
      options: ["17 cm", "34 cm", "60 cm", "30 cm"],
      answer: 1,
      explanation: "Perimeter = 2 × (length + width) = 2 × (12 + 5) = 34 cm"
    },
    {
      id: "m_geo_2",
      type: "math",
      subtype: "geometry",
      question: "A square has a side length of 6 cm. What is its area?",
      options: ["12 cm²", "24 cm²", "36 cm²", "48 cm²"],
      answer: 2,
      explanation: "Area of square = side × side = 6 × 6 = 36 cm²"
    }
  ],

  math_word: [
    {
      id: "m_word_1",
      type: "math",
      subtype: "word",
      question: "Sam has 48 marbles. He gives one-third of them to his sister. How many marbles does he have left?",
      options: ["16", "24", "32", "36"],
      answer: 2,
      explanation: "One-third of 48 = 16. 48 – 16 = 32"
    }
  ],

  // Wednesday - Thinking Skills
  thinking_similarity: [
    {
      id: "t_sim_1",
      type: "thinking",
      subtype: "similarity",
      question: "Which pair is most similar in relationship?\n\nBook is to Reading as Fork is to ________",
      options: ["Kitchen", "Eating", "Metal", "Spoon"],
      answer: 1,
      explanation: "A book is used for reading; a fork is used for eating."
    }
  ],

  thinking_errors: [
    {
      id: "t_err_1",
      type: "thinking",
      subtype: "errors",
      question: "Find the best description of the mistake in this argument:\n\n\"All birds can fly. Penguins are birds. Therefore penguins can fly.\"",
      options: [
        "The first sentence is too absolute",
        "Penguins are not birds",
        "The conclusion is about the wrong animal",
        "There is no mistake"
      ],
      answer: 0,
      explanation: "The statement \"All birds can fly\" is incorrect because some birds (like penguins) cannot fly."
    }
  ]
};

// Weekly schedule definition (matches the checklist)
const WEEKLY_SCHEDULE = {
  0: { // Sunday
    name: "Sunday",
    time: "7:20 – 8:20",
    focus: "Writing + Review",
    tasks: [
      { id: "sun_writing", title: "Write one Writing piece", type: "writing", duration: "30 min" },
      { id: "sun_review", title: "Review this week’s error book", type: "review", duration: "20–30 min" }
    ]
  },
  1: { // Monday
    name: "Monday",
    time: "4:20 – 5:10",
    focus: "Reading Focus",
    tasks: [
      { id: "mon_cloze", title: "Cloze questions (vocabulary & fixed expressions)", type: "reading_cloze", duration: "25 min" },
      { id: "mon_details", title: "Four Short Extracts / finding details", type: "reading_details", duration: "25 min" }
    ]
  },
  2: { // Tuesday
    name: "Tuesday",
    time: "4:20 – 5:05",
    focus: "Math Focus",
    tasks: [
      { id: "tue_algebra", title: "Algebra – Determining Unknowns", type: "math_algebra", duration: "25 min" },
      { id: "tue_geometry", title: "Geometry (Perimeter, Area, Volume, Symmetry)", type: "math_geometry", duration: "20 min" }
    ]
  },
  3: { // Wednesday
    name: "Wednesday",
    time: "7:20 – 8:20",
    focus: "Reading + Thinking Skills",
    tasks: [
      { id: "wed_implied", title: "Poem (Implied meaning) + Summary Phrases", type: "reading_implied", duration: "30 min" },
      { id: "wed_similarity", title: "Thinking Skills: Identifying Similarity", type: "thinking_similarity", duration: "15 min" },
      { id: "wed_errors", title: "Thinking Skills: Detecting Reasoning Errors", type: "thinking_errors", duration: "15 min" }
    ]
  },
  4: { // Thursday
    name: "Thursday",
    time: "4:20 – 5:05",
    focus: "Math Focus",
    tasks: [
      { id: "thu_word", title: "Word problems / application questions", type: "math_word", duration: "25 min" },
      { id: "thu_review", title: "Re-do this week’s Math mistakes", type: "review", duration: "20 min" }
    ]
  },
  5: { // Friday
    name: "Friday",
    time: "4:20 – 5:10",
    focus: "Reading Focus",
    tasks: [
      { id: "fri_mixed", title: "Mixed Reading practice (all question types)", type: "reading_cloze", duration: "50 min" }
    ]
  },
  6: { // Saturday
    name: "Saturday",
    time: "4:30 – 6:00",
    focus: "Full Section Practice",
    tasks: [
      { id: "sat_section", title: "Complete one full Reading or Math section (timed)", type: "reading_cloze", duration: "60–70 min" },
      { id: "sat_analyse", title: "Check answers and analyse mistakes", type: "review", duration: "15–20 min" }
    ]
  }
};
