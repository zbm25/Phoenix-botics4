interface CloudinaryOptions {
  width?: number;
  trim?: boolean;
}

/**
 * Builds an optimized Cloudinary URL with auto format, auto quality, width limit, and optional e_trim.
 */
export function getCloudinaryUrl(url: string, options: CloudinaryOptions = {}): string {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;

  const transforms: string[] = ["f_auto", "q_auto"];

  if (options.trim) {
    transforms.push("e_trim");
  }

  if (options.width) {
    transforms.push(`w_${options.width}`, "c_limit");
  }

  const transformString = transforms.join(",");

  // Check if transformation is already present in url
  if (url.includes("/upload/f_auto") || url.includes("/upload/q_auto")) {
    return url;
  }

  return url.replace("/upload/", `/upload/${transformString}/`);
}

/**
 * Generates a responsive srcSet string for Cloudinary images across standard breakpoints.
 */
export function getCloudinarySrcSet(
  url: string,
  widths: number[] = [480, 768, 1024, 1440, 1920],
  trim?: boolean
): string {
  if (!url || typeof url !== "string") return "";

  return widths
    .map((w) => `${getCloudinaryUrl(url, { width: w, trim })} ${w}w`)
    .join(", ");
}

/**
 * Standard sizes attribute helper.
 */
export const DEFAULT_SHOWCASE_SIZES = "(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw";
