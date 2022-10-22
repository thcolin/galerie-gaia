const fs = require('fs/promises')
const path = require('path')
const matter = require('gray-matter')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const PAGES_DIR = path.resolve(__dirname, '..', 'src', 'pages')

;(async function() {
  const works = []

  for (const artist of await fs.readdir(path.resolve(PAGES_DIR, 'artists'))) {
    matter(await fs.readFile(path.resolve(PAGES_DIR, 'artists', artist), 'utf-8')).data.works
      .forEach(({ fields, styles, dimensions: { height, width, depth } = {}, ...work }) => {
        works.push({ ...work, fields: (fields || []).join(','), styles: (styles || []).join(','), height, width, depth })
      })
  }

  const doc = new GoogleSpreadsheet('1FaDn9wbsw6VznJMgL_pabP-RDtT4K7nqB1R1JZaOm9s')

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    private_key: process.env.GOOGLE_PRIVATE_KEY || '',
  })

  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  await sheet.setHeaderRow(Object.keys(works.reduce((acc, curr) => ({ ...acc, ...curr }), {})))
  await sheet.clearRows()
  await sheet.addRows(works)
}())
