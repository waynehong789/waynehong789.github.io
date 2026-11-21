# Question bank requirements and release gates

The site now accepts student-facing original questions in `data/`. The current question bank is **starter/demo quality** pending individual solution review.

| Section | Official format | Current bank | Remaining work |
|---|---|---|---|
| Maths | 35 responses, 5 options, 40 min | 95 questions plus 15 revision questions | Independently verify item correctness; add reviewed visual/stimulus types |
| Thinking Skills | 40 responses, 4 options, 40 min | 105 questions | Independent logic checks; rewrite weak options and visual puzzles |
| Reading | 17 groups, 38 answer parts, 45 min | Bank: 22 groups / 50 parts; full test: 17 groups / 38 parts | Independently verify passages, multi-part answer keys and content coverage |
| Writing | 1 task, 30 min | Three original rotating prompts | Define parent/teacher marking workflow; add more varied prompts |

## JSON schema conventions

`data/math.json` and `data/thinking.json`: array of `{id, text, options, answer, skill, explanation, reviewStatus}`. `answer` is a **zero-based option index**. `options` must be length 5/4 respectively. Optional rendering schema for reviewed items can include `stimulus: {type:'table'|'chart'|'image', alt, ...}` (requires implementation).

`data/reading-groups.json`: array of `{id, title, kind, passages:[{label,text}], items:[{id, prompt, inputType, options, answer, skill, explanation}]}`. Each `items` element is a separate scored answer slot. The player flattens groups into answer slots. `inputType` currently supports `single_choice` and `dropdown`. Additional matching constraints can be represented as dropdowns with independently verified evidence.

For each full Reading paper, select **exactly 17 groups / 38 answer slots** without splitting linked groups; the full bank may contain more than 17 groups. A valid 3-multipart distribution is 12 + 8 + 4 parts and fourteen single-part groups = 38; only use this as an illustrative schema count, not a mandated topic structure.

## Content approval checks

- No copied test screenshots or copyrighted official questions in public JSON.
- Every answer option plausible and exactly one supported correct answer.
- Maths numeric answers computed independently, with full derivations.
- Thinking logic checked for contradictions and multiple valid answers.
- Reading claims supported by the attached passage, including factual evidence.
- Explanations cite reasoning, not just restate chosen option.
- Reviewer status `approved` with content version before a question is released to scored practice.
- Accessibility: each diagram has text description and useful alt text.


## MANDATORY review gate for all new or changed questions (November 2026)

Before generating, editing, importing or publishing any question, read `skills/SKILL.md` and complete **every** step (independent solution, every-choice ambiguity test, explanation/key consistency and documented reviewer approval). Run `python3 scripts/validate_question_bank.py` before release. The repository's GitHub Actions `question-review.yml` also runs the check on changes. New/modified questions without approved, content-hash-matched `qualityReview` evidence fail the check. The legacy inventory is **not** a certificate of correctness and must never be expanded to bypass review.

### Reading passage review protection

The release validator also fingerprints Reading group metadata and passage contents. A changed or new Reading group requires its own approved `qualityReview` record with the group hash, alongside reviewed items. Changes to shared passages can invalidate otherwise unchanged answer keys, so reviewers must re-evaluate every linked answer. The baseline hashes of existing groups are an inventory, not verification.
