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
<<<<<<< HEAD
  createParcel(req, res, next) {
    const {
      clientName,
      clientEmail,
      clientPhone,
      receiverName,
      receiverPhone,
      receiverAddress,
      trackingNo,
      type,
      weight,
      totalFrieght,
      bookingDate,
      scheduledDate,
      fromCity,
      toCity
     } = req.body;
    if (typeof (clientName) === 'undefined' || validator.isEmpty(clientName)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (clientEmail) === 'undefined' || validator.isEmpty(clientEmail)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (clientPhone) === 'undefined' || validator.isEmpty(clientPhone)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (receiverName) === 'undefined' || validator.isEmpty(receiverName)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (receiverPhone) === 'undefined' || validator.isEmpty(receiverPhone)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (receiverAddress) === 'undefined' || validator.isEmpty(receiverAddress)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (trackingNo) === 'undefined' || validator.isEmpty(trackingNo)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (type) === 'undefined' || validator.isEmpty(type)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (weight) === 'undefined' || validator.isEmpty(weight)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (totalFrieght) === 'undefined' || validator.isEmpty(totalFrieght)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (bookingDate) === 'undefined' || validator.isEmpty(bookingDate)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (scheduledDate) === 'undefined' || validator.isEmpty(scheduledDate)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (fromCity) === 'undefined' || validator.isEmpty(fromCity)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (toCity) === 'undefined' || validator.isEmpty(toCity)) {
=======
  validateFood(req, res, next) {
    const {
      nameOfFood, typeOfFood, availability
     } = req.body;
    if (typeof (nameOfFood) === 'undefined' || validator.isEmpty(nameOfFood)) {
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } else if (typeof (typeOfFood) === 'undefined' || validator.isEmpty(typeOfFood)) {
>>>>>>> added setup for the app
      return res.status(401).json({
        message: 'Content field must not be empty'
      });
    } 
    
    return next();
  }
};
export default validateInput;