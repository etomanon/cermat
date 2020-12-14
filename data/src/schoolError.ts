import fs from 'fs/promises'
import path from 'path'
import pup from 'puppeteer'
import { CSI_URL } from './cermat/constants'

const init = async () => {
  const browser = await pup.launch({
    headless: true,
    args: ['--shm-size=3gb'],
    devtools: false,
  })
  const page = await browser.newPage()

  const response = await fs.readFile(
    path.join(__dirname, '..', 'data.json'),
    'utf8'
  )
  const responseError = await fs.readFile(
    path.join(__dirname, '..', 'dataSchoolError.json'),
    'utf8'
  )
  const data = JSON.parse(response)
  const dataError = JSON.parse(responseError)

  // GET school location and name
  for (const redizo of dataError.schoolError) {
    await page.goto(`${CSI_URL}/${redizo}`)
    const gps = await page.evaluate(() => {
      const iframe = document.querySelector('.hpBlockRight iframe')
      if (!iframe) {
        return '0,0'
      }
      const src = iframe.getAttribute('src')
      const url = new URL(src)
      const q = url.searchParams.get('q')
      return q
    })
    const latLng = gps.split(',')
    const lat = parseFloat(latLng[0])
    const lng = parseFloat(latLng[1])
    const name = await page.evaluate(() => {
      const h1 = document.querySelector('.school1 h1')
      if (!h1) {
        return 'unknown'
      }
      return h1.innerHTML
    })

    const region = await page.evaluate(() => {
      const tds = Array.from(
        document.querySelectorAll('.ui-accordion-content td')
      )

      const td = tds.find((td) => td.innerHTML.includes('Kraj:'))
      const text = td.innerHTML.split('Kraj: ').pop()
      const index = text.indexOf('<')
      return text.substring(0, index)
    })
    const dataSchool = {
      name,
      region,
      lat,
      lng,
      redizo,
    }

    console.log('dataSchool', dataSchool)
    data.schools = data.schools.filter((s) => s.redizo !== redizo)
    data.schools.push(dataSchool)
  }

  await fs.writeFile(
    path.join(__dirname, '..', 'data.json'),
    JSON.stringify(data)
  )
  await browser.close()
  process.exit()
}

init()
