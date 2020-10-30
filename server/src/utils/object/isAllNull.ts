/**
 * Check if all properties in object are null
 * @param object
 */
export const isAllNull = <T extends Record<string, unknown>>(
  object: T
): boolean => !Object.values(object).some((x) => x !== null && x !== '')
