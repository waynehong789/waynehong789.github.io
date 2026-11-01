# Ronald's Daily Practice App (v0.1)

A simple web app that follows the weekly Selective High School practice schedule.

## How to run

1. Open the folder in VS Code (or any editor)
2. Open `index.html` directly in a browser  
   **or** use a simple local server:

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node
npx serve .
```

Then visit http://localhost:8000

## Features in this version

- Automatically shows today's tasks based on the day of the week
- Sample questions for Reading, Math and Thinking Skills
- Instant feedback and explanations
- Progress tracking with localStorage (survives browser refresh)
- Checkbox to mark tasks complete
- Mobile-friendly layout

## Project structure

```
selective-practice-app/
├── index.html      # Main page
├── style.css       # Styles
├── app.js          # Application logic
├── questions.js    # Sample questions + weekly schedule
└── README.md
```

## Next steps you can take

1. Add more questions into `questions.js`
2. Add a real Writing timer / prompt page
3. Add user accounts later (optional)
4. Deploy to Vercel / Netlify for free so your son can open it on any device

## Notes

- All data is stored in the browser (localStorage). Clearing browser data will reset progress.
- Sample questions are short for demonstration. Replace them with real ASAT-style questions.
