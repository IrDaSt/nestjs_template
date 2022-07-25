import crypto from 'crypto'
import CryptoJS from 'crypto-js'

const generateSalt = () => crypto.randomBytes(12).toString('hex')

const encryptWithSalt = (text: string, salt: string) =>
  crypto.createHmac('sha256', salt).update(text).digest('hex')

const ecryptSHA256 = (text: string) =>
  crypto.createHash('sha256').update(text).digest('hex')

const ecryptMD5 = (text: string) =>
  crypto.createHash('md5').update(text).digest('hex')

const encryptWithSecretKey = (text: string, key: string) =>
  CryptoJS.AES.encrypt(text, key).toString()

const decryptWithSecretKey = (text: string, key: string) =>
  CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8)

const cryptoUtils = {
  generateSalt,
  encryptWithSalt,
  ecryptSHA256,
  ecryptMD5,
  encryptWithSecretKey,
  decryptWithSecretKey,
}

export default cryptoUtils
