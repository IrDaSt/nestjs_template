import fse from 'fs-extra'

// Make sure directory exist, if not exist will create one
const ensureDir = (path: string) => {
  return fse.ensureDir(path)
}

// Move or rename file or folder
const moveOrRename = (src_path: string, dest_path: string) => {
  return fse.move(src_path, dest_path)
}

// Delete one file of folder
const deleteOne = async (path: string) => {
  if (fse.existsSync(path)) {
    await fse.remove(path)
  }
}

// Delete multiple file or folder
const deleteMultiTempUpload = async (paths: string[]) => {
  const list_process_delete: Array<Promise<void>> = []
  paths.forEach((path) => {
    const process_delete = async () => {
      if (fse.existsSync(path)) {
        await fse.remove(path)
      }
    }
    list_process_delete.push(process_delete())
  })
  await Promise.all(list_process_delete)
}

const deleteImagesWithItsBreak = async ({
  filename,
  size_variation = [50, 100, 150, 200, 300, 500, 800, 1200],
}: {
  filename: string
  size_variation?: number[]
}) => {
  const list_process_delete: Array<Promise<void>> = []
  size_variation.forEach((size) => {
    const process_delete = async () => {
      // remove each image break
      if (fse.existsSync(`./public/${filename}_${size}.webp`)) {
        await fse.remove(`./public/${filename}_${size}.webp`)
      }
    }
    list_process_delete.push(process_delete())
  })
  await Promise.all(list_process_delete)
  // remove original image
  if (fse.existsSync(`./public/${filename}.webp`)) {
    await fse.remove(`./public/${filename}.webp`)
  }
}

const fsUtils = {
  ensureDir,
  moveOrRename,
  deleteOne,
  deleteMultiTempUpload,
  deleteImagesWithItsBreak,
}

export default fsUtils
