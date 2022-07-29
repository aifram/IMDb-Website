let mysql = require("mysql");
let config = require("./config.js");
const fetch = require("node-fetch");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require("express");
const app = express();
const port = process.env.PORT || 5000;
// const port = 54321
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/loadUserSettings", (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = `SELECT mode FROM user WHERE userID = ?`;
  console.log(sql);
  let data = [userID];
  console.log(data);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/getMovies", (req, res) => {
  console.log("wisil");
  let connection = mysql.createConnection(config);

  let sql = `SELECT * FROM movies`;
  console.log(sql);

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);

    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/searchMovies", (req, res) => {
  console.log("searching");
  let connection = mysql.createConnection(config);

  let title = req.body.title;

  let actor = req.body.actor;

  let director = req.body.director;

  let sql = "SELECT m.*, r.reviewScore, r.reviewContent FROM (SELECT DISTINCT m.*, ed.director_name FROM (SELECT * FROM movies WHERE name LIKE (?)) as m, (SELECT md.movie_id,concat(d.first_name, ' ', d.last_name) as director_name FROM movies_directors AS md, directors AS d WHERE CONCAT(d.first_name , ' ' , d.last_name) LIKE (?) AND md.director_id = d.id) AS ed, (SELECT ro.movie_id FROM roles AS ro, actors AS a WHERE CONCAT(a.first_name,' ', a.last_name) LIKE (?) AND ro.actor_id=a.id) AS ae WHERE m.id = ed.movie_id AND m.id = ae.movie_id ORDER BY m.id) AS m LEFT JOIN(SELECT movieID, AVG(reviewScore) AS reviewScore, GROUP_CONCAT(reviewContent, ' ') AS reviewContent FROM Review GROUP BY movieID) AS r ON m.id = r.movieID;";

  // let sql = "SELECT M.*, SR.reviewScore, SR.reviewContent FROM (SELECT DISTINCT M.*, SD.director_name FROM (SELECT * FROM movies WHERE name LIKE (?)) AS M, (SELECT MD.movie_id, concat(D.first_name, ' ', D.last_name) as director_name FROM movies_directors AS MD, directors AS D WHERE concat(D.first_name, ' ', D.last_name) LIKE (?) AND MD.director_id=D.id) AS SD,(SELECT R.movie_id FROM roles AS R, actors AS A WHERE CONCAT(A.first_name, ' ' , A.last_name) LIKE (?) AND R.actor_id=A.id) AS SA WHERE M.id=SD.movie_id And M.id=SA.movie_id ORDER BY M.id) AS M LEFT JOIN (SELECT movieID, AVG(reviewScore) AS reviewScore, group_concat(reviewContent, ', ') AS reviewContent FROM Review Group BY movieID) AS SR ON M.id = SR.movieID;"

  console.log("Sql: " + sql);

  console.log('director:' + director)

  let values = [title+'%', director+'%',actor+'%'];

  console.log(sql);

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);

    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/addReview", (req, res) => {
  console.log("wisil 2.0");
  let connection = mysql.createConnection(config);
  let userID = 1;

  let sql = `INSERT INTO Review (userID, reviewTitle, reviewContent, reviewScore, movieID) VALUES (?,?,?,?,?)`;

  let title = req.body.title;

  let content = req.body.content;

  let score = req.body.rate;

  let movieID = req.body.movieID;

  let values = [userID, title, content, score, movieID];

  console.log(sql);

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);

    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/findListActors", (req, res) => {
  console.log("gathering Actors");
  let connection = mysql.createConnection(config);
  // let userID = 1;

  // let sql = `select m.title, r.reviewContent, d.first_name, d.last_name from movies m, Review r, directors d Where m.id IN ? AND r.movieID IN ? AND d.movie_id IN ?`;

  //returns infinite????
  // let sql = 'select first_name, last_name from actors where id IN (select actor_id from roles where movie_id=?)';
  let sql =
    "select m.name, a.first_name, a.last_name from roles r, movies m, actors a where r.movie_id = m.id AND r.actor_id = a.id ORDER BY RAND() limit 1;";
  // let title = req.body.title;

  // let content = req.body.content;

  // let score = req.body.rate;

  // let movieID = req.body.movieID;

  // let values = movieID;

  console.log(sql);

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);

    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/findSearchedInfo", (req, res) => {
  console.log("gathering data");
  let connection = mysql.createConnection(config);
  // let userID = 1;

  // let sql = `select m.title, r.reviewContent, d.first_name, d.last_name from movies m, Review r, directors d Where m.id IN ? AND r.movieID IN ? AND d.movie_id IN ?`;

  //returns infinite????
  let sql =
    "select m.name, r.reviewContent from movies m, Review r, directors d Where m.id IN (313479,313478) AND r.movieID IN (313479,313478);";

  let title = req.body.title;

  let actor = req.body.actor;

  let director = req.body.director;

  let values = [title, actor, director];

  console.log(sql);

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);

    res.send({ express: string });
  });
  connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
// app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
