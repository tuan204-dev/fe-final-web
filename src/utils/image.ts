import axios from "axios"

const PROJECT_NAME = 'dzjbkgfca'

export const uploadImage = async (file: File) => {
    if (!file) return ''

    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', 'final-web-ltw')

    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${PROJECT_NAME}/image/upload`, formData)

    return data.secure_url
}