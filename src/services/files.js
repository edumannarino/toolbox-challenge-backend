import axios from 'axios'
const baseURL = 'https://echo-serv.tbxnet.com/v1/secret'
const APIKey = 'aSuperSecretKey'

export async function getFiles () {
  try {
    const url = `${baseURL}/files`
    const headers = {
      headers: {
        authorization: `Bearer ${APIKey}`
      }
    }
    const data = await axios.get(url, headers)
    return data.data
  } catch (error) {
    throw new Error({ status: 500, message: error.message })
  }
}

export async function downloadFile (fileName) {
  try {
    const url = `${baseURL}/file/${fileName}`
    const headers = {
      headers: {
        authorization: `Bearer ${APIKey}`
      }
    }
    const data = await axios.get(url, headers)
    return data.data
  } catch (error) {
    throw new Error({ status: 500, message: error.message })
  }
}
