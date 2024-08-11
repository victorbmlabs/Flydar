export function toCamelCase<T>(obj: Record<string, any>): T {
    const result: Record<string, any> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            result[camelKey] = obj[key];
        }
    }
    return result as T;
}