/**
 * Check if all properties in object are undefined or null
 * @param object
 */
export const isAllNil = <T extends Record<string, unknown>>(
  object: T
): boolean => Object.values(object).every((x) => x === undefined || x === null)
