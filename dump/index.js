const fs = require('fs')
const slug = require('slug')
const matter = require('gray-matter')
const works = require('./works.json')
const artists = require('./artists.json')
const exposures = require('./exposures.json')
const events = require('./events.json')

artists.forEach(artist => {
  const frontmatter = matter.stringify('', {
    template: 'artist',
    title: `${[(artist.firstName || '').trim(), (artist.lastName || '').trim()].filter(s => s).join(' ')}`,
    location: (artist.location || '').trim(),
    field: (artist.type || '').trim(),
    birth: parseInt(artist.birth) || 0,
    death: parseInt(artist.dead) || 0,
    expose: artist.exposed,
    biography: (artist.bio || '').trim(),
    exhibitions: exposures
      .filter(exposure => parseInt(exposure.artist) === parseInt(artist._id))
      .map(exposure => ({
        title: (exposure.title || '').trim(),
        location: (exposure.location || '').trim(),
        start: exposure.dateStart,
        end: exposure.dateEnd,
      })),
    works: works
      .filter(work => parseInt(work.artist) === parseInt(artist._id))
      .map(work => ({
        title: (work.title || work._id).trim(),
        image: `/forestry/${slug((work.title || work._id), { lower: true })}.jpg`,
        technique: (work.technique || '').trim(),
        dimensions: {
          height: parseInt((work.dimensions || '').split(/x/i)[0]) || null,
          width: parseInt((work.dimensions || '').split(/x/i)[1]) || null,
          depth: parseInt((work.dimensions || '').split(/x/i)[2]) || null,
        },
        description: (work.description || '').trim(), // search for /(\/? ?(\d+(? )?(?EUR|€)))/
        price: parseInt(work.priceSale),
        sold: work.sold,
      })),
  })

  fs.writeFileSync(
    `${__dirname}/../src/pages/artists/${slug(`${[(artist.firstName || '').trim(), (artist.lastName || '').trim()].filter(s => s).join(' ')}`, { lower: true })}.md`,
    frontmatter,
  )
})

artists
  .filter(artist => artist.exposed && fs.existsSync(`${__dirname}/../src/pages/artists/${slug(`${[(artist.firstName || '').trim(), (artist.lastName || '').trim()].filter(s => s).join(' ')}`, { lower: true })}.md`))
  .forEach(artist => {
    const file = `${__dirname}/../src/pages/artists/${slug(`${[(artist.firstName || '').trim(), (artist.lastName || '').trim()].filter(s => s).join(' ')}`, { lower: true })}.md`
    const md = fs.readFileSync(file, 'utf8')
    const append = matter.stringify('', { redirect_from: [`/${artist.slug}/`] })
    fs.writeFileSync(file, `${md.substr(0, md.length - 5)}${append.substr(4)}`)
  })

function getFormattedDate (foo) {
  var date = new Date(foo)
  var year = date.getFullYear()

  var month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month

  var day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day

  return month + '/' + day + '/' + year
}

fs.writeFileSync(
  `${__dirname}/../src/pages/expositions.md`,
  matter.stringify('', {
    template: 'exhibitions',
    exhibitions: events
      .reverse()
      .map(event => ({
        template: 'exhibition',
        title: (event.title || '').trim(),
        image: `/forestry/${slug((event.title || event._id), { lower: true })}.jpg`,
        content: [
          (event.description || '').trim(),
          (event.youtube || '').trim(),
          `_Du ${getFormattedDate(event.dateStart * 1000)} au ${getFormattedDate(event.dateEnd * 1000)}_`,
        ].filter(s => s).join('\n\n'),
      })),
  }),
)
