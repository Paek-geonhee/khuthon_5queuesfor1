const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 59999;



// MySQL 연결 정보
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7462',
    database: '데이터베이스',
});

app.use(express.json());
app.use(cors());

// MySQL 연결
db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
  
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });




function printAllValues() {
    app.post('/getDataFromDatabase', (req, res) => {
        const tableName = req.body.tableName;

        // 간단한 SELECT 쿼리 실행
        const query = `SELECT * FROM ${tableName}`;

        db.query(query, (err, result) => {
            if (err) {
                console.error('MySQL query error:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ data: result });
            }
        });
        console.log("Request에 대한 response를 완료");
    });
}
// main.html / 카테고리 불러오기
printAllValues();


function setTestPaper(){
    app.post('/insertDataToDatabase', async (req, res) => {
        const { cate, recommendation, title, question, answer} = req.body;
        console.log(req.body.tableName);
        const query = `INSERT INTO ${cate}(추천, 제목, 문제, 답안) VALUES( ${recommendation} , ${title} , ${question} , ${answer} )`;
    
        db.query(query, [cate, recommendation, title, question, answer], (err, result) => {
            if (err) {
                console.error('MySQL query error:', err);
                
            } else {
                return;
            }
        });
    });

}
setTestPaper();

function insertCategoryToDatabase(){
   
        // 카테고리 테이블 생성 쿼리
        
        app.post('/insertCategoryToDatabase', async (req, res) => {
            const category = req.body.cate;
         
            const query = `CREATE TABLE ${category}(추천 text, 제목 text, 문제 text, 답안 text)`;
            console.log("Trying to insert "+category);
            db.query(query, (err, result) => {
                if (err) {
                    console.error('MySQL query error:', err);
                    
                } else {
                    return;
                }
            });
        });
      
}
// main.html / 카테고리 생성 함수
insertCategoryToDatabase();

const query = 'SHOW TABLES';
app.get('/getTableInfo', (req, res) => {


    db.query(query, [db.database], (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // 결과를 정리해서 클라이언트에 전송
        const tableInfo = results.map(table => ({
            table_name: table.Name,
            table_rows: table.Rows
        }));

        res.json({ tableInfo });
        console.log("Request에 대한 response를 완료");
    });
});

app.post('/getTableNamesFromDatabase', async (req, res) => {
 
    const query = `SHOW TABLES`;

    db.query(query, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            
        } else {
            res.json({result:result});
            return;
        }
    });
});



// app.post('/getLabelCountFromDatabase', async (req, res) => {
//     const tables = req.body; // 전송된 데이터를 배열로 받음
//     const arr = [];

//     // Promise를 사용하여 비동기적으로 각 테이블에 대한 쿼리를 실행
//     const queries = tables.map((table) => {
//         return new Promise((resolve, reject) => {
//             const query = `SELECT COUNT(*) AS 추천 FROM ${table};`;
            
//             db.query(query, (err, result) => {
//                 if (err) {
//                     console.error('MySQL query error:', err);
//                     reject(err);
//                 } else {
//                     console.log(result);
//                     for (var data of result) {
//                         arr.push(data['추천']);
//                     }
//                     console.log(arr);
//                     resolve(); // 쿼리 완료 후 resolve 호출
//                 }
//             });
//         });
//     });

//     // 모든 쿼리가 완료되면 결과를 클라이언트에 전송
//     Promise.all(queries)
//         .then(() => {
//             res.json(arr);
//         })
//         .catch((error) => {
//             console.error('Error in processing queries:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// });



function printAllTitle() {
    app.post('/getTestFromTable', async (req, res) => {
        const tableName = req.body.cate;

        // 간단한 SELECT 쿼리 실행
        const query = `SELECT 제목 FROM ${tableName}`;

        db.query(query, (err, result) => {
            if (err) {
                console.error('MySQL query error:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ result });
            }
        });
        console.log("Request에 대한 response를 완료");
    });
}
printAllTitle();

// 테이블명, 문제 제목 데이터를 이용해 문제를 출력하도록 데이터를 가져오는 함수
app.post('/getTestPaper', (req, res) => {

    const table = req.body.titleName;
    const category = req.body.categoryName;

    const query = `SELECT * FROM ${category} WHERE 제목='${table}'`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // 결과를 정리해서 클라이언트에 전송

        res.json({ results });
        console.log("Request에 대한 response를 완료" + results);
    });
});


// 서버 리스닝
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});