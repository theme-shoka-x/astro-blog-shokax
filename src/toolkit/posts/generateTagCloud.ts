import { TinyColor } from "@ctrl/tinycolor";

interface Tag {
  name: string;
  count: number;
}

interface TagCloudOptions {
  minFontSize: number; // 最小字体大小（例如 12）
  maxFontSize: number; // 最大字体大小（例如 32）
  startColor: string; // 起始颜色，例如 '#888888'
  endColor: string; // 终止颜色，例如 '#ff0000'
  limit?: number; // 最大处理数量
}

interface TagCloudItem {
  name: string;
  count: number;
  fontSize: number;
  color: string;
}

/**
 * 生成标签云
 * @param tags 标签列表
 * @param options 配置项
 * @param options.minFontSize 最小字体大小
 * @param options.maxFontSize 最大字体大小
 * @param options.startColor 起始颜色
 * @param options.endColor 终止颜色
 * @param options.limit 最大处理数量
 * @returns 标签云数据
 */
export function generateTagCloud(tags: Tag[], options: TagCloudOptions): TagCloudItem[] {
  const { minFontSize, maxFontSize, startColor, endColor, limit } = options;

  const sorted = [...tags].sort((a, b) => b.count - a.count);
  const limited = typeof limit === "number" ? sorted.slice(0, limit) : sorted;

  const maxCount = limited[0]?.count || 1;
  const minCount = limited[limited.length - 1]?.count || 1;
  const range = maxCount - minCount || 1;

  const start = new TinyColor(startColor);

  return limited.map((tag) => {
    const weight = (tag.count - minCount) / range;
    const fontSize = Math.round(minFontSize + (maxFontSize - minFontSize) * weight);
    const color = start.mix(endColor, weight * 100).toHexString();

    return {
      name: tag.name,
      count: tag.count,
      fontSize,
      color,
    };
  });
}
