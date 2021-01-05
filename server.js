const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
//connect db
connectDB();
//initmiddleware
app.use(cors());
app.use(express.json({extended:false}));

//app.get('/',(req,res)=>res.send('API Running'));

//define routes
app.use('/api/users',require('./routes/api/users'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/profile/experience',require('./routes/api/profile'))
app.use('/api/profile/education',require('./routes/api/profile'))
app.use('/api/auth',require('./routes/api/auth'))

const PORT = process.env.PORT || 5001;

app.listen(PORT,()=>console.log(`Server started port ${PORT}`));
