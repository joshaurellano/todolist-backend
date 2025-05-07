const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const taskRouter = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.get('/',function(req,res){
    res.send("Hello");
});

app.use('/auth',authRoutes);
app.use('/task',taskRouter);

const PORT = 3000
app.listen(PORT, () =>{
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
})


