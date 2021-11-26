import { isFunction } from 'lodash';
import { storage } from '../contexts/FirebaseContext';

export async function multipleFilesSave(files, callback = null) {
  try {

    let data = [];

    await Promise.all(files.map(async (file) => {
      let fileSnap = await storage.ref().child(`${file.name}`).put(file);
      let url = await fileSnap.ref.getDownloadURL();
      let _file_ = { name: file.name, url: url, type: file.type, size: file.size };
      data.push(_file_);
    }));

    isFunction(callback) && callback(data);

  } catch (error) {
    console.error(error);
  }
}


export async function saveFile(file, callback = null) {
  try {
    let fileSnap = await storage.ref().child(`${file.name}`).put(file);
    let url = await fileSnap.ref.getDownloadURL();

    const _file = { name: file.name, url: url, type: file.type, size: file.size };

    isFunction(callback) && callback(_file);

  } catch (error) {
    console.error(error);
  }
}
