const generateOTP = (length = 6) => {
  let ten = 1
  for (let i = 0; i < length - 1; i++) {
    ten *= 10
  }
  return Math.floor(1 * ten + Math.random() * 9 * ten)
}

const otpGeneratorUtils = {
  generateOTP,
}

export default otpGeneratorUtils
