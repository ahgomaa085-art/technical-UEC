import mappingData from '../../scripts/asset-mapping.json';

const assetMapping: Record<string, string> = mappingData;

/**
 * Resolves a local asset path to a Cloudinary URL if available,
 * otherwise returns the original path.
 * 
 * This is used to offload bandwidth from Vercel to Cloudinary.
 */
export function resolveAsset(path: string): string {
    if (!path) return path;

    // Check for exact match in mapping
    if (assetMapping[path]) {
        return assetMapping[path];
    }

    // fallback for paths that might start with or without a slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    if (assetMapping[normalizedPath]) {
        return assetMapping[normalizedPath];
    }

    return path;
}
