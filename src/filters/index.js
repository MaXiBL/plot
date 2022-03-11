


// 中间...
export function encryption(value) {
  if (!value) return value;
  const start = value.substr(0, 6)
  const end = value.substr(-6)
  return start + '……' + end
}
// 开头...
export function startEncryption(value) {
  if (!value) return value;
  console.log(value.length)
  if (value.length<6) return value;
  const start = value.substr(0, 6)
  return start + '…'
}
