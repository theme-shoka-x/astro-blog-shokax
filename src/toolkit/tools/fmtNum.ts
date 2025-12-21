/**
 * 将数字格式化为两位数的字符串，如果数字小于10，则在前面补0，否则返回数字本身的字符串形式。
 * 不接受负数输入。
 * @param num 需要格式化的数字
 * @returns 格式化后的字符串
 * @throws 如果输入的数字小于0，则抛出错误
 */
export function fmtNum(num: number) {
  if (num < 0) {
    throw new Error("Number must be non-negative");
  }
  return num < 10 ? `0${num}` : String(num);
}
