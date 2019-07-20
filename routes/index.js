import express from 'express';
import { Admins, Foods, Users, Orders } from '../controllers';
import validateInput from '../utils/validations';
import verifyToken from '../utils/veriifyToken';
const router = express.Router();



/**
 * user end points
 */
router.post('/signup', validateInput.signupInput, Users.userSignup);
router.post('/signin', validateInput.adminInput, Users.userSignin);
router.post('/user/order', verifyToken.hasToken, Orders.create);
router.get('/user/orders', verifyToken.hasToken, Orders.userOrders);



/**
 * admin endpoints
 */
router.get('/admin/orders', verifyToken.hasToken, Orders.listOrders);
router.post('/admin/signup',validateInput.adminInput, Admins.adminSignup);
router.post('/admin/signin', validateInput.adminInput, Admins.adminSignin);
router.get('/admin/food',  Foods.getAllFood);
router.get('/admin/food/:id',  Foods.getOneFood);
router.post('/admin/food/new', validateInput.validateFood, Foods.create);
router.put('/admin/food/:id', validateInput.validateFood, Foods.update);
router.delete('/admin/food', Foods.delete);



export default router;