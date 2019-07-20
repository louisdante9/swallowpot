import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

dotenv.config();

class Users {

  /**
 * signup a new user
 * @param {any} req user request object
 * @param {any} res servers response
 * @return {void}
 */
  async userSignup(req, res) {
    const { username, password, email, firstname, lastname, phone } = req.body;
    const userFound = await User.findOne({
      $or: [
        { username: username.trim().toLowerCase() },
        { 'email': email.trim().toLowerCase() }
      ]
    })
    try {
      if (userFound) {
        return res.status(409).send({
          error: 'sorry user with that username already exist'
        });
      }
      const user = new User({
        username: username.trim().toLowerCase(),
        password,
        firstname: firstname.trim().toLowerCase(),
        lastname: lastname.trim().toLowerCase(),
        email,
        phone
      });
      const newUser = await user.save();
      try {
        if (newUser) {
          const token = jwt.sign({
            id: newUser._id,
            username: newUser.username,
          }, process.env.SECRET, { expiresIn: 24 * 60 * 60 });
          return res.status(201).send({
            message: `Welcome!! ${req.body.username}`,
            user: newUser,
            token
          })
        }
      } catch (error) {
        return res.status(400).send(error.message);
      }
    } catch (err) {
      return res.status(400).send({ err })
    }
  }

  /**
     * signin a new user
     * @param {any} req user request object
     * @param {any} res servers response
     * @return { Object } token, message
     */

  async userSignin(req, res) {
    const { username, password } = req.body

    const userFound = await User.findOne({
      username: username.trim().toLowerCase()
    })
    try {
      if (!userFound) {
        return res.status(404).send({
          error: 'Failed to authenticate user'
        });
      }
      if (!bcrypt.compareSync(password, userFound.password)) {
        return res.status(401).send({
          error: 'Failed to authenticate user'
        });
      }
      if (userFound) {
        const token = jwt.sign({
          id: userFound.id,
          username: userFound.username
        }, process.env.SECRET, { expiresIn: 24 * 60 * 60 })
        return res.status(200).send({
          token,
          message: `Welcome ${userFound.username}`
        })
      }
    } catch (error) {
      res.status(500).send({
        error: error.message
      });
    }
  }

}
module.exports = new Users();