/* Shared static-site player. Do not claim secure exam conditions: keys reside in publicly downloadable files. */
(()=>{'use strict';
const key='ronald_attempt_history_v2';const params=new URLSearchParams(location.search);const subject=document.body.dataset.subject;
const config={math:{name:'Mathematical Reasoning',minutes:40,source:'data/math.json',choices:5},thinking:{name:'Thinking Skills',minutes:40,source:'data/thinking.json',choices:4},reading:{name:'Reading',minutes:45,source:'data/reading-groups.json'}}[subject];
const $=id=>document.getElementById(id);const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Australia/Sydney',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const dateSeed=()=>{let x=0;for(const c of today()+subject)x=(x*31+c.charCodeAt(0))>>>0;return x;};
function randomize(a,seed){let b=a.slice(),x=seed||17;for(let i=b.length-1;i>0;i--){x^=x<<13;x^=x>>>17;x^=x<<5;let j=(x>>>0)%(i+1);[b[i],b[j]]=[b[j],b[i]]}return b}
function store(k,obj){try{localStorage.setItem(k,JSON.stringify(obj))}catch(e){$('save-state').textContent='Storage unavailable — progress may not survive refresh.'}}
function load(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch{return null}}
function flat(groups){return groups.flatMap(g=>g.items.map(it=>({...it,groupId:g.id,passages:g.passages,groupTitle:g.title}))) }
let bank=[],items=[],groups=[],state=null,tick=null,activeTab=0;
const mode=params.get('mode')==='daily'?'daily':'full';
const sessionKey='ronald_session_'+subject+'_'+mode+'_fullpaper_v4';
function initial(){
 const seed=dateSeed();
 if(mode==='full' && (subject==='math'||subject==='thinking')){
   const prefix=subject==='math'?'MFULL26-':'TFULL26-';
   const paper=bank.filter(q=>String(q.id).startsWith(prefix));
   if(paper.length!==(subject==='math'?35:40))throw Error('The current full paper is incomplete.');
   return paper;
 }
 if(subject==='reading'){
   // Always keep entire linked groups and choose 17 groups / 38 answers for full practice.
   const multi=groups.filter(g=>g.items.length>1),single=groups.filter(g=>g.items.length===1);
   const newSingles=single.filter(g=>String(g.id).startsWith('RN'));
   const olderSingles=single.filter(g=>!String(g.id).startsWith('RN'));
   const chosen=mode==='daily'
      ? [...randomize(newSingles,seed).slice(0,1),...randomize(olderSingles,seed).slice(0,3),randomize(multi,seed+19)[0]]
      : [...randomize(single,seed).slice(0,14),...randomize(multi,seed+19).slice(0,3)];
   const byId=new Map(bank.map(q=>[q.id,q]));
   return chosen.flatMap(g=>g.items.map(it=>byId.get(it.id)));
 }
 if(mode==='daily'){
    const newer=bank.filter(q=>String(q.id).includes('NEW-'));
    const older=bank.filter(q=>!String(q.id).includes('NEW-'));
    const newCount=subject==='math'?6:7;
    const oldCount=subject==='math'?6:8;
    return randomize([...randomize(newer,seed+17).slice(0,newCount),...randomize(older,seed).slice(0,oldCount)],seed+83);
 }
 return randomize(bank,seed).slice(0,subject==='math'?35:40);
}
function validate(a){for(const q of a){if(!Array.isArray(q.options)||q.options.length!==(config.choices||4)||!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options.length)throw Error('Invalid answer structure in '+q.id)}}
function readState(){let old=load(sessionKey);if(old?.status==='in_progress'&&old.mode===mode&&(mode!=='daily'||old.date===today())&&Array.isArray(old.itemIds)&&old.itemIds.length){let map=new Map(bank.map(q=>[String(q.id),q]));let restored=old.itemIds.map(id=>map.get(String(id)));if(restored.every(Boolean)){items=restored;state=old;return true}}return false}
function persist(){state.updatedAt=Date.now();store(sessionKey,state);$('save-state').textContent='Saved locally';}
function start(){items=initial();const mins=mode==='full'?config.minutes:Math.min(config.minutes,subject==='reading'?15:subject==='thinking'?20:18);state={version:2,subject,mode,date:today(),startedAt:Date.now(),endAt:Date.now()+mins*60000,minutes:mins,itemIds:items.map(q=>q.id),responses:{},flags:{},index:0,status:'in_progress'};activeTab=0;persist();render()}
function remaining(){return Math.max(0,Math.ceil((state.endAt-Date.now())/1000))}function format(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function clock(){if(!state||state.status!=='in_progress')return;const s=remaining();$('timer').textContent=format(s);$('timer').classList.toggle('urgent',s<=120);if(s===0)finish(true)}
function partAnswered(q){return Number.isInteger(state.responses[q.id])}function updateNav(){const holder=$('nav');holder.replaceChildren();items.forEach((q,i)=>{let b=document.createElement('button');b.type='button';b.textContent=String(i+1);b.title=q.groupTitle||'Question '+(i+1);b.className=[i===state.index?'current':'',partAnswered(q)?'answered':'',state.flags[q.id]?'flagged':''].join(' ');b.addEventListener('click',()=>jump(i));holder.append(b)});$('count').textContent=`Answered ${items.filter(partAnswered).length} / ${items.length} · Flagged ${Object.values(state.flags).filter(Boolean).length}`}
function jump(i){const old=items[state.index]?.groupId;state.index=i;if(subject==='reading'&&old!==items[i]?.groupId)activeTab=0;persist();renderQuestion()}
function selectResponse(value){const q=items[state.index];if(value===''||value===null)delete state.responses[q.id];else state.responses[q.id]=Number(value);persist();updateNav()}
function renderQuestion(){if(!state||state.status!=='in_progress')return;const q=items[state.index];$('number').textContent=`Answer ${state.index+1} of ${items.length}`+(q.groupTitle?' · '+q.groupTitle:'');$('prompt').textContent=q.prompt??q.text;$('flag').textContent=state.flags[q.id]?'Unflag question':'Flag for review';$('previous').disabled=state.index===0;$('next').disabled=state.index===items.length-1;
const passages=$('passages');const ptab=$('passage-tabs');passages.replaceChildren();ptab.replaceChildren();$('reading-panel').classList.toggle('hidden',subject!=='reading');if(subject==='reading'){
 const sameGroup=items.filter(x=>x.groupId===q.groupId);
 const groupIds=[...new Set(items.map(x=>x.groupId))];const groupNo=groupIds.indexOf(q.groupId)+1;
 const partNo=sameGroup.findIndex(x=>x.id===q.id)+1;
 $('number').textContent=`Group ${groupNo} of ${groupIds.length} · Answer ${state.index+1} of ${items.length}`+(sameGroup.length>1?` · Part ${partNo} of ${sameGroup.length}`:'');
 const currentPassages=q.passages||[];if(activeTab>=currentPassages.length)activeTab=0;
 currentPassages.forEach((p,i)=>{let b=document.createElement('button');b.className='btn';b.textContent=p.label;b.type='button';b.setAttribute('aria-selected',String(i===activeTab));b.onclick=()=>{activeTab=i;renderQuestion()};ptab.append(b)});const pg=currentPassages[activeTab];passages.textContent=pg?pg.text:'No passage provided';}
const choices=$('choices');choices.replaceChildren();if(['dropdown','paragraph_match','extract_match'].includes(q.inputType)){
 let label=document.createElement('label');label.textContent='Choose your answer: ';let select=document.createElement('select');select.className='select-answer';select.setAttribute('aria-label','Answer for '+(state.index+1));let blank=new Option('Select an answer','');select.append(blank);q.options.forEach((o,i)=>select.append(new Option(o,String(i))));select.value=partAnswered(q)?String(state.responses[q.id]):'';select.onchange=()=>selectResponse(select.value);label.append(select);choices.append(label);
}else{q.options.forEach((o,i)=>{let label=document.createElement('label');label.className='choice';let inp=document.createElement('input');inp.type='radio';inp.name='answer';inp.value=i;inp.checked=state.responses[q.id]===i;inp.onchange=()=>selectResponse(i);let txt=document.createElement('span');txt.textContent=String.fromCharCode(65+i)+'. '+o;label.append(inp,txt);choices.append(label)})}updateNav()}
function showIntro(){
 const count=mode==='daily'?(subject==='reading'?12:subject==='math'?12:15):(subject==='reading'?38:subject==='math'?35:40);
 $('intro').classList.remove('hidden');$('playing').classList.add('hidden');$('results').classList.add('hidden');
 $('intro-summary').textContent=`${mode==='daily'?'Daily practice':'Full section'} · ${count} answer parts · ${mode==='full'?config.minutes:Math.min(config.minutes,subject==='reading'?15:subject==='thinking'?20:18)} minutes.`;
 $('intro-note').textContent=subject==='reading'
  ? 'Full practice selects 17 linked groups with 38 answers; daily practice selects four standalone questions and one complete 8-part group. New original practice materials rotate with the earlier bank.'
  : mode==='full' ? `New November 2026 full paper: ${count} original questions with explanations. This is independent practice, not an official NSW test.` : `Expanded bank of ${bank.length} questions; daily practice draws from the existing and expanded banks. Earlier items still need additional review.`;
}
function render(){if(!state){showIntro();return}if(state.status!=='in_progress'){showResults(state);return}$('intro').classList.add('hidden');$('playing').classList.remove('hidden');$('results').classList.add('hidden');renderQuestion();clock();clearInterval(tick);tick=setInterval(clock,1000)}
function finish(expired){if(!state||state.status!=='in_progress')return;clearInterval(tick);state.status=expired?'expired':'submitted';state.submittedAt=Date.now();const correct=items.filter(q=>state.responses[q.id]===q.answer).length;const answered=items.filter(partAnswered).length;state.score={correct,answered,total:items.length,elapsedSeconds:Math.min(state.minutes*60,Math.floor((Date.now()-state.startedAt)/1000))};persist();let history=load(key)||[];history.push({id:state.subject+'-'+state.startedAt,date:state.date,subject:state.subject,mode:state.mode,...state.score,completedAt:state.submittedAt});store(key,history.slice(-500));showResults(state)}
function showResults(s){$('intro').classList.add('hidden');$('playing').classList.add('hidden');$('results').classList.remove('hidden');$('result-title').textContent=s.status==='expired'?'Time expired — results':'Practice results';$('score').textContent=`${s.score.correct} / ${s.score.total} correct · ${s.score.answered} answered · ${format(s.score.elapsedSeconds)} elapsed`;
 const holder=$('review');holder.replaceChildren();for(let i=0;i<items.length;i++){const q=items[i],chosen=s.responses[q.id],correct=chosen===q.answer;let div=document.createElement('div');div.className='resultline '+(correct?'correct':'incorrect');let h=document.createElement('strong');h.textContent=`${i+1}. ${correct?'Correct':'Needs review'}`;let prompt=document.createElement('p');prompt.textContent=q.prompt??q.text;let answer=document.createElement('p');answer.textContent='Your answer: '+(chosen===undefined?'Not answered':q.options[chosen])+' | Sample key: '+q.options[q.answer];let expl=document.createElement('p');expl.className='muted';expl.textContent=q.explanation||'No verified explanation supplied.';div.append(h,prompt,answer,expl);holder.append(div)} }
async function init(){try{const res=await fetch(config.source);if(!res.ok)throw Error('HTTP '+res.status);const raw=await res.json();groups=subject==='reading'?raw:[];bank=subject==='reading'?flat(raw):raw;validate(bank);if(subject==='reading'){if(groups.filter(g=>g.items.length===1).length<14||groups.filter(g=>g.items.length===8).length<3)throw Error('Reading bank needs at least fourteen standalone groups and three eight-part groups.');const ids=bank.map(q=>q.id);if(new Set(ids).size!==ids.length)throw Error('Duplicate reading answer IDs');}$('title').textContent=config.name;document.title=config.name+' · Ronald Practice';if(readState()){if(remaining()===0)finish(true);else render()}else showIntro();$('start').onclick=start;$('previous').onclick=()=>jump(Math.max(0,state.index-1));$('next').onclick=()=>jump(Math.min(items.length-1,state.index+1));$('flag').onclick=()=>{const q=items[state.index];state.flags[q.id]=!state.flags[q.id];persist();renderQuestion()};$('submit').onclick=()=>{const pending=items.filter(q=>!partAnswered(q)).length;if(confirm(`Submit now? ${pending} answer(s) are blank.`))finish(false)};$('retry').onclick=()=>{if(confirm('Start a fresh attempt? The completed result remains in history.')){localStorage.removeItem(sessionKey);start()}};}catch(e){$('intro').classList.remove('hidden');$('intro-summary').textContent='Unable to load practice questions.';$('intro-note').textContent=e.message+' — use a local web server or GitHub Pages (not file://).';$('start').disabled=true}}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)clock()});window.addEventListener('pagehide',()=>{if(state?.status==='in_progress')persist()});init();
})();
