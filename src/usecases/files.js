import * as filesService from '../services/files.js'
import { formatCSVtoJSON } from '../utils/formatter.js'

export async function formatFiles (fileName) {
  try {
    const result = []
    let files
    if (fileName) { files = { files: [fileName] } } else { files = await filesService.getFiles(fileName) }
    for (const file of files.files) {
      try {
        const fileData = await filesService.downloadFile(file)
        const json = formatCSVtoJSON(file, fileData)
        if (json) { result.push(json) }
      } catch {
        console.log(`Error Downloading File ${file}`)
      }
    }

    return result
  } catch (error) {
    throw new Error({ status: error.status ? error.status : 500, message: error.message })
  }
}
