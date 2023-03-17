export function formatCSVtoJSON (fileName, csv) {
  const lines = csv.split('\n')
  if (lines.length <= 1) { return undefined }
  const result = { file: fileName, lines: [] }
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    let skip = false
    if (!lines[i]) {
      continue
    }

    const currentline = lines[i].split(',')
    if (currentline[0] !== fileName) {
      continue
    }
    for (let j = 1; j < headers.length; j++) {
      if (!currentline[j]) {
        skip = true
        continue
      }
      if (j === 2) { obj[headers[j]] = parseInt(currentline[j]) } else { obj[headers[j]] = currentline[j] }
    }
    if (!skip) { result.lines.push(obj) }
  }
  if (result.lines.length === 0) { return undefined }
  return result
}
