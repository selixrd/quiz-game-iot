let questions = [
    { q: "Pada era industri keberapakah mulai mengenal adanya listrik?", a: "B", options: ["Era 1.0", "Era 2.0", "Era 3.0", "Era 4.0"] },
    { q: "Era industri dimulai dengan ditemukannya...", a: "C", options: ["Listrik", "Robot", "Mesin uap", "Internet"] },
    { q: "Pada masa society 2.0, kondisi masyarakat sebagian besar..", a: "D", options: ["Berburu dan meramu", "Familiar dengan internet", "Familiar dengan industri", "Bercocok tanam dan berkebun"] },
    { q: "Manakah dibawah ini yang termasuk dalam internet of things dalam kehidupan sehari-hari?", a: "C", options: ["Penggunaan televisi elektronik", "Penggunaan AC", "Penggunaan aplikasi ojek online dalam kehidupan sehari-hari", "Penggunaan kompor listrik untuk memasak"] },
    { q: "Manakah platform di bawah ini yang termasuk dalam platform crowdfunding?", a: "B", options: ["Burungnesia", "Campaign", "Tokopedia", "ODK Collect"] },
    { q: "Manakah platform di bawah ini yang tidak termasuk dalam platform meeting?", a: "D", options: ["Ms. Teams", "Zoom", "Webex", "Coursera"] },
    { q: "Model e-learning yang tidak melakukan tatap muka secara langsung dikenal dengan..", a: "C", options: ["Synchronous", "Real time", "Asynchronous", "Langsung"] },
    { q: "Manakah di bawah ini yang merupakan kelebihan penggunaan survei online?", a: "C", options: ["Validitas dan reliabilitas lebih terjaga", "Kerahasiaan lebih mudah dikendalikan", "Mudah dan murah dilakukan", "Lebih akurat"] },
    { q: "Manakah di bawah ini yang bukan merupakan keuntungan dalam digital marketing?", a: "D", options: ["Jangkauan target sasaran lebih luas", "Lebih cepat tersampaikan kepada konsumen/sasaran", "Biaya efisien", "Dapat menjangkau seluruh pelosok daerah meskipun belum ada internet"] },
    { q: "Media marketing yang dapat digunakan pada Youtube adalah...", a: "C", options: ["SEO", "SEM", "Video Marketing", "Website"] },
    { q: "Digital marketing yang dapat menampilkan company profile secara lengkap dapat dilakukan melalui media...", a: "B", options: ["Video marketing", "Website", "Facebook Adsense", "Email marketing"] },
    { q: "Pemasaran digital dapat dilakukan tanpa mengeluarkan modal yang besar untuk membantu website masuk pada halaman awal mesin pencarian Google merupakan bentuk...", a: "C", options: ["Media sosial marketing", "Website", "SEO", "Twitter adsense"] }
];

let shuffledQuestions, currentQuestionIndex = 0, answered = [];
let score = 0;  
let questionAnswered = false;

function startQuiz() {
    let username = document.getElementById("username").value;
    if (username.trim() === "") {
        alert("Masukkan nama dulu!");
        return;
    }
    document.getElementById("login-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    answered = new Array(shuffledQuestions.length).fill(null);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    questionAnswered = false;
    let q = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = q.q;
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.classList.add("option");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(btn, index);
        optionsContainer.appendChild(btn);
    });

    document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(btn, index) {
    if (questionAnswered) return;

    questionAnswered = true;

    let q = shuffledQuestions[currentQuestionIndex];
    const correctMapping = { "A": 0, "B": 1, "C": 2, "D": 3 };
    let correctIndex = correctMapping[q.a.toUpperCase()];
    answered[currentQuestionIndex] = index;

    let buttons = document.querySelectorAll("#options .option");
    buttons.forEach(b => {
        b.disabled = true;
        b.style.pointerEvents = 'none';
    });

    if (index === correctIndex) {
        btn.classList.add("correct");
        score++;  
    } else {
        btn.classList.add("wrong", "shake"); // Efek getar ditambah di sini
        buttons[correctIndex].classList.add("correct");
    }

    document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    let resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "flex";
    document.getElementById("final-score").innerText = `Skor lu ${score}/${questions.length}`;
}

function restartQuiz() {
    location.reload();
}
