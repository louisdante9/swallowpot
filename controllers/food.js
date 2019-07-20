
import Food  from '../models/food';


class Foods {
    /**
   * create a new food
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  async create(req, res) {
    const { nameOfFood, typeOfFood, availability } = req.body;
    const orderFound = await Food.findOne({
        nameOfFood: nameOfFood.trim().toLowerCase()
    })
      try {
        if (orderFound) {
          return res.status(409).send({
            error: 'sorry food with that username already exist'
          });
        }
        const food = new Food({
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
   * get all food
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  async getAllFood(req, res) {
    const foodsFound = await Food.find({});
    try {
      if (!foodsFound) {
        return res.status(404).send({
          message: 'Food list is empty'
        })
      }
      res.status(200).send({
        message: 'Here are the list of available food',
        foodsFound
      })
    } catch (error) {
      res.status(400).send({
        error: error.message
      });
    }
  }
  
   /**
   * get one food
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  async getOneFood(req, res) {
    const foodFound = await Food.findOne({nameOfFood: req.params.id.toLowerCase()});
    try {
      if (!foodFound) {
        return res.status(404).send({
          message: 'Food not found'
        })
      }
      res.status(200).send({
        message: 'Here are the list of available food',
        foodFound
      })
    } catch (error) {
      res.status(400).send({
        error: error.message
      });
    }
  }

  /**
   * update food 
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  async update(req, res) {
    const { nameOfFood, typeOfFood, availability } = req.body
    const foodFound = await Food.findOne({nameOfFood: req.params.id.toLowerCase()});
    try {
      if (!foodFound) {
        return res.status(404).send({
          message: 'Food not found'
        })
      }
      var query = { nameOfFood: req.params.id }
      const foodUpdateInfo = {
          $set: {
            nameOfFood: nameOfFood.trim().toLowerCase(),
            typeOfFood: typeOfFood.trim().toLowerCase(),
            availability: availability.trim().toLowerCase()
          },
        };

      const updatedFood = await Food.findOneAndUpdate(query, foodUpdateInfo, {new: true})
      try {
        if(updatedFood) {
          res.status(201).send({
            message: 'updated was successfully',
            updatedFood
          });
        }
      } catch (error) {
          res.status(400).send({
          error: error.message
        });
      }
    } catch (error) {
      res.status(400).send({
        error: error.message
      });
    }
  }

  /**
   * delete food 
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  async delete(req, res) {
    const { nameOfFood } = req.body
    const foodFound = await Food.findOne({nameOfFood: nameOfFood.trim().toLowerCase()});
    try {
      if (!foodFound) {
        return res.status(404).send({
          message: 'Food not found'
        })
      }
      // return console.log(foodFound, '==========>')
      var query = { nameOfFood: nameOfFood.trim().toLowerCase() }

      const deletedFood = await Food.findOneAndRemove(query)
      try {
        if(deletedFood) {
          res.status(201).send({
            message: 'Food was delete successfully',
          });
        }
      } catch (error) {
          res.status(400).send({
          error: error.message
        });
      }
    } catch (error) {
      res.status(400).send({
        error: error.message
      });
    }
  }
}
module.exports = new Foods();