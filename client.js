
function getDataFromDatabase() {
    const title = document.getElementById("title").value;

    // 클라이언트에서 서버로 HTTP POST 요청을 보내는 부분
    fetch('http://172.21.116.167:59999/getDataFromDatabase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName: title }), // 데이터를 JSON 형식으로 변환하여 body에 추가
    })
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
            displayData(data);
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

    alert(typeof(data));
}