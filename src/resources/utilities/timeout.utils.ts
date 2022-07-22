const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const timeoutUtils = {
  timeout,
}

export default timeoutUtils
