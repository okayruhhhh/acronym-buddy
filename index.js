const express=require("express");
const cors=require("cors");
const mysql=require("mysql2");
require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

const con=mysql.createConnection({
	"host":process.env.DB_HOST,
	"user":process.env.DB_USER,
	"password":process.env.DB_PASSWORD,
	"database":process.env.DB_NAME,	
	"port":3306,
	  ssl: {
    rejectUnauthorized: false
  }
});

con.connect((err) => {
    if (err) {
        console.log("DB Connection Failed:", err);
    } else {
        console.log("DB Connected Successfully");
    }
});
app.get("/find",(req,res)=>{
	let data=req.query.word;
	let sql="select fullform from fullform where acronym=?";


	con.query(sql,[data],(error,response)=>{
		 if (error) return res.status(500).send(error);
        if (response.length === 0) {
            return res.json({ message: "Acronym not found in our current database. More entries coming soon!" });
        }
        res.json({
            fullform: response[0].fullform
        });
});
});  

const PORT=process.env.PORT || 9000;
app.listen(PORT,()=>{
	console.log("Ready to serve @",PORT);

});
