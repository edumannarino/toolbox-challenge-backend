import express from 'express'
import cors from 'cors'
import filesRouter from './routes/files.js'

const app = express()
try {

  app.use(cors({origin: '*'}))
  app.use('/', filesRouter)

  const port = 5000
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
} catch (error) {
  console.log(`Error: ${error}`)
}

export default app
