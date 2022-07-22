import sharp from 'sharp'

const breakToMultiSize = async ({
  file,
  output_path_n_name,
  size_variation = [50, 100, 150, 200, 300, 500, 800, 1200],
}: {
  file: Express.Multer.File
  output_path_n_name: string
  size_variation?: number[]
}) => {
  const list_link_foto: string[] = []
  const size = size_variation
  const list_process_image: Array<Promise<void>> = []
  size.forEach((val) => {
    const process_image = async () => {
      await sharp(file.destination + '/' + file.filename, {
        animated: true,
      })
        .resize({
          width: val,
        })
        .webp()
        .toFile(`./public/${output_path_n_name}_${val}.webp`)
      list_link_foto.push(output_path_n_name + `_${val}.webp`)
    }
    list_process_image.push(process_image())
  })
  await Promise.all(list_process_image)
  return list_link_foto
}

const imageProcessingUtils = {
  breakToMultiSize,
}

export default imageProcessingUtils
