import {Router} from 'express'
import { getFlowers, addFlower, removeItem, getOrders, createOrder, updateOrderStatus, setSalePrice } from '../mysql/mysql.cjs'


const router = Router()

router.post('/api/db/getFlowers', getFlowers)
router.post('/api/db/addFlower', addFlower)
router.post('/api/db/removeItem', removeItem)
router.post('/api/db/getOrders', getOrders)
router.post('/api/db/createOrder', createOrder)
router.post('/api/db/updateOrderStatus', updateOrderStatus)
router.post('/api/db/setSalePrice', setSalePrice)
export default router