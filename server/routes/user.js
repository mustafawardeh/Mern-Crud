import express from 'express'
import { AddUser, DeleteUser, EditUser, ViewUsers } from '../controllers/users.js'

const router = express.Router()

// View Users
router.get('/', ViewUsers)

// Add User
router.post('/', AddUser)


// Edit Users
router.patch('/:id',EditUser)


// Delete Users
router.delete('/:id', DeleteUser)

export default router