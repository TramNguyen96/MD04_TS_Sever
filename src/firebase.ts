import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";

/* Your Config */
const firebaseConfig = {
  apiKey: "AIzaSyBVKF9iFnEWatiWjmqE5iUhUOwXmxgtIl8",
  authDomain: "md04-a5458.firebaseapp.com",
  projectId: "md04-a5458",
  storageBucket: "md04-a5458.appspot.com",
  messagingSenderId: "342613931632",
  appId: "1:342613931632:web:2be934176550e66334a6b5",
  measurementId: "G-9Z278D409H"
};
/* End Config */

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


export async function uploadFileToStorage(file: any, folderName: any, bufferData: any) {
  // nếu file là null thì không làm gì hết
  if (!file) {
    return false
  }

  let fileRef;
  let metadata;
  if (!bufferData) {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + file.name);
  } else {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + (file as any).filename);
    metadata = {
      contentType: (file as any).mimetype,
    };
  }
  let url;
  if (bufferData) {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then(url => url)
        .catch(er => false)
    })
  } else {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, file).then(async res => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then(url => url)
        .catch(er => false)
    })
  }


  return url
}