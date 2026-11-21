# Website ZIP file inspection and simplification

## Layout

All skill-related Markdown files are together in `skills/` with **no nested skill folders**:

- `skills/SKILL.md` — required independent question verification procedure
- `skills/CONTENT_REQUIREMENTS.md` — subject and publication specifications

The remaining folders serve separate technical purposes: `data/` for browser-fetched question JSON, `scripts/` for release validation, and `.github/workflows/` for GitHub Actions (GitHub mandates this location). All HTML, CSS, browser JavaScript, README and historical update notes remain in the website root.

## Inspected contents

- Website pages: `index.html`, `math-test.html`, `thinking-test.html`, `reading-test.html`, `writing-test.html`.
- Frontend logic: `app.js`, `dashboard.js`, `exam.js`, `questions.js`, `writing.js`; styling: `style.css`, `exam.css`.
- Question banks: `math.json` (95), `thinking.json` (105), `math-revision-01.json` (15), `reading-groups.json` (22 groups / 50 parts), `writing-prompts.json` (3).
- `data/reading.json` (17 entries) is a legacy file and not loaded by `exam.js`; retained to avoid deleting historical content.
- Validator: `scripts/validate_question_bank.py` with `scripts/legacy_question_baseline.json`.
- Workflow: `.github/workflows/question-review.yml`, now listening for changes in all of `skills/**`.

## Findings and limitations

1. Existing question-bank items are recorded as **legacy**, not independently certified. The mandatory review applies to new and changed questions.
2. The validator checks structure, review records and content hashes; it does not mathematically prove the answers.
3. Reading group metadata and shared passages now have their own content fingerprints. New or edited groups require group-level review evidence, in addition to review of affected answer items.
4. Correct full test lengths are implemented in `exam.js`: Maths 35, Thinking 40, Reading 17 groups / 38 answers.
5. Historical documents had outdated bank-size figures; the active README and content requirements were corrected.

## Checks

- Python question-bank release validator: run `python3 scripts/validate_question_bank.py`.
- JavaScript parse checks: run `node --check` on each `.js` file.
- Verify ZIP paths and file extraction.
- Browser interactions and per-question semantic correctness require separate tests and review.
