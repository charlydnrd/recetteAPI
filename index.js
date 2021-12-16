const mysql = require('mysql');
const con = mysql.createConnection({
host: "localhost",
user: "root",
password: "root",
database : "API"
});
/**Importation du miniframework Express */
var express = require("express");
/**Création d'une application web via l'objet Express */
var app = express();
/**Configuration de l'application web Express */
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000);
app.use(express.json());

/**requete a la db */
con.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    con.query("SELECT * from recette;", function (err, result) {
    if (err) throw err;
    console.log(result);
    });
    });
/** Définition des routes */
app.get("/", function(request, response) {
response.render("homePage");});

app.get("/recette", function(request, response) {
    con.query("SELECT * from recette;", function (err, result) {
    if (err) throw err;
    console.log(result);
    response.status(200).json(result);
    })
    });
    app.get('/recette/:id', function(request, response) {
        con.query("SELECT * from recette where id="+request.params.id+";", function (err, result) {
        if (err) throw err;
        console.log(result);
        response.status(200).json(result);
        })      
      });
        app.post('/recette', (req,res) => {
            query = "INSERT INTO RECETTE (titre,resume) values ('"+req.body.titre+" ,"+req.body.resume+"');";
            console.log(query);
            con.query(query, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200).json(result);
            });
            });
            app.delete('/recette/:id', (req, res) => {
                const id = parseInt(req.params.id)
                query = "DELETE FROM RECETTE WHERE id=" + id + ";";
                console.log(query);
                con.query(query, function (err, result) {
                console.log(query);
                if (err) throw err;
                console.log(result);
                res.status(200).json(result);
                });
                })
                app.get('/recette/:id', function (request, response) {
                    // si id null ou n'est pas un nombre positif non nul -> 400+ petit message 
                    //{"message":"l'identifiant est incorrect ou manquant"}
                  // sinon
                  // execute la query
                    con.query("SELECT * from recette where id=" + request.params.id + ";", 
                    function (err, result) 
                      {
                        // si (err) --> 503 + petit message 
                        //{"message":"un probleme est survenu, tranquile"}
                      // sinon   response.status(200).json(result);
                        if (err) throw err;
                        console.log(result);
                        console.log(request);
                        response.status(200).json(result);
                      })
                  });