/**
 * Create object from string dot notation: a.b.c = { a: { b: { c: { } } } }
 * @param str
 * @param valueLast value for last object
 */
export const stringExpand = (
  str: string,
  valueLast = {}
): Record<string, unknown> =>
  str.split('.').reduceRight((acc, currentValue) => {
    return { [currentValue]: acc }
  }, valueLast)
