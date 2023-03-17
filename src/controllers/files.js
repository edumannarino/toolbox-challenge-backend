import * as filesUseCases from '../usecases/files.js'
import * as filesService from '../services/files.js'

export async function formatFiles (req, res) {
  try {
    const fileName = req.query.fileName
    const data = await filesUseCases.formatFiles(fileName)
    return res.json(data)
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error })
  }
}

export async function getFiles (req, res) {
  try {
    const files = await filesService.getFiles()
    return res.json(files)
  } catch (error) {
    return res.status(error?.status || 500).json({ message: error?.message || error })
  }
}
