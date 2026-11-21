---
name: ronald-question-generation
description: Generate, independently solve, review, and publish original NSW Selective High School practice questions for Ronald's website. MUST follow for every new or edited Maths, Thinking Skills, Reading, or Writing item.
---

# Mandatory question-generation and independent review skill

**Non-negotiable:** Run this workflow **every time** a question is created, regenerated, edited, imported, or an answer key / explanation is changed. Do not publish, append to live JSON, or label an item `verified` before review passes. A valid JSON shape does **not** mean the mathematics or reasoning is correct.

## Workflow (in order)

1. **Plan**: Choose subject, age range, skill tag, difficulty, format and intended answer count from official-style requirements; avoid copying actual NSW material.
2. **Draft**: Write an original standalone item (or a linked Reading passage and its items), all options, proposed key and detailed explanation. Keep draft out of the approved bank.
3. **Independently solve from scratch**: Ignore the proposed key. For Maths, compute the exact result from the displayed question; check units, rounding, boundary cases and all arithmetic (use a separate calculation/program where possible). For Thinking Skills, enumerate or logically derive all permitted cases and ensure the premises force the answer. For Reading, quote/identify specific evidence in the *supplied* passage. Recheck every dependent item if a passage or group instruction changes. For Writing, confirm the prompt is unambiguous, age-appropriate, open-ended and assessable without a supposed single correct response.
4. **Check every choice**: Compare **every** A–E Maths choice or A–D Thinking choice with the independently derived solution; confirm exactly one choice satisfies the complete stem. For Reading check each choice and any linked multi-part constraints; test alternative plausible interpretations. Eliminate duplicates, synonyms or mathematically equivalent choices. If the key disagrees with the independent solution, **rewrite/correct the key**; never change the reasoning to justify a wrong key.
5. **Review explanations**: Work forward from the exact final question; verify each calculation and inference; ensure the explanation supports the same option index (zero-based in JSON) and there is no hidden information or contradictory wording. Re-solve if numbers or choices change at any point.
6. **Quality checks**: Assess selective-style difficulty, curriculum fit, plausible distractors, clear units, spelling, age appropriateness, unique question IDs, duplicate/rephrased questions, layout/alt text and copyright. Include skill tag and source.
7. **Record review evidence**: Have a reviewer independently check the item and record `qualityReview` (example below). `independentSolution` must explain the actual derivation, not just say 'checked'. Only mark `approved` after resolving every issue. If no independent reviewer is available, use `pending_review` and **do not publish**.
8. **Run release validator**: Run `python3 scripts/validate_question_bank.py` from repository root. It must succeed before deploying. Treat failure as a blocker, not a warning.
9. **Publish and test**: Commit only approved items; manually sample the browser to confirm the right options, marking and explanations. For linked Reading, preserve complete groups and counts.

## Review record (required on each NEW or MODIFIED item)

```json
"qualityReview": {
  "status": "approved",
  "reviewedBy": "Reviewer name or identifier",
  "reviewedAt": "2026-11-22",
  "independentSolution": "Show the independent calculation, logic derivation, or passage evidence in enough detail to check the result.",
  "allOptionsChecked": true,
  "explanationChecked": true,
  "ambiguityChecked": true,
  "contentHash": "<64-char SHA256 from the validator>"
}
```

For Reading, record a separate `qualityReview` on the **group object** whenever a passage, title, group kind or other shared context changes. The group `contentHash` is a SHA256 of the group excluding `items` and `qualityReview`; separately review all affected answers.

`contentHash` binds the approval to the **exact question content**. It must be recalculated after any change and the review repeated; do not copy a previous approval or fabricate a reviewer. The validator prints the expected hash for new/unapproved items; this is a technical guard, not a substitute for solving.

## Additional subject checks

- **Maths:** 5 distinct choices; exact answer and units independently calculated; no two equivalent options; worked solution and chosen index match.
- **Thinking Skills:** 4 distinct choices; every rule/case analysed; one forced, not merely likely, answer; no unstated assumptions.
- **Reading:** evidence in passage; each answer part checked; linked group stays intact; cloze and matching answers evaluated in context; avoid multiple defensible interpretations.
- **Writing:** prompt and formative rubric checked, not objectively keyed; no invented standardised mark.

## Known failure that motivated this gate

In Personalised Maths Revision #1, Question 6 described fractions near 1/2. The explanation correctly identified **7/13** (difference 1/26), but the stored answer index pointed to **11/24** (difference 1/24). The correct zero-based index is `2`. This type of key-versus-solution mismatch **must** be caught before release.

## Existing questions

The baseline file in `scripts/legacy_question_baseline.json` is an inventory of old content **only**. It does **not** certify those questions. The validation script requires independent review on any newly created or edited question; existing questions remain labeled as legacy/potentially unverified until individually reviewed. Do not extend the baseline to bypass review of new items.
