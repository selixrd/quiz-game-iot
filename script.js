let questions = [
    { q: "Pada era industri keberapakah mulai mengenal adanya listrik?", a: "B", options: ["Era 1.0", "Era 2.0", "Era 3.0", "Era 4.0"] },
    { q: "Era industri dimulai dengan ditemukannya...", a: "C", options: ["Listrik", "Robot", "Mesin uap", "Internet"] },
    { q: "Pada masa society 2.0, kondisi masyarakat sebagian besar..", a: "D", options: ["Berburu dan meramu", "Familiar dengan internet", "Familiar dengan industri", "Bercocok tanam dan berkebun"] }
];

let shuffledQuestions, currentQuestionIndex = 0;

function startQuiz() {
    let username = document.getElementById("username").value;
    if (username.trim() === "") {
        alert("Masukkan nama dulu!");
        return;
    }
    document.getElementById("login-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    let q = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = q.q;
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.classList.add("option");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(index) {
    let q = shuffledQuestions[currentQuestionIndex];
    let correctIndex = q.options.indexOf(q.options.find(o => o.startsWith(q.a)));
    if (index === correctIndex) {
        alert("Jawaban Benar!");
    } else {
        alert("Jawaban Salah!");
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        alert("Kuis selesai!");
        location.reload();
    }
}