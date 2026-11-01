// Ronald's Daily Practice App - Basic Version

const STORAGE_KEY = "ronald_practice_progress";

// ---------- State ----------
let currentQuestions = [];
let currentIndex = 0;
let currentTaskId = null;
let userAnswers = [];

// ---------- Helpers ----------
function getToday() {
  return new Date().getDay(); // 0 = Sunday, 1 = Monday, ...
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getWeekKey() {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil((((now - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

// ---------- Render Today's Info ----------
function renderTodayInfo() {
  const day = getToday();
  const schedule = WEEKLY_SCHEDULE[day];
  const el = document.getElementById("today-info");
  el.textContent = `${schedule.name} · ${schedule.time} · ${schedule.focus}`;
}

// ---------- Render Tasks ----------
function renderTasks() {
  const day = getToday();
  const schedule = WEEKLY_SCHEDULE[day];
  const progress = loadProgress();
  const weekKey = getWeekKey();
  const weekProgress = progress[weekKey] || {};

  const container = document.getElementById("tasks-list");
  container.innerHTML = "";

  schedule.tasks.forEach(task => {
    const done = weekProgress[task.id] === true;

    const div = document.createElement("div");
    div.className = "task-item";
    div.innerHTML = `
      <input type="checkbox" id="check-${task.id}" ${done ? "checked" : ""} />
      <div class="task-content">
        <div class="task-title">${task.title}</div>
        <div class="task-meta">${task.duration}</div>
        <div class="task-actions">
          ${task.type !== "writing" && task.type !== "review"
            ? `<button class="btn-primary btn-start" data-task="${task.id}" data-type="${task.type}">
                ${done ? "Practice Again" : "Start Practice"}
               </button>`
            : `<span class="task-meta">Complete offline, then tick the box</span>`
          }
        </div>
      </div>
    `;
    container.appendChild(div);

    // Checkbox handler
    div.querySelector("input").addEventListener("change", (e) => {
      const p = loadProgress();
      if (!p[weekKey]) p[weekKey] = {};
      p[weekKey][task.id] = e.target.checked;
      saveProgress(p);
      renderProgress();
    });
  });

  // Start practice buttons
  container.querySelectorAll(".btn-start").forEach(btn => {
    btn.addEventListener("click", () => {
      startPractice(btn.dataset.task, btn.dataset.type);
    });
  });
}

// ---------- Practice Flow ----------
function startPractice(taskId, type) {
  currentTaskId = taskId;
  currentQuestions = QUESTIONS[type] || [];
  currentIndex = 0;
  userAnswers = [];

  if (currentQuestions.length === 0) {
    alert("No sample questions available for this task yet. Please complete it offline and tick the checkbox.");
    return;
  }

  document.getElementById("tasks-section").classList.add("hidden");
  document.getElementById("progress-section").classList.add("hidden");
  document.getElementById("practice-section").classList.remove("hidden");
  document.getElementById("result-summary").classList.add("hidden");
  document.getElementById("practice-actions").classList.add("hidden");

  document.getElementById("practice-title").textContent =
    WEEKLY_SCHEDULE[getToday()].tasks.find(t => t.id === taskId)?.title || "Practice";

  showQuestion();
}

function showQuestion() {
  const q = currentQuestions[currentIndex];
  const container = document.getElementById("question-container");

  container.innerHTML = `
    <div class="question-card">
      <div class="question-number">Question ${currentIndex + 1} of ${currentQuestions.length}</div>
      <div class="question-text">${q.question}</div>
      <div class="options">
        ${q.options.map((opt, i) => `
          <label class="option" data-index="${i}">
            <input type="radio" name="answer" value="${i}" />
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
      <div id="feedback" class="feedback hidden"></div>
    </div>
  `;

  // Option click
  container.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      // prevent re-selection after answered
      if (userAnswers[currentIndex] !== undefined) return;

      container.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      opt.querySelector("input").checked = true;

      const selected = parseInt(opt.dataset.index, 10);
      checkAnswer(selected);
    });
  });
}

function checkAnswer(selected) {
  const q = currentQuestions[currentIndex];
  userAnswers[currentIndex] = selected;

  const options = document.querySelectorAll(".option");
  const feedback = document.getElementById("feedback");

  options.forEach((opt, i) => {
    opt.querySelector("input").disabled = true;
    if (i === q.answer) {
      opt.classList.add("correct");
    } else if (i === selected && selected !== q.answer) {
      opt.classList.add("wrong");
    }
  });

  if (selected === q.answer) {
    feedback.textContent = "Correct! " + (q.explanation || "");
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = "Incorrect. " + (q.explanation || "");
    feedback.className = "feedback wrong";
  }
  feedback.classList.remove("hidden");

  document.getElementById("practice-actions").classList.remove("hidden");

  const nextBtn = document.getElementById("next-question");
  if (currentIndex >= currentQuestions.length - 1) {
    nextBtn.textContent = "See Results";
  } else {
    nextBtn.textContent = "Next Question";
  }
}

function nextQuestion() {
  if (currentIndex >= currentQuestions.length - 1) {
    showResults();
    return;
  }
  currentIndex++;
  document.getElementById("practice-actions").classList.add("hidden");
  showQuestion();
}

function showResults() {
  const correctCount = userAnswers.filter((ans, i) => ans === currentQuestions[i].answer).length;
  const total = currentQuestions.length;

  document.getElementById("question-container").innerHTML = "";
  document.getElementById("practice-actions").classList.add("hidden");

  const summary = document.getElementById("result-summary");
  summary.classList.remove("hidden");
  summary.innerHTML = `
    <h3>Practice Complete</h3>
    <p>You got <strong>${correctCount}</strong> out of <strong>${total}</strong> correct.</p>
    <br/>
    <button id="finish-practice" class="btn-primary">Back to Today’s Tasks</button>
  `;

  document.getElementById("finish-practice").addEventListener("click", () => {
    // Mark task as done
    const progress = loadProgress();
    const weekKey = getWeekKey();
    if (!progress[weekKey]) progress[weekKey] = {};
    progress[weekKey][currentTaskId] = true;
    saveProgress(progress);

    closePractice();
  });
}

function closePractice() {
  document.getElementById("practice-section").classList.add("hidden");
  document.getElementById("tasks-section").classList.remove("hidden");
  document.getElementById("progress-section").classList.remove("hidden");
  renderTasks();
  renderProgress();
}

// ---------- Progress ----------
function renderProgress() {
  const progress = loadProgress();
  const weekKey = getWeekKey();
  const weekProgress = progress[weekKey] || {};
  const container = document.getElementById("progress-list");
  container.innerHTML = "";

  // Show all days of the week briefly
  for (let d = 1; d <= 6; d++) { // Mon-Sat first
    const day = WEEKLY_SCHEDULE[d];
    const doneCount = day.tasks.filter(t => weekProgress[t.id]).length;
    const total = day.tasks.length;
    const allDone = doneCount === total;

    const div = document.createElement("div");
    div.className = "progress-item";
    div.innerHTML = `
      <span>${day.name}</span>
      <span class="badge ${allDone ? "done" : "pending"}">
        ${doneCount}/${total} ${allDone ? "Done" : ""}
      </span>
    `;
    container.appendChild(div);
  }

  // Sunday
  const sun = WEEKLY_SCHEDULE[0];
  const sunDone = sun.tasks.filter(t => weekProgress[t.id]).length;
  const sunDiv = document.createElement("div");
  sunDiv.className = "progress-item";
  sunDiv.innerHTML = `
    <span>Sunday</span>
    <span class="badge ${sunDone === sun.tasks.length ? "done" : "pending"}">
      ${sunDone}/${sun.tasks.length}
    </span>
  `;
  container.appendChild(sunDiv);
}

// ---------- Event Listeners ----------
document.getElementById("close-practice").addEventListener("click", closePractice);
document.getElementById("next-question").addEventListener("click", nextQuestion);

document.getElementById("reset-week").addEventListener("click", () => {
  if (confirm("Reset all progress for this week?")) {
    const progress = loadProgress();
    const weekKey = getWeekKey();
    delete progress[weekKey];
    saveProgress(progress);
    renderTasks();
    renderProgress();
  }
});

// ---------- Init ----------
function init() {
  renderTodayInfo();
  renderTasks();
  renderProgress();
}

init();
