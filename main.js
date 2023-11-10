// main.html에서 새로운 box를 생성하는 함수
function createDiv() {
   


    // 컨테이너에 들어갈 박스 템플릿 생성
    con = document.getElementById('container');
    text = document.getElementById('cate_input');
    const newDiv = document.createElement('div');
    newDiv.className = 'box'
    newDiv.style.background = "board.jpg"

    if(text.value == ""){
        alert("카테고리를 입력해야 합니다.");
        return;
    }
    // 입력칸에 있는 값을 불러와 카테고리 제목으로 설정
    // 시험지 수 라는 임시 문구를 결합하여 Child로 설정
    var p1 = document.createElement('div');
    //var str = String.trim(text.value);
    //p1.innerHTML = '<b>' + str + '</b> <br/>시험지 수 : 1000<p></p>';
    p1.innerHTML = '<b>' + text.value + '</b> <br/>시험지 수 : 1000<p></p>';
    

   
    newDiv.appendChild(p1);
    text.value = "";

    // 버튼 생성
    // 1. 문제 생성
    // 2. 문제 보기
    button1 = document.createElement('button');
    button1.className = "pro_crt";
    button1.innerHTML ="문제 생성";
    button1.addEventListener("click", moveToCreateHTML);
    newDiv.appendChild(button1);

    var p2 = document.createElement('div');
    p2.innerHTML = "<hr class='line'>";
    newDiv.appendChild(p2);

    button2 = document.createElement('button');
    button2.className = "pro_view";
    button2.innerHTML ="문제 보기";
    button2.addEventListener("click", moveToSolveHTML);
    newDiv.appendChild(button2);
    
    // 모든 리소스 생성 및 박스 클래스와 결합되면
    // box 클래스를 컨테이너에 결합
    con.appendChild(newDiv);
    } 

    function moveToCreateHTML(){
        window.location.href = 'createQuiz.html';
    }

    function moveToSolveHTML(){
        window.location.href = 'solveQuiz.html';
    }