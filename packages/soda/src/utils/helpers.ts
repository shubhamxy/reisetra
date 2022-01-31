export const CUID_REGEX = /^cw{6,24}$/ // 6 - to - 24 length starts with c
export const isCUID = (str: string) => CUID_REGEX.test(str)

export function timeFn(sec_num: number) {
    sec_num = parseInt(sec_num + '', 10)
    let hours: string | number = Math.floor(sec_num / 3600)
    let minutes: string | number = Math.floor((sec_num - hours * 3600) / 60)
    let seconds: string | number = sec_num - hours * 3600 - minutes * 60
    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    const time = hours + ':' + minutes + ':' + seconds
    return time
}
