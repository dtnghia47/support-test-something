// const quickstart = async() => {
//   // Imports the Google Cloud client library
//   const vision = require('@google-cloud/vision');

//   // Creates a client
//   const client = new vision.ImageAnnotatorClient();

//   // Performs label detection on the image file
//   const [result] = await client.labelDetection('../assets/demo.png');
//   const labels = result.labelAnnotations;
//   console.log('Labels:');
//   labels.forEach((label: any) => console.log(label.description));
// };

// export default quickstart;

// import { createWorker } from 'tesseract.js';

// const quickstart = async() => {
//   const worker = createWorker({
//     logger: m => console.log(m)
//   });

//   (async () => {
//     await worker.load();
//     await worker.loadLanguage('eng');
//     await worker.initialize('eng');
//     // const { data: { text } } = await worker.recognize('../../assets/demo.png');
//     const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
//     console.log('###createWorker:', text);
//     await worker.terminate();
//   })();
// };


import Tesseract from 'tesseract.js';

const quickstart = () => Tesseract.recognize(
  'https://tesseract.projectnaptha.com/img/eng_bw.png',
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
})

export const quickstart1 = () => Tesseract.recognize(
  './assets/demo.png',
  'eng',
  { logger: m => {
    // console.log(m)
  } }
).then(({ data: { text } }) => {
  console.log(text);
})

export default quickstart;