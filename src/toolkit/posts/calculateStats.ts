import type { Post } from "./types";

export interface PostStats {
  totalWords: number;
  totalReadingTime: string;
}

/**
 * Count words in a string
 * Supports multiple languages including Chinese
 */
export function countWords(text: string): number {
  if (!text) return 0;

  // Remove punctuation
  const cleanedText = text.replace(/[^\w\s\u4E00-\u9FFF]/g, "");

  // Count Chinese characters (each character is one word)
  const chineseCount = (cleanedText.match(/[\u4E00-\u9FFF]/g) || []).length;

  // Remove Chinese characters and count English words
  const englishText = cleanedText.replace(/[\u4E00-\u9FFF]/g, "");
  const englishCount = englishText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return chineseCount + englishCount;
}

/**
 * Calculate total words from multiple posts
 */
export function calculateTotalWords(posts: Post[]): number {
  return posts.reduce((total, post) => {
    const content = post.body || "";
    return total + countWords(content);
  }, 0);
}

/**
 * Format reading time based on word count
 * Default AWL=150 (Chinese), WPM=300
 */
export function formatReadingTime(wordCount: number, awl: number = 150, wpm: number = 300): string {
  // For Chinese content, use AWL-based calculation
  // For English content, use WPM calculation
  const readingMinutes = Math.ceil(wordCount / ((awl + wpm) / 2));

  if (readingMinutes === 0) {
    return "less than a minute";
  } else if (readingMinutes === 1) {
    return "1 minute";
  } else {
    return `${readingMinutes} minutes`;
  }
}

/**
 * Calculate post statistics
 */
export function calculatePostStats(
  posts: Post[],
  options: {
    awl?: number;
    wpm?: number;
    timeUnit?: "minute" | "minutes";
  } = {},
): PostStats {
  const totalWords = calculateTotalWords(posts);
  const totalReadingTime = formatReadingTime(totalWords, options.awl, options.wpm);

  return {
    totalWords,
    totalReadingTime,
  };
}
