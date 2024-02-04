const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorize = require('../middleware/authorize');
const SECRET_KEY = 'a6cfdc61521e915a69980ad06ab80a6e769c1e700818c885d31f2ce4d84b5127';


const index = async (_req, res) => {
    try {
      const data = await knex('user');
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving Users: ${err}`)
    }
  }

  const add = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send("Please enter the required fields.");
    }

	// Create a hashed Password using brcrypt.hashSync(password) 
	const hashedPassword = bcrypt.hashSync(password)

    // Create the new user
    const newUser = {
        email,
        password: hashedPassword, //update password to use hashed password
    };

    // Insert it into our database
    try {
        await knex('user').insert(newUser);
        res.status(201).send("Registered successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed registration");
    }
  }

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Please enter the required fields");
    }

    // Find the user using the email 
	  const user = await knex('user').where({email: email}).first();
	  // If theres no user return a status of 400 and send text "Invalid email"
	  if (!user) {
		  return res.status(400).send("Invalid Email")
	  }

    // Validate the password using bcrypt.compareSync(password, user.password)
	  const isPasswordCorrect = bcrypt.compareSync(password, user.password)
	  // If the password is not correct then send send status of 400 with a message "Invalid Password"
	  if(!isPasswordCorrect) {
		  return res.status(400).send("Invalid Password")
	  }
    // Generate a token with JWT
	  const token = jwt.sign(
		  {id: user.id, email: user.email},
		  SECRET_KEY,
		  { expiresIn: '24h' }
	)
	// Issue the user their token 
    res.json({ token: token })
  }

  const userCurrent = async (req, res) => {
     // If there is no auth header provided
    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
    }
    // console.log(req.headers.authorization);
    // Parse the bearer token

    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(' ')[1];

    console.log(authToken);
    // create a variable that stores the authorization token
    // Create a variable to split the auth header and store the second item in the arra
      // Verify the token
    try {
        // Use jwt.verify to verify the token as compared to your JWT_KEY inside of the .env
            const decoded = jwt.verify(authToken, SECRET_KEY);
            console.log(decoded);
        // Respond with the appropriate user data
        const user = await knex('user').where({id: decoded.id}).first();

        console.log(user);
        // Get the user by accessing the users table and retrieving the user by decoded.id
        // dont forget to delete the password before sending back the users info
        delete user.password
            res.json(user);
        } catch (error) {
            return res.status(401).send("Invalid auth token");
        }
  }

  const retrieveUser = async (req, res) => {
    try {
      const users = await knex
      .select("*")
      .from("user")
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Unable to retrieve users data" });
    }
  }


module.exports = {
    index,
    add,
    login,
    userCurrent,
    retrieveUser
  }