
const data = [
    {
        question: "First alphabet",
        a: "B",
        b: 'D',
        c: 'Z',
        d: 'A',
        correct: 'd'
    },
    {
        question: "Best language",
        a: "JavaScript",
        b: 'Python',
        c: 'C++',
        d: 'Java',
        correct: 'a'
    },
    {
        question: "My Name",
        a: "Not Utkarsh",
        b: 'Utkarsh',
        c: 'Something Else',
        d: 'bleh',
        correct: 'b'
    }
];


var dataAPI = [];

const callAPI = async() => {

    // return new Promise((resolve, reject) => {
        const res = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
        const response = await res.json();
        return response.results;
        // .then(res => {
        //     res.json().then(response => {
        //         console.log(response.results);
        //        return response.results;
        //     })
            // .catch(err => {
            //     reject(err);
            // });
        // });
    // } )      
}

const call = async()=>{
    dataAPI=await callAPI();
    console.log(dataAPI);
    loadQuestion();
}

call();
// callAPI().then(ok=>{
//     dataAPI = ok;
//     console.log(dataAPI);
//     loadQuestion();
// });





const questionElement = document.getElementById('question');

const a_ans = document.getElementById('a_label');
console.log(a_ans);
const b_ans = document.getElementById('b_label');
const c_ans = document.getElementById('c_label');
const d_ans = document.getElementById('d_label');
const button = document.getElementById('button');
const answers = document.querySelectorAll('.mcq');
const allAnswers = document.getElementById('answers');
let score = 0;
console.log(answers);
answers.forEach(li=>console.log(li));
let currentQuestion = 0;

const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
let counter;


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
    
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }

function loadQuestion() {
    deselect();
    clearInterval(counter);
    startTimer(10);
    const currentData = dataAPI[currentQuestion];

    questionElement.innerText = currentData.question;
    currentData.incorrect_answers.push(currentData.correct_answer);
    shuffleArray(currentData.incorrect_answers);
    a_ans.innerText = currentData.incorrect_answers[0];
    b_ans.innerText = currentData.incorrect_answers[1];
    c_ans.innerText = currentData.incorrect_answers[2];
    d_ans.innerText = currentData.incorrect_answers[3];
}

function deselect(){
    console.log(answers);
    answers.forEach(answer=>answer.checked=false);
}

function getSelected(){
    let id;
    answers.forEach(answer=>{
        if(answer.checked){
            id = answer.id;
        }
    });
    return id;
}

function proceeding(){
    if(currentQuestion<dataAPI.length-1){
        let answer = getSelected();
        console.log(answer);
        if(answer){
            let query = `${answer}_label`;
            const label = document.getElementById(query);
            console.log(label.innerText, dataAPI[currentQuestion]);
            if(label.innerText===dataAPI[currentQuestion].correct_answer){
                score+=1;
            }
        }
        currentQuestion+=1
        loadQuestion();
    }
    else{
        question.innerText=`Quiz has ended with score = ${score} `;
        clearInterval(counter);
    }
}

button.addEventListener('click',()=>{
    proceeding();
})

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time<0){
            proceeding();
        }
    }
}