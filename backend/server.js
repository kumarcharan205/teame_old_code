// server.js

const express = require('express')
const mysql = require('mysql2')
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projectslist',
})

if (connection){
  console.log("database connected")
}
else{
  console.log(connection.err)
}






// app.get('/api/users', (req, res) => {
//   const getUsersQuery = 'SELECT * FROM users'

//   connection.query(getUsersQuery, (err, results) => {
//     if (err) {
//       console.error('Error executing MySQL query:', err)
//       res.status(500).json({ error: 'Failed to fetch users.' })
//     } else {
//       console.log('Users fetched successfully.')
//       const users = results.map((user) => ({
//         id: user.id,
//         email: user.email,
//         isActive: user.isActive,
//         created_at: user.created_at,
//         isAdmin: user.isAdmin,
//       }))
//       res.status(200).json(users)
//     }
//   })
// })

// Update user isActive endpoint



app.post('/api/register', (req, res) => {
  const { name,email, password} = req.body
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?'
  const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
  console.log("response from frontend",req.body)
  // Check if the email is already registered
  connection.query(checkEmailQuery, [email], (err, results) => {
    console.log(results)
    if (err) {
      console.log('Error executing MySQL query:', err)
      res.send({message:"Failed to execute"})
      // res.status(500).json({ error: 'Failed to register user.' })
    } else if (results.length > 0) {
      // Email is already registered
      res.send({message:"user already exists"})
      // res.status(401).json({ message: 'Email is already registered.' })
    } 
    else {
      // Insert the new user into the database
      connection.query(insertUserQuery, [name, email, password], (err, results) => {
        if (err) {
          console.log('Error executing MySQL query:', err)
          // res.status(500).json({ message: 'Failed to register user.' })
          res.send({message:"Failed to register user."})
        } else {
          console.log('User registered successfully.')
          // res.status(200).json({ message: 'User registered successfully.' })
          res.send({message:"User registered successfully."})
          
        }
      })
    }
  })
})
// Add user from Admin endpoint
// app.post('/api/users/add', (req, res) => {
//   const { email, password, isAdmin } = req.body
//   const checkEmailQuery = 'SELECT * FROM users WHERE email = ?'
//   const insertUserQuery =
//     'INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)'

//   // Check if the email is already registered
//   connection.query(checkEmailQuery, [email], (err, results) => {
//     if (err) {
//       console.error('Error executing MySQL query:', err)
//       res.status(500).json({ error: 'Failed to add user.' })
//     } else if (results.length > 0) {
//       // Email is already registered
//       res.status(400).json({ error: 'Email is already registered.' })
//     } else {
//       // Insert the new user into the database
//       connection.query(
//         insertUserQuery,
//         [email, password, isAdmin],
//         (err, results) => {
//           if (err) {
//             console.error('Error executing MySQL query:', err)
//             res.status(500).json({ error: 'Failed to add user.' })
//           } else {
//             console.log('User added successfully.')
//             res.status(200).json({ message: 'User added successfully.' })
//           }
//         },
//       )
//     }
//   })
// })


// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err)
      res.status(500).json({ error: 'Failed to validate login.' })
    } else {
      if (results.length > 0) {
        console.log('Login successful.')
        const user = results[0] // Get the first row from the result
        delete user.password // Remove password from the user object
        res.status(200).json({ message: 'Login successful.', user })
      } else {
        console.log('Invalid credentials.')
        res.status(401).json({ error: 'Invalid credentials.' })
      }
    }
  })
})










app.post('/api/data', async (req, res) => {
  console.log("fsfsjkf",req.body)
  // console.log("sajdasdadas",req)  
  
  const { training_name, trainer, skill, description, domain, seats, startDate, endDate } = req.body;
  // console.log("server",req.body)
// Rest of your code...

  const checkTrainingQuery = 'SELECT * FROM training_schedule WHERE training_name = ?';
  const insertTrainingQuery = 'INSERT INTO training_schedule (training_name, trainer, skill_title, description, domain, no_of_seats, startdate, enddate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  // Check if the training name already exists
  connection.query(checkTrainingQuery, [training_name], (err, results) => {
    console.log("Entered");
      if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).json({ error: 'Failed to add training.' });
      } else if (results.length > 0) {
          res.status(400).json({ error: 'Training is already registered.' });
      } else {
          // Insert the new training
          connection.query(
              insertTrainingQuery,
              [training_name, trainer, skill, description, domain, seats, startDate, endDate],
              (err, results) => {
                  if (err) {
                      console.error('Error executing MySQL query:', err);
                      res.status(500).json({ error: 'Failed to add training.' });
                  } else {
                      console.log('Training added successfully.');
                      res.status(200).json({ message: 'Training added successfully.' });
                  }
              },
          );
      }
  });
});


// Start the server
const port = 3001
app.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})
