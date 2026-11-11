# Ronald's NSW Selective Practice — upgraded static website

## Run / publish

This project is ready for GitHub Pages. Copy the files and `data/` directory to the root of your `waynehong789.github.io` repository; commit and push. The home page is `index.html`.

Local preview (required for `fetch()` JSON):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Opening the HTML with `file://` will generally **not** load JSON because of browser restrictions.

## Implemented

- Existing dashboard and subjects retained as links, refreshed with a unified responsive visual style.
- 35-question Maths / 40-minute full section with five A–E choices.
- 40-question Thinking Skills / 40-minute full section with four A–D choices.
- Reading starter player with passage tabs, grouped data schema and dropdown support.
- Writing page: 30-minute countdown, local autosave, word count, three original prompts, self-assessment checklist.
- Daily shorter selections (deterministic by Sydney date), flags, navigation, autosave, absolute persisted deadline and auto-submit on expiry.
- Results / answer review, completion history, subject aggregate and CSV export.
- All dynamic student text rendered as text, not executable HTML.

## Important limits — must address before claiming full exam fidelity

1. **Reading content:** supplied website has 17 answer parts, NOT the official-style 17 groups / 38 answer parts. `data/reading-groups.json` supports group/item structure but the question bank needs more *independently checked* original material. Do not label this starter set a full-format NSW reading paper.
2. **Question quality:** initial supplied questions have not all been independently verified. Maths question 9 and 15 had wrong answer indices and were corrected; Thinking Skills questions 23 and 40 originally had correct index E and have been remapped into A–D, but require human review for ambiguity. Do not infer that remaining questions are fully reliable.
3. **Fresh questions:** a static website cannot safely or reliably generate and verify unlimited daily new questions without an approved expanding bank or backend. Daily mode uses deterministic rotation from the available sample items. Add `version`, skills and reviewer approval before scaling.
4. **Static answer security:** sample answer keys in downloadable JSON are discoverable by visitors. For secure tests, host answer keys and marking on a server.
5. **No cross-device sync:** localStorage saves on one device only. A backend and privacy-first accounts would be needed for sync.
6. **Visual questions:** the previous embedded SVG snippets were not migrated because they were not independently checked for safe, accurate rendering. Use reviewed, accessible diagrams/images from your own content files in a future content pass.
7. **Writing feedback:** no automated writing assessment is claimed; self-review only.

## File structure

- `index.html`, `dashboard.js`: daily hub and history
- `exam.css`, `exam.js`: shared subject player
- `math-test.html`, `thinking-test.html`, `reading-test.html`: subject views
- `writing-test.html`, `writing.js`: writing editor
- `data/*.json`: current sample content (separate from page logic)
- `CONTENT_REQUIREMENTS.md`: validator constraints and next content milestones

## Test plan

- Test on Chromium/Firefox, desktop/mobile; use keyboard navigation.
- Start timed section, answer and flag; refresh and ensure timer/answers persist.
- Set timer nearly expired in a local copy; verify auto-submit and saved history.
- Open Reading and switch extract tabs without losing an answer.
- Use writing autosave; refresh and confirm retained text/clock.
- Export CSV and verify values.
- Add a second full-format Reading fixture to check 17 groups/38 slots after content approval.


## Reading complete-paper update (November 2026)

The Reading section now includes **17 question groups, 38 scored answer slots and three 8-part groups** in `data/reading-groups.json`. Full mode provides a 45-minute section, while daily mode contains four standalone answers and one entire linked 8-part group (12 answers, 15 minutes). The three linked groups cover cloze, paragraph-heading matching and cross-extract matching, and each has an answer key and explanatory rationale. Question navigation counts answer parts rather than groups; group/part labels are shown on the player. Passages are shared within groups, and all answer selections are individually stored and marked. These are original practice questions, not official NSW questions; the set should undergo independent educational review before high-stakes use.

## New content update (11 November 2026)

Added 25 original Maths questions, 25 original Thinking Skills questions and 12 Reading answer parts across 5 groups (4 single-answer groups and one eight-answer matching group). Total bank: Maths 60, Thinking 65, Reading 22 groups / 50 answer parts.

The player now chooses 35 Maths or 40 Thinking questions from the larger bank for a timed full section. Reading chooses 14 standalone groups and three complete eight-answer groups, yielding precisely 17 groups / 38 answer parts. Daily practice draws 12 Maths, 15 Thinking, or four standalone Reading groups plus one eight-answer group (12 answer parts). Reading groups never split. The selection changes by Sydney date, not on every click.

New question IDs are `MNEW-*`, `TNEW-*`, `RN*`. Existing IDs and progress-history format are preserved. New sessions are namespaced `_expandedbank_v3` so a previously saved 38-answer session cannot conflict with changed content selection. Prior completed history remains available. New items have editorially checked explanations, but they have not undergone independent professional item validation or live browser usability testing. Earlier sample items still include unverified answer keys. These are original practice items, not official NSW papers.


## November 2026 full-paper refresh

- Mathematical Reasoning full mode uses 35 original `MFULL26-###` questions (40 minutes, five answers per question).
- Thinking Skills full mode uses 40 original `TFULL26-###` questions (40 minutes, four answers per question).
- Each full mode is a consistent paper, not a random mix of older unverified questions. The full paper can be retaken; it does not automatically create another new paper.
- Daily practice continues using the previous question pools.
- Older progress history is retained; unfinished sessions use a versioned key to avoid mismatched question lists.
- Content is independent practice, not official NSW test material. Worked explanations have been checked during authoring, but an independent teacher review is still advisable.
