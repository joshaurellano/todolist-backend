const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const taskRouter = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const corsOptions = {
	origin: (origin, callback) => {
	  // Allow all origins or validate here
	  if (origin) {
		callback(null, origin); // Allow the current origin
	  } else {
		callback(null, '*'); // Allow non-browser requests (e.g., Postman)
	  }
	},
	credentials: true, // Allow credentials
  };
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/',function(req,res){
    res.send("Hello");
});

app.use('/auth',authRoutes);
app.use('/task',taskRouter);
app.use('/token',tokenRoutes);
app.use('/user',userRoutes);


const PORT = 3000
app.listen(PORT, () =>{
    console.log(`SERVER RUNNING AT PORT ${PORT}`);
})


