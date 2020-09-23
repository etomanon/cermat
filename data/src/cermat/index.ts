import pup from 'puppeteer'
import { promises as fs } from 'fs'
import {
  CERMAT_URL,
  SUBJECT,
  MATH_INDEX,
  SCHOOL,
  CSI_URL,
  REDIZO,
  DATA_INDEX_SCHOOL,
  DATA_INDEX_RESULTS,
  YEAR,
  REGION,
  MATH,
} from './constants'
import { SELECT_OPTION, optionGetValue } from '../common/elements'

export default async () => {
  const resultsData = [] as Record<string, string | number>[]
  const schoolsData = [] as Record<string, string | number>[]
  const browser = await pup.launch({
    headless: false,
    args: ['--shm-size=3gb'],
    devtools: true,
  })
  const page = await browser.newPage()
  page.on('console', (msg) => {
    if (msg.type && msg.text) {
      return console[msg.type()]('PAGE LOG:', msg.text())
    } else {
      return
    }
  })

  await page.goto(CERMAT_URL)
  await page.waitForSelector(`${YEAR} ${SELECT_OPTION}`)
  const optionsYear = await page.$$(`${YEAR} ${SELECT_OPTION}`)
  const optionsYearParsed: string[] = []
  for (const [i, opt] of optionsYear.entries()) {
    const year = await optionsYear[i].evaluate(optionGetValue)
    optionsYearParsed.push(year)
  }
  console.log('optionsYearParsed', optionsYearParsed)
  for (const [i, year] of optionsYearParsed.entries()) {
    console.log('year', year)
    await page.select(YEAR, year)
    if (i > 0) {
      await page.waitForNavigation()
    }
    await page.waitForSelector(`${REGION} ${SELECT_OPTION}`)
    let optionsRegion = await page.$$(`${REGION} ${SELECT_OPTION}`)

    for (const [i, opt] of optionsRegion.entries()) {
      if (!optionsRegion[i]) {
        continue
      }
      await page.waitForSelector(`${REGION} ${SELECT_OPTION}`)
      optionsRegion = await page.$$(`${REGION} ${SELECT_OPTION}`)
      const region = await optionsRegion[i].evaluate(optionGetValue)
      if (region === 'X') {
        continue
      }
      await page.select(REGION, region)

      await page.waitForNavigation()

      await page.waitForSelector(`${SUBJECT}`)
      const subjectSelected = await page.evaluate((SUBJECT) => {
        const e = document.querySelector(SUBJECT) as HTMLSelectElement
        const subjectSelected = e.options[e.selectedIndex].value
        return subjectSelected
      }, SUBJECT)
      if (subjectSelected !== MATH) {
        const optionsSubject = await page.$$(`${SUBJECT} ${SELECT_OPTION}`)
        const subject = await optionsSubject[MATH_INDEX].evaluate(
          optionGetValue
        )
        await page.select(SUBJECT, subject)
        await page.waitForNavigation()
      }

      const tds = await page.evaluate(() => {
        const result: Record<string, string[]> = {}
        const getNextSchool = (el: Element) => {
          const data = Array.from(trSchool.children).map((el) => el.innerHTML)
          result[data[1]] = data
          if (el.nextElementSibling) {
            getNextSchool(el.nextElementSibling)
          }
        }
        const trs = document.querySelectorAll('#table tr')
        const trSchool = Array.from(trs)
          .filter((tr) => {
            const style = getComputedStyle(tr)
            return style.borderTop === '3px solid rgb(0, 0, 0)'
          })
          .pop()
        getNextSchool(trSchool)
        return JSON.stringify(result)
      })
      let resultsExtracted = {
        year,
        subject: 'math',
      } as Record<string, string | number>
      let schoolExtracted = {
        region,
      } as Record<string, string | number>
      const getTdData = (data: string, i: number) => {
        if (DATA_INDEX_SCHOOL[i]) {
          schoolExtracted[DATA_INDEX_SCHOOL[i]] = data
        }
        if (DATA_INDEX_RESULTS[i]) {
          resultsExtracted[DATA_INDEX_RESULTS[i]] = parseFloat(
            data.replace(',', '.')
          )
        }
      }
      Object.entries(JSON.parse(tds) as Record<string, string[]>).forEach(
        ([key, value]) => {
          resultsExtracted = {
            school: key,
            year,
            subject: 'math',
          }
          schoolExtracted = {
            region,
          }
          value.forEach(getTdData)
          if (
            !schoolsData.includes(
              // @ts-ignore
              (s) => s[REDIZO] === schoolExtracted[REDIZO]
            )
          ) {
            schoolsData.push(schoolExtracted)
          }
          resultsData.push(resultsExtracted)
        }
      )
    }
  }

  // GET school location and name
  for (const [i, s] of schoolsData.entries()) {
    await page.goto(`${CSI_URL}/${s[REDIZO]}`)
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
    schoolsData[i]['lat'] = parseFloat(latLng[0])
    schoolsData[i]['lng'] = parseFloat(latLng[1])
    const name = await page.evaluate(() => {
      const h1 = document.querySelector('.school1 h1')
      if (!h1) {
        return 'unknown'
      }
      return h1.innerHTML
    })
    schoolsData[i]['name'] = name
  }

  const json = JSON.stringify({ schools: schoolsData, results: resultsData })
  await fs.writeFile('schools.json', json)
  await browser.close()
  console.log('DONE')
  return
}
