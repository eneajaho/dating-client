/**
 * Checks if parameter is not null || undefined || ''
 */
export const paramIsCorrect = (param: any): boolean => {
  return param !== null && param !== undefined && param !== '';
}
