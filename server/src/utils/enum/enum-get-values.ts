export const enumGetValues = (enumeration: any) => {
  const keys = Object.keys(enumeration).filter(
    (k) => typeof enumeration[k as any] === 'number'
  )
  const values = keys.map((k) => enumeration[k as any])

  return values
}
