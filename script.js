

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
}


];

let currentQuestion= 0;
let score= 0;

const questionEl=document.getElementById("question");
const answerEl=document.getElementById("answers");
const nextBtn=document.getElementById("nextBtn");

function showQuestion() {

    const q=questions[currentQuestion];

    questionEl.innerText=q.question;

    answerEl.innerHTML="";

    q.answers.forEach((answer,index)=>{
        const btn= document.createElement("button");
        btn.innerText= answer;

        btn.addEventListener("click",() => selectAnswer(index));

        answerEl.appendChild(btn);
    });


}

function selectAnswer(index) {
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


}


showQuestion();
