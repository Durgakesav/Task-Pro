
const nameSchema = require('./models/Tasks')
const userSchema = require('./models/Users')
const taskController1 = require('./Controllers/taskController')
const userController1 = require('./Controllers/userController')
console.log('Running nodemon successfully');
require('dotenv').config();

let express = require('express');
const router = express.Router()
const mongoose = require('mongoose');

const app = express();

const cors = require('cors');
const authUser = require('./middleware/authUser');

app.use(cors({
    origin:'*'
}))

app.use('/uploads', express.static('uploads'));

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });




app.post('/api/uploadProfilepic/:id', upload.single('profilePic'), async (req, res) => {
  try {
    // Normalize path (replace backslashes with forward slashes)
    const normalizedPath = req.file.path.replace(/\\/g, '/');

    // Update the user's profilePic with the normalized path
    const user = await userSchema.findByIdAndUpdate(
      req.params.id,
      { profilePic: normalizedPath },
      { new: true }
    );
    res.status(200).json({ message: 'Upload successful', user });
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ error: error.message });
  }
});




app.use(express.json());

app.post('/api/signup',userController1.create);

app.post('/api/login',userController1.login);



app.get('/api/gettasksofuser/:id',taskController1.gettasksofuser);

app.get('/api/getProfile/:id',userController1.getProfile)

//create
app.post('/api/addtasks/:id',taskController1.create);

app.get('/api/protected', authUser, (req, res) => {
  res.json({
    message: "This is protected data",
    userId: req.user.userID ,
    email:req.user.email
    // Note: use userID, not id
  });
});


//delete

app.delete('/api/deletetasks/:id',taskController1.deleted)



app.put('/api/updatework/:id',taskController1.update)





app.listen(process.env.PORT, () => {
    console.log('Server running on port 5000 successfully');
});

