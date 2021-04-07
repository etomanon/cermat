import puppeteer from 'puppeteer'
import { DATA_INDEX_RESULTS, DATA_INDEX_SCHOOL, REDIZO } from '../constants'

/** Parse data from CERMAT table */
export const getTableData = async (
  page: puppeteer.Page,
  subject: string,
  year: string,
  region: string,
  resultsData: Record<string, string | number>[],
  schoolsData: Record<string, string | number>[]
): Promise<void> => {
  const tds = await page.evaluate(() => {
    const result: Record<string, string[]> = {}
    const getNextSchool = (el: Element) => {
      const data = Array.from(el.children).map((el) => el.innerHTML)
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
    subject,
  } as Record<string, string | number>
  let schoolExtracted = {
    region,
  } as Record<string, string | number>

  const tdParsed = JSON.parse(tds) as Record<string, string[]>

  Object.keys(tdParsed).forEach((key) => {
    resultsExtracted = {
      school: key,
      year,
      subject,
    }
    schoolExtracted = {
      region,
    }
    const tdData = tdParsed[key]
    Object.keys(DATA_INDEX_SCHOOL).forEach((key) => {
      const label = DATA_INDEX_SCHOOL[key]
      const data = tdData[key]
      schoolExtracted[label] = data
    })

    Object.keys(DATA_INDEX_RESULTS).forEach((key) => {
      const label = DATA_INDEX_RESULTS[key]
      const data = tdData[key]
      resultsExtracted[label] = parseFloat(data.replace(',', '.'))
    })

    if (
      !schoolsData.some(
        // @ts-ignore
        (s) => s[REDIZO] === schoolExtracted[REDIZO]
      )
    ) {
      schoolsData.push(schoolExtracted)
    }
    resultsData.push(resultsExtracted)
  })

  console.log('Year', year)
  console.log('Schools: ', schoolsData.length)
  console.log('Results: ', resultsData.length)
}
