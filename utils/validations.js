import validator from 'validator';

const validateInput = {
  /**
   * @method signupInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signupInput(req, res, next) {
    if (typeof (req.body.userId) === 'undefined') {
      return res.status(401).json({
        message: 'userId field can not be empty'
      });
    } else if (typeof (req.body.password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field can not be empty'
      });
    } else if (typeof (req.body.email) === 'undefined') {
      return res.status(401).send({
        message: 'Email field can not be empty'
      });
    } else if (!validator.isEmail(req.body.email)) {
      return res.status(401).send({
        message: 'Please put in a proper email address'
      });
    } else if (typeof (req.body.firstname) === 'undefined') {
      return res.status(401).send({
        message: 'Firstname field can not be empty'
      });
    } else {
      return next();
    }
  },
  /**
   * @method signInInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signInInput(req, res, next) {
    if (typeof (req.body.userId) === 'undefined') {
      return res.status(401).json({
        message: 'userId field can not be empty'
      });
    } else if (typeof (req.body.password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field can not be empty'
      });
    }
    return next();
  },
  /**
   * @method signInInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  adminInput(req, res, next) {
    if (typeof (req.body.username) === 'undefined') {
      return res.status(401).json({
        message: 'username field can not be empty'
      });
    } else if (typeof (req.body.password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field can not be empty'
      });
    }
    return next();
  },

  /**
   * @method updateIdea
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  validateFood(req, res, next) {
    const {
      nameOfFood, typeOfFood, availability
     } = req.body;
    if (typeof (nameOfFood) === 'undefined' || validator.isEmpty(nameOfFood)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (typeOfFood) === 'undefined' || validator.isEmpty(typeOfFood)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } 
    
    return next();
  }
};
export default validateInput;