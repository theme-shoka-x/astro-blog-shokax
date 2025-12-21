/**
 * 生成一个较亮的随机颜色（RGB 分量在 128~255 之间）
 * @returns 十六进制颜色字符串（如 #c1d3f0）
 */
export function generateRandomBrightColor(): string {
  const getRandomColorValue = (): number => Math.floor(Math.random() * 128 + 128);
  const toHex = (value: number): string => value.toString(16).padStart(2, "0");

  const r = getRandomColorValue();
  const g = getRandomColorValue();
  const b = getRandomColorValue();

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
