import { readdirSync, statSync } from 'fs'
import { parse, resolve } from 'path'
import * as argon2 from 'argon2'

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

/**
 * @description Read files synchronously from a folder, with natural sorting
 * @param {String} dir Absolute path to directory
 * @returns {Object[]} List of object, each object represent a file
 * structured like so: `{ filepath, name, ext, stat }`
 */
export function readFilesSync(dir) {
  const files = []
  readdirSync(dir).forEach((filename) => {
    const name = parse(filename).name
    const ext = parse(filename).ext
    const filepath = resolve(dir, filename)
    const stat = statSync(filepath)
    const isFile = stat.isFile()

    if (isFile) files.push({ filepath, name, ext, stat })
  })
  files.sort((a, b) => {
    // natural sort alphanumeric strings
    // https://stackoverflow.com/a/38641281
    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  })
  return files
}

export async function createHashedPassword(password: string | Buffer) {
  return argon2.hash(password)
}

export * from './stringify'
