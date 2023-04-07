
const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const app = express()
const mongoose = require ("mongoose")
const authroute = require("./Routes/auth")
const usersroute = require("./Routes/users")
const reviewroute = require("./Routes/review")
const postsroute = require("./Routes/posts")
const cookieSession = require("cookie-session")
const passport = require("passport");
const bodyParser=require("body-parser");
const passportSetup = require("./passport");


app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api/auth" ,authroute)
  


app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use("/uploads", express.static("../../Dashboard/backend/uploads"));
mongoose.connect(process.env.MONGO_URL).then(console.log("DATABASE CONNECTED")).catch(err => {console.log(err)})
app.use("/api/users" ,usersroute)
app.use("/api/review" ,reviewroute)
app.use("/api" ,postsroute)
app.use("/api" ,contactroute)




app.get('/', async function(req,res)
{
    res.send('hey')
})







app.listen(4000,function()
{
    console.log("Port 4OOO is running ")
}
)
