const dotenv = require("dotenv")
const express = require("express")
const hbs = require("hbs")
const path = require("path")
const mongoose = require("mongoose")     // Used to connect Mongodb database with nodejs app.
const { defaultCoreCipherList } = require("constants")


dotenv.config({path: "./config.env"})

// Using MongoDb Atlas(remote) for contactdata & Quotes API
mongoose.connect(process.env.DB, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false

}).then(()=>{
    console.log("Connection Successful...")
})
.catch((err)=>{
    console.log(err)
})

const app = express()          
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));        // Needed only when POST or Patch request made
app.use(express.json())                                 // Needed to express To understand json data 

// Serving Static Files
app.use(express.static(path.join(__dirname,"public")))

// Setting View Template Engine
const views_path = path.join(__dirname,"templates/views")
app.set("views", views_path)
app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname,"templates/partials"))

// Making Schema of Document
const contactDataSchema = new mongoose.Schema({
    name : String,
    number : Number,
    email : String,
    address: String,
    concern : String
})

const quotesDataSchema = new mongoose.Schema({
    quote: String,
    author: String,
    index : Number
})



//Making Collection or defining collection
const ContactData = new mongoose.model("contactData",contactDataSchema) 
const quotes = new mongoose.model("quotes",quotesDataSchema) 

//Routing
app.get("/",(req,res)=>{
    res.render("index.hbs")
})

app.get("/about",(req,res)=>{
    res.render("about.hbs")
})

app.get("/weather",(req,res)=>{
    res.render("weather.hbs")
})

app.get("/contact",(req,res)=>{
    res.render("contactUs.hbs")
})

app.get("/quotes",async(req,res)=>{
    try{
        // Rendering random quotes by generating random numbers.
        const ind = Math.floor((Math.random() * 10));
        const quoteData = await quotes.findOne({index:ind});

        res.render("quotes.hbs",{quote: quoteData.quote , author: quoteData.author})
    }
    catch(err)
    {
        res.send(err)
    }    
})


// Handling Post request (Inserting Contact Data in Data base)
app.post("/contact", async(req,res)=>{
    try{
        //Inserting Document in mongoDB database
        const doc = new ContactData(req.body);
        await doc.save();
        res.render("contactUs.hbs",{status:'Concern Submitted !'});
    }
    catch(err){
        res.send(err);
    }
    
})

// To handle invalid url request
app.get("*",(req,res)=>{
    res.render("404_error.hbs")
})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})