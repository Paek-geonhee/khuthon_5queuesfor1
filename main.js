
const insertCategoryToDatabase = async () => {
    const url = 'http://localhost:59999/insertCategoryToDatabase'; // 서버의 주소에 맞게 변경
    const category = document.getElementById('cate_input').value.split(' ').join('');
    if(isCategoryDuplicate(category)){
        alert("이미 존재하는 카테고리입니다.");
        return;
    }
    if(category == ""){
        alert("카테고리를 입력해야 합니다.");
        return;
    }
    const dataToSend = { 
      cate:category,
         // 문자열을 정수로 변환 (안함)
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        console.log("fetch done");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        //console.log(responseData.message); // 서버로부터 받은 응답을 출력합니다.
        return responseData.message;
    } catch (error) {
        console.error('Error sending data to the server:', error);
        throw error;
    }
};



async function createNewCategory() {
    try {
        const message = await insertCategoryToDatabase();
        if(message){
            alert("카테고리가 정상적으로 등록되었습니다.");
            location.reload();
        }
            
        //alert(message); // 서버로부터의 응답 메세지를 알림으로 표시
        
    } catch (error) {
        console.error('Error creating new category:', error);
        // 에러 처리
    }
}

function moveToCreateHTML(category){
    window.location.href = 'createQuiz.html?' + category;
}

function moveToSolveHTML(category){
    window.location.href = 'selectQuiz.html?' + category;
}

// 이미 존재하는 주제인지 확인하는 함수
function isCategoryDuplicate(category) {
    const con = document.getElementById('container');
    const existingBoxes = con.getElementsByClassName('box');

    for (const box of existingBoxes) {
        const existingCategory = box.querySelector('div b').innerText.trim();
        if (existingCategory.toLowerCase() === category.toLowerCase()) {
            return true;  // 중복이면 true 반환
        }
    }

    return false;  // 중복이 아니면 false 반환
}



let tableArray = []; // 테이블 이름
function getTableNamesFromDatabase() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:59999/getTableNamesFromDatabase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ databaseName: 'your_database_name' }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('서버에서 받은 데이터:', data.result);
            data.result.forEach(tableInfo => {
                const tableName = tableInfo['Tables_in_데이터베이스'];
                tableArray.push(tableName);
            });
            resolve();  // Promise 성공 처리
        })
        .catch(error => {
            console.error('오류:', error);
            reject(error);  // Promise 실패 처리
        });
    });
}



function setDiv(categoryName) {
    // 카테고리 제목과 시험지 개수를 파라미터로 받아서 div 생성
    // 컨테이너에 들어갈 박스 템플릿 생성
    const con = document.getElementById('container');
    //const text = categoryName;

    //const category = text.value.trim(); //주제 저장

    const newDiv = document.createElement('div');
    newDiv.className = 'box';
    newDiv.style.background = "board.jpg";

    // 입력칸에 있는 값을 불러와 카테고리 제목으로 설정
    // 시험지 수 라는 임시 문구를 결합하여 Child로 설정
    const p1 = document.createElement('div');
    p1.innerHTML = '<b>' + categoryName + '</b> <br/><p></p>';
    newDiv.appendChild(p1);

    // 버튼 생성
    // 1. 문제 생성
    // 2. 문제 보기
    const button1 = document.createElement('button');
    button1.className = "pro_crt";
    button1.innerHTML = "문제 생성";
    button1.addEventListener("click", function () {
        moveToCreateHTML(categoryName);  // 해당 주제를 전달
    });
    newDiv.appendChild(button1);

    const p2 = document.createElement('div');
    p2.innerHTML = "<hr class='line'>";
    newDiv.appendChild(p2);

    const button2 = document.createElement('button');
    button2.className = "pro_view";
    button2.innerHTML = "문제 보기";
    button2.addEventListener("click", function () {
        moveToSolveHTML(categoryName);  // 해당 주제를 전달
    });
    newDiv.appendChild(button2);

    // 모든 리소스 생성 및 박스 클래스와 결합되면
    // box 클래스를 컨테이너에 결합
    con.appendChild(newDiv);

    //text.value = "";  // 입력칸 비우기
}

function initializePage() {
    getTableNamesFromDatabase()
    .then(() => {
        tableArray.forEach((table) => {
            console.log(table);
            setDiv(table);
        });
    })
    .catch(error => {
        console.error('초기화 오류:', error);
        // 오류 처리 로직 추가
    });
}


//시작시, 자동실행함수
window.onload=initializePage;

    
