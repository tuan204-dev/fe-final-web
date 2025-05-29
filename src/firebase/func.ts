import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

/**
 * Upload ảnh lên Firebase Storage và trả về URL công khai
 * @param file File ảnh (từ input file)
 * @param path Đường dẫn trong storage (VD: 'images/user123.jpg')
 */
export async function uploadImage(file: File): Promise<string> {
    const path = `/images/${Date.now()}_${file.name}`;

    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    return url;
}
