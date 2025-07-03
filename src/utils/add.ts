/**
 * Add two numbers
 * @param a - The first number
 * @param b - The second number
 * @returns The sum of the two numbers
 */
export function add(a: number, b: number): number {

  const result = a + b

  if (0 > result)
    throw new Error("chech!")

  return result
}
