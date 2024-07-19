import { Router } from 'express'
import { getFlowers, addFlower, removeItem, getOrders, createOrder, updateOrderStatus, setSalePrice, setFlowerGroup } from '../mysql/mysql.cjs'

const secret_key = "l*isupersecretkeyla*c"

const router = Router()

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);
    if (token != secret_key) return res.sendStatus(403)
    next()
}


router.post('/api/db/getFlowers', getFlowers)
router.post('/api/db/addFlower', authenticateToken, addFlower)
router.post('/api/db/removeItem', authenticateToken, removeItem)
router.post('/api/db/getOrders', authenticateToken, getOrders)
router.post('/api/db/createOrder', createOrder)
router.post('/api/db/updateOrderStatus', authenticateToken, updateOrderStatus)
router.post('/api/db/setSalePrice', authenticateToken, setSalePrice)
router.post('/api/db/setFlowerGroup', authenticateToken, setFlowerGroup)

export default router