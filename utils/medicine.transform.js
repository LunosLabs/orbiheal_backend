export const addPrefixToKeys = (obj, prefix = 'p_') => {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        result[`${prefix}${key}`] = value;
    }
    return result;
}
