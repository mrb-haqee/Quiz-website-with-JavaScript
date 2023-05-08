const questions = [
  {
    question: "Siapa ninja terkuat di konoha?",
    answers: [
      { text: "Guy", correct: false },
      { text: "Naruto", correct: false },
      { text: "Kakashi", correct: false },
      { text: "Hashirama", correct: true },
    ],
  },
  {
    question: "Siapa ninja Koruptor di konoha?",
    answers: [
      { text: "Tsunade", correct: false },
      { text: "Hiruzen", correct: true },
      { text: "Danzo", correct: false },
      { text: "Jiraiya", correct: false },
    ],
  },
  {
    question: "Berikut ninja yang bukan Sannin adalah?",
    answers: [
      { text: "Hashirama", correct: false },
      { text: "Orochimaru", correct: false },
      { text: "Naruto", correct: false },
      { text: "Tobirama", correct: true },
    ],
  },
  {
    question: "Siapa Nama asli dari Kyuubi?",
    answers: [
      { text: "Shukaku", correct: false },
      { text: "Gyuki", correct: false },
      { text: "Kurama", correct: true },
      { text: "Son Goku", correct: false },
    ],
  },
  {
    question: "Siapa Ninja terpintar?",
    answers: [
      { text: "Shikamaru", correct: false },
      { text: "Sukaku", correct: true },
      { text: "Kakashi", correct: false },
      { text: "Naruto", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const headScore = document.getElementById("header");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  headScore.innerHTML = "Seberapa Wibu Omae? 😂";
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorect = selectBtn.dataset.correct === "true";
  if (isCorect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  if (score < questions.length) {
    let hasil = (score / questions.length) * 100;
    headScore.innerHTML = `Dih score ${hasil} 🤮, mending maraton lagi sono📢`;
    questionElement.innerHTML = `Jawaban yang benar ${score} dari ${questions.length}`;
  } else {
    headScore.innerHTML = `Omae wa Otomodachi da 🤧🎉`;
    questionElement.innerHTML = `Jawaban yang benar ${score} dari ${questions.length}`;
  }
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
