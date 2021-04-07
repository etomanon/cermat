import pup from 'puppeteer'
import { promises as fs } from 'fs'
import {
  CERMAT_URL,
  SUBJECT,
  CSI_URL,
  REDIZO,
  YEAR,
  REGION,
  MATH,
  SUBJECTS,
  TEST_TYPE,
  TEST_TYPES,
} from '../constants'
import { SELECT_OPTION, optionGetValue } from '../constants'
import { getTableData } from './getTableData'

/** Get CERMAT results & school info */
export default async (): Promise<void> => {
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
  for (const [i] of optionsYear.entries()) {
    const year = await optionsYear[i].evaluate(optionGetValue)
    optionsYearParsed.push(year)
  }
  // loop through every year
  for (const [, year] of optionsYearParsed.entries()) {
    console.log('year', year)
    const navigationPromise = page.waitForNavigation()
    await page.select(YEAR, year)
    await navigationPromise
    await page.waitForSelector(`${REGION} ${SELECT_OPTION}`)
    const regions = await page.$$eval(`${REGION} ${SELECT_OPTION}`, (options) =>
      options.map((el) => el.getAttribute('value'))
    )
    // loop through every region
    for (const region of regions) {
      await page.waitForSelector(`${REGION} ${SELECT_OPTION}`)
      if (region === 'X') {
        continue
      }
      const navigationPromise = page.waitForNavigation()
      await page.select(REGION, region)
      await navigationPromise

      await page.waitForSelector(`${SUBJECT}`)
      // loop through selected subjects in constant
      for (const subject of SUBJECTS) {
        const subjectSelected = await page.evaluate((SUBJECT) => {
          const e = document.querySelector(SUBJECT) as HTMLSelectElement
          const subjectSelected = e.options[e.selectedIndex].value
          return subjectSelected
        }, SUBJECT)

        if (subjectSelected !== subject) {
          const navigationPromise = page.waitForNavigation()
          await page.select(SUBJECT, subject)
          await navigationPromise
        }
        // Get "Ustni zkouska" & "Didakticky test" test types for all but Math
        if (subject !== MATH) {
          for (const testType of TEST_TYPES) {
            await page.waitForSelector(`${TEST_TYPE}`)
            const testTypeSelected = await page.evaluate((TEST_TYPE) => {
              const e = document.querySelector(TEST_TYPE) as HTMLSelectElement
              const testTypeSelected = e.options[e.selectedIndex].value
              return testTypeSelected
            }, SUBJECT)

            if (testType !== testTypeSelected) {
              const navigationPromise = page.waitForNavigation()
              await page.select(TEST_TYPE, testType)
              await navigationPromise
            }
            await getTableData(
              page,
              `${subject}_${testType}`,
              year,
              region,
              resultsData,
              schoolsData
            )
          }
          continue
        }
        await getTableData(
          page,
          subject,
          year,
          region,
          resultsData,
          schoolsData
        )
      }
    }
  }
  const schoolError: string[] = []
  // GET school location and name
  for (const [i, s] of schoolsData.entries()) {
    try {
      console.log(`School ${i + 1} of ${schoolsData.length}`)
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
    } catch (e) {
      schoolError.push(s[REDIZO] as string)
    }
  }

  const data = JSON.stringify({ schools: schoolsData, results: resultsData })
  const schoolErrorData = JSON.stringify({ schoolError })
  await fs.writeFile('data.json', data)
  await fs.writeFile('dataSchoolError.json', schoolErrorData)
  await browser.close()
  console.log('DONE')
  return
}
