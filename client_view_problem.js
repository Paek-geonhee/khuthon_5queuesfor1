let timer = 180;
const timerElement = document.getElementById('timer');

function getDataFromDatabase() {
    // 클라이언트에서 서버로 HTTP 요청을 보내는 부분
    fetch('http://172.21.116.167:59999/getDataFromDatabase')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // 데이터를 콘솔에 출력
            console.log('서버에서 받은 데이터:', data);

            // 출력된 데이터를 화면에 표시하는 부분
            //displayData(data);
        })
        .catch(error => {
            console.error('오류:', error);
            // JSON 데이터를 가져오지 못한 경우에 경고창 띄우기
            
            alert('서버에서 데이터를 가져오지 못했습니다. 나중에 다시 시도해주세요.');
        });
}

function displayData(data) {
    // 데이터를 화면에 표시하는 예제
    // 여기에서는 간단하게 콘솔 대신 id가 'dataDisplay'인 요소에 추가하는 예제로 작성했습니다.
    const dataDisplayElement = document.getElementById('dataDisplay');

    // 데이터가 배열이라면 각 항목을 순회하며 추가
    if (Array.isArray(data.data)) {
        data.data.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = JSON.stringify(item);
            dataDisplayElement.appendChild(itemElement);
        });
    } else {
        // 배열이 아니라면 하나의 항목으로 간주하여 추가
        const itemElement = document.createElement('p');
        itemElement.textContent = JSON.stringify(data.data);
        dataDisplayElement.appendChild(itemElement);
    }
}
console.log(getDataFromDatabase());
function convertJSONtoArray(json){
    jsontext = json.data;
    var contact = JSON.parse(jsontext); 

//for문을 돌면서 contact[i]의 값을 출력한다. 	
    for (var i = 0; i < contact.length; i++) { 	
        console.log(contact[i]); 		
    } 	
}
function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timer--;

    if (timer < 0) {
        clearInterval(timerInterval);
        alert('종료되었습니다.');
        submitExam();
    }
}

console.log(getDataFromDatabase());
const timerInterval = setInterval(updateTimer, 1000);

function confirmSubmit() {
    const unansweredQuestions = document.querySelectorAll('input[type="radio"]:not(:checked)');
    if (unansweredQuestions.length > 0) {
        const confirmMessage = "해결하지 못한 문제가 있습니다. 정말로 제출하시겠습니까?";
        const userConfirmed = confirm(confirmMessage);

        if (userConfirmed) {
            submitExam();
        }
    } else {
        submitExam();
    }
}

function submitExam() {
clearInterval(timerInterval);

const answers = {
q1: document.querySelector('input[name="q1"]:checked'),
q2: document.querySelector('input[name="q2"]:checked'),
q3: document.querySelector('input[name="q3"]:checked'),
};

const correctAnswers = {
q1: 'O',
q2: 'O',
q3: 'O',
};

let score = 0;
for (const question in answers) {
if (answers[question]) {
    if (answers[question].value === correctAnswers[question]) {
        score += 1;
    } else {
        score -= 1; // 틀린 답으로 간주
    }
} else {
    score -= 1; // 해결하지 못한 문제도 틀린 답으로 간주
}
}

// 최소 점수를 0으로 설정
score = Math.max(0, score);

alert(`점수: ${score}/3`);
}