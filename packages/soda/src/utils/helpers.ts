export const CUID_REGEX = new RegExp("/^cw{6,24}$/"); // 6 - to - 24 length starts with c
export const isCUID = (str: string) => CUID_REGEX.test(str);
