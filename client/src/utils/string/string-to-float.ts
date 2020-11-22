export const stringToFloat = (value: string | number) =>
  typeof value === 'string' ? parseFloat(value) : value
