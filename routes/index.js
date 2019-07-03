import express from 'express';
import { Admins, Foods } from '../controllers';
import validateInput from '../utils/validations';
// import jwtVerify from '../utils/jwtVerify';
const router = express.Router();

// router.get('/', (res) => {
//   res.render('home.ejs');
// });

// new end points
router.post('/admin/signup',validateInput.adminInput, Admins.adminSignup);
router.post('/admin/signin', validateInput.adminInput, Admins.adminSignin);
router.get('/admin/order',  Foods.getAllFood);
router.get('/admin/order/:id',  Foods.getOneFood);
router.post('/admin/order/new', validateInput.validateFood, Foods.create);
router.put('/admin/order/:id', validateInput.validateFood, Foods.update);
router.delete('/admin/order', Foods.delete);
// router.post('/admin/parcel', jwtVerify.verifyToken, validateInput.createParcel, Admins.createParcel);
// router.get('/admin/parcel/:id', Admins.getOneParcel);
// router.post('/admin/parcel/:id',  Admins.updateParcel);
// router.get('/admin/parcel', jwtVerify.verifyToken, Admins.getAllParcels);



export default router;