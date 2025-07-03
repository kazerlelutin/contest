export function noCover(yes: boolean, maybe: boolean, no: boolean) {

  if (maybe && yes && no) {
    return "hi norman guy"
  }
  if (!yes && maybe && no) {
    return "cat"
  }
  if (yes) {
    return "yes"
  }
  if (maybe) {
    return "maybe"
  }
  return "no"
}
