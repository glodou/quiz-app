

const questions=[

{

    question: "The capital of Greece?",
    answers:["Athens", "Thessaloniki", "Nafplio"] ,
    correct: 0
},
{
    question:"2+3=?",
    answers:["4","5","6"],
    correct: 1
},
{
    question:"Color of the sky?",
    answers:["Green","Blue","Orange"],
    correct: 1
}


];

let currentQuestion= 0;
let score= 0;
let timeLeft=10;
let timerInterval;

const timerEl=document.getElementById("timer");

const questionEl=document.getElementById("question");
const answerEl=document.getElementById("answers");
const nextBtn=document.getElementById("nextBtn");
const restartBtn=document.getElementById("restartBtn");

const sounds = {
    correct: new Audio ("assets/sounds/correct.mp3"),
    wrong: new Audio ("assets/sounds/wrong.mp3"),
    click: new Audio ("assets/sounds/click.mp3") 

};

function playSound(name) {
    sounds[name].currenttime=0;
    sounds[name].play();
}

function showQuestion() {

    const q=questions[currentQuestion];

    questionEl.innerText=q.question;

    answerEl.innerHTML="";

    q.answers.forEach((answer,index)=>{
        const btn= document.createElement("button");
        btn.innerText= answer;

        btn.addEventListener("click",() => {

            playSound("click");
            selectAnswer(index)});

        answerEl.appendChild(btn);
    });
    clearInterval(timerInterval);
        startTimer();

}

function startTimer(){
    timeLeft=10;
    timerEl.innerText=`Time: ${timeLeft}`;

    timerInterval=setInterval(() => {
        timeLeft--;
        timerEl.innerText=`Time: ${timeLeft}`;

        if (timeLeft===0) {
            clearInterval(timerInterval);
            autoNext();
        }
    },1000);
}

function autoNext() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
        
    } else {
        showResult();
    }
}


function selectAnswer(index) {

    clearInterval(timerInterval);

    const correct=questions[currentQuestion].correct;

    const buttons = answerEl.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        if (i === correct) {
            btn.style.backgroundColor = "green";
        } else {
            btn.style.backgroundColor = "red";
        }

        btn.disabled = true;
    });

    if (index === correct) {
        score++;
        playSound("correct");
    } else{
        playSound("wrong");
    }


}

nextBtn.addEventListener("click",() =>{
    currentQuestion++;

    if (currentQuestion < questions.length){
        showQuestion();
    } else{
        showResult();
    }
} );

function showResult() {
    questionEl.innerText = `Done! Score: ${score}/${questions.length}`;
    answerEl.innerHTML="";
    nextBtn.style.display="none";
    restartBtn.style.display="block";
    timerEl.innerText="";

}

restartBtn.addEventListener("click",()=> {
    currentQuestion=0;
    score=0;
    playSound("click");

    nextBtn.style.display="block";
    restartBtn.style.display="none";

    showQuestion();
    clearInterval(timerInterval);

});

showQuestion();
