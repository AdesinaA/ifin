import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function truncateString(str, start, end) {
  if (str.length <= start + end) {
    return str;
  }
  return str.slice(0, start) + "..." + str.slice(-end);
}

export const copyToClipboard = async (textToCopy) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
