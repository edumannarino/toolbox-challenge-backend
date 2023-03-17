import { Router } from 'express'
import * as filesController from '../controllers/files.js'

const router = Router()

router.get('/files/data', filesController.formatFiles)
router.get('/files/list', filesController.getFiles)

export default router
