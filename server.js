const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const connection = mysql.createConnection({
  host:'',
  user: '',
  password: '',
  database: ''
});

/*function fetchSchoolDate() {
  const url = 'https://open.neis.go.kr/hub/hisTimetable';
  const params = {
    KEY:'7e9d93f8a5e14f9591de7f2d87689395',
    Type:'json',
    pIndex:1,
    pSize:100,
    ATPT_OFCDC_SC_CODE:'B10',
    ATPT_OFCDC_SC_NM : '서울특별시교육청',
    SD_SCHUL_CODE:'7010059',
    SCHUL_NM : '경기고등학교',
    AY : '2023',
    GRADE : 3,
    SEM: 2,
    CLASS_NM:'14',
    TI_FROM_YMD:'20230821',
    TI_TO_YMD:'20230825'
  };
  axios.get( url,{params})
    .then(response => {
      console.log(response.data);
        if (response.data && response.data.hisTimetable){
          const timetableData = response.data.hisTimetable;
          if (timetableData.length > 1 && timetableData[1].row){
            console.log('xuexiaoshijianbiao');
            timetableData[1].row.forEach(row => {
              const weekday = getWeekday(row.ALL_TI_YMD);
              const insertQuery = 'INSERT INTO kebiao314 (academic_year, grade, semester, date, weekday, period, content, classroom_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
              const values = [parseInt(row.AY, 10),
                parseInt(row.GRADE, 10),
                parseInt(row.SEM, 10),
                row.ALL_TI_YMD,
                weekday,
                parseInt(row.PERIO, 10),
                row.ITRT_CNTNT,
                row.CLRM_NM]
                connection.query(insertQuery,values,(err,results)=>{
                  if(err){
                    console.error('error',err);
                  }else{
                    console.log('results',results);
                  }
                });
            });
          }
        }

    })
    .catch(error => {
      console.log('error',error);
    });
}*/



const path = require('path');
const { url } = require('inspector');
const { error } = require('console');

app.use(cors());

app.get('/api/getData',(req,res)=>{
  const gradeNumber = req.query.gradeNumber;
  const classNumber = req.query.classNumber;
  const tableName = `kebiao${gradeNumber}${classNumber.padStart(2, '0')}`;
    
  if(!classNumber || isNaN(classNumber) || classNumber < 1 || classNumber > 13) {
    res.status(400).json({error:'Invalid class number' });
    return;
  }
  if(!gradeNumber || isNaN(gradeNumber) || gradeNumber < 1 || gradeNumber > 3) {
    res.status(400).json({error:'Invalid grade number' });
    return;
  }
  const query = `SELECT * FROM ${tableName}`;
  connection.query(query,(err,results) => {
    if(err){
    res.status(500).json({error:'error'});
    return;
  }
  res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

connection.connect(err => {
  if(err){
    console.error('wrong'+err.stack);
    return;
  }
  console.log("good");
});

/*function getWeekday(dateString){
  const year = parseInt(dateString.substring(0,4),10);
  const month = parseInt(dateString.substring(4,6),10) - 1;
  const day = parseInt(dateString.substring(6,8),10);
  const date = new Date(year,month,day);
 return date.getDay();
}

fetchSchoolDate();*/
