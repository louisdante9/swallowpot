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
    let phoneNo = parseInt(req.body.phone, 10);
    if (!req.body.username) {
      return res.status(401).json({
        message: 'username field can not be empty'
      });
    } else if (!req.body.password) {
      return res.status(401).send({
        message: 'Password field can not be empty'
      });
    } else if (!req.body.email) {
      return res.status(401).send({
        message: 'Email field can not be empty'
      });
    } else if (!validator.isEmail(req.body.email)) {
      return res.status(401).send({
        message: 'Please put in a proper email address'
      });
    } else if (!req.body.firstname) {
      return res.status(401).send({
        message: 'Firstname field can not be empty'
      });
    } else if (!req.body.lastname) {
      return res.status(401).send({
        message: 'Lastname field can not be empty'
      });
    } else if (!phoneNo) {
      return res.status(401).send({
        message: 'Phone field can not be empty'
      });
    } else if (/^\d{11}$/.test(phoneNo) ) {
      return res.status(401).send({
        message: 'phone number has to be 11 digits'
      });
    }
    else {
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