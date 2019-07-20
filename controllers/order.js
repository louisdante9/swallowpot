
import Order from '../models/order';
import User from '../models/user';


class Orders {
    /**
   * create a new order
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
    async create(req, res) {
        const { order, street, city } = req.body;
        const userFound = await User.findOne({
            _id: req.decoded.id
        })

        try {
            if (!userFound) {
                return res.status(403).send({
                    error: 'access denied'
                });
            }

            const menu = {
                order: order.trim().toLowerCase(),
                street: street.trim().toLowerCase(),
                city: city.trim().toLowerCase(),
            }

            const clientOrder = new Order({
                ...menu,
                orderedBy: req.decoded.id
            });
            const newOrder = await clientOrder.save();
            try {
                if (newOrder) {
                    const updatedUser = await User.findByIdAndUpdate(
                        { _id: req.decoded.id },
                        { $push: { orders: { ...menu, _id: newOrder._id } } },
                        { safe: true, upsert: true }
                    )
                    if (!updatedUser) {
                        return res.status(400).send({
                            error: 'there was an error updating the user document'
                        });
                    }
                    return res.status(201).send({
                        message: `order was successfully created`,
                        order: newOrder
                    })
                }

            } catch (error) {
                return res.status(400).send(error.message);
            }
        } catch (error) {
            return res.status(400).send({ error })
        }

    }


    /**
     * get list of orders... this would be used by the admin
     * @param {any} req user request object
     * @param {any} res servers response
     * @return {void}
     */
    async listOrders(req, res) {
        const orderFound = await Order.find({}).populate('orderedBy');
        try {
            if (!orderFound) {
                return res.status(404).send({
                    message: 'Order list is empty'
                })
            }
            res.status(200).send({
                message: 'Here are the list of available orders',
                orderFound
            })
        } catch (error) {
            res.status(400).send({
                error: error.message
            });
        }
    }
    /**
* get a user's orders
* @param {any} req user request object
* @param {any} res servers response
* @return {void}
*/
    async userOrders(req, res) {
        const orderFound = await User.find({ _id: req.decoded.id }).populate('orders');
        try {
            if (!orderFound) {
                return res.status(404).send({
                    message: 'Order list is empty'
                })
            }
            res.status(200).send({
                message: 'Here are the list your previous orders',
                orderFound
            })

        } catch (error) {
            res.status(400).send({
                error: error.message
            });
        }
    }
}
module.exports = new Orders();