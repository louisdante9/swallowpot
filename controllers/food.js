import Food  from '../models/order';


class Foods {
    /**
   * create a new food
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  async create(req, res) {
    const { nameOfFood, typeOfFood, availability } = req.body;
    // return console.log('========>', req.body)
    const orderFound = await Order.findOne({
        nameOfFood: nameOfFood.trim().toLowerCase()
    })
      try {
        if (orderFound) {
          return res.status(409).send({
            error: 'sorry food with that username already exist'
          });
        }
        const food = new Order({
            nameOfFood: nameOfFood.trim().toLowerCase(),
            typeOfFood: typeOfFood.trim().toLowerCase(),
            availability: availability.trim().toLowerCase()
        });
        const newFood = await food.save();
        try {
          if (newFood) {
            return res.status(201).send({
              message: `Food was created successfully`,
              food: newFood
            })
          }
        } catch (error) {
          return res.status(400).send(error.message);
        }
      } catch(err) {
        return res.status(400).send({ err })
      }
  }
  /**
   * get all orders
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  async getAllFoods(req, res) {
    const foodsFound = Food.find();
    return console.log(foodsFound)
  }
}
module.exports = new Foods();