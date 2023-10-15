import axios from 'axios';
import { ROOT_URL } from './actions';

function getSignedRequest(file, type) {
  const fileName = `${(new Date()).getTime()}`;
  // hit our own server to get a signed s3 url
  return axios.get(`${ROOT_URL}/sign-s3?file-name=${fileName}&file-type=${type}`);
}

// return a promise that uploads file directly to S3
// note how we return the passed in url here rather than any return value
// since we already know what the url will be - just not that it has been uploaded
function uploadFileToS3(signedRequest, file, url, type) {
  // eslint-disable-next-line no-param-reassign
  // url += `?${(new Date()).getTime()}`;
  return new Promise((fulfill, reject) => {
    axios.put(signedRequest, file, { headers: { 'Content-Type': type } }).then((response) => {
      fulfill(url);
    }).catch((error) => {
      reject(error);
    });
  });
}

export default async function uploadImage(file, type) {
  // returns a promise so you can handle error and completion in your component
  const response = await getSignedRequest(file, type);
  return uploadFileToS3(response.data.signedRequest, file, response.data.url, type);
}
