#!/usr/bin/env python3
"""Release gate for new/changed Ronald practice questions.

Checks structure and review evidence. Human/independent reasoning review is still required:
this tool cannot prove a question is correct merely by validating JSON.
"""
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
BASELINE=json.loads((ROOT/'scripts/legacy_question_baseline.json').read_text())
BASE=BASELINE['items']
READING_GROUP_BASE=BASELINE.get('readingGroupHashes',{})
FILES={'data/math.json':'math','data/thinking.json':'thinking','data/math-revision-01.json':'math','data/reading-groups.json':'reading','data/writing-prompts.json':'writing'}

def content_hash(item):
    core={k:v for k,v in item.items() if k!='qualityReview'}
    raw=json.dumps(core,sort_keys=True,ensure_ascii=False,separators=(',',':'))
    return hashlib.sha256(raw.encode()).hexdigest()

def group_hash(group):
    """Includes shared reading passages and metadata; excludes items and review notes."""
    core={k:v for k,v in group.items() if k not in ('items','qualityReview')}
    raw=json.dumps(core,sort_keys=True,ensure_ascii=False,separators=(',',':'))
    return hashlib.sha256(raw.encode()).hexdigest()

def review_record(tag, review, expected, errors):
    if not isinstance(review,dict):
        errors.append(f'{tag}: NEW/CHANGED content missing qualityReview; expected contentHash={expected}')
        return False
    required=['status','reviewedBy','reviewedAt','independentSolution','allOptionsChecked','explanationChecked','ambiguityChecked','contentHash']
    for k in required:
        if k not in review: errors.append(f'{tag}: missing qualityReview.{k}')
    if review.get('status')!='approved': errors.append(f'{tag}: status must be approved, not {review.get("status")!r}')
    if len(str(review.get('reviewedBy','')).strip())<2: errors.append(f'{tag}: reviewer ID required')
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}',str(review.get('reviewedAt',''))): errors.append(f'{tag}: reviewedAt must be YYYY-MM-DD')
    if len(str(review.get('independentSolution','')).strip())<35: errors.append(f'{tag}: independentSolution must contain a substantive derivation')
    for k in ['allOptionsChecked','explanationChecked','ambiguityChecked']:
        if review.get(k) is not True: errors.append(f'{tag}: {k} must be true')
    if review.get('contentHash')!=expected: errors.append(f'{tag}: stale/wrong review hash; expected {expected}')
    return not any(e.startswith(tag+':') for e in errors)

def flatten(fname,data):
    if fname.endswith('reading-groups.json'):
        return [(str(g['id'])+'/'+str(q['id']),q) for g in data for q in g['items']]
    return [(str(q.get('id',i)),q) for i,q in enumerate(data)]

def main():
    errors=[]; pending=0; old=0; approved=0
    for fname,subject in FILES.items():
        try:
            data=json.loads((ROOT/fname).read_text())
            if not isinstance(data,list): raise ValueError('root must be array')
            rows=flatten(fname,data)
        except Exception as e:
            errors.append(f'{fname}: cannot load: {e}');continue
        if subject=='reading':
            seen_groups=set()
            for group in data:
                gid=str(group.get('id',''))
                tag=f'{fname}:GROUP:{gid}'
                if not gid or gid in seen_groups: errors.append(f'{tag}: missing or duplicated group ID')
                seen_groups.add(gid)
                expected=group_hash(group)
                if READING_GROUP_BASE.get(gid)!=expected:
                    pending+=1
                    if review_record(tag,group.get('qualityReview'),expected,errors): approved+=1
                else: old+=1
        ids=set()
        for ident,q in rows:
            tag=f'{fname}:{ident}'
            if ident in ids: errors.append(f'{tag}: duplicated ID')
            ids.add(ident)
            if subject in ('math','thinking','reading'):
                count=5 if subject=='math' else 4 if subject=='thinking' else None
                opts=q.get('options')
                if not isinstance(opts,list) or (count and len(opts)!=count) or len(opts or [])<2:
                    errors.append(f'{tag}: incorrect option count')
                else:
                    if len({str(x).strip().casefold() for x in opts}) != len(opts): errors.append(f'{tag}: repeated options')
                    if not isinstance(q.get('answer'),int) or not (0<=q['answer']<len(opts)):
                        errors.append(f'{tag}: invalid answer index')
                if not str(q.get('explanation','')).strip(): errors.append(f'{tag}: missing explanation')
            h=content_hash(q)
            if BASE.get(fname,{}).get(ident)==h:
                old+=1;continue
            pending+=1
            if review_record(tag,q.get('qualityReview'),h,errors): approved+=1
    print(f'Question quality gate: {old} unchanged legacy items, {approved} independently reviewed new/modified, {pending} new/modified total.')
    if errors:
        print(f'FAILED: {len(errors)} issues:')
        for e in errors: print(' - '+e)
        return 1
    print('PASS: structural and review-record gates. Semantic accuracy requires genuine independent reviewer verification.')
    return 0

if __name__=='__main__': sys.exit(main())
