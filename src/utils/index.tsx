const quickstart = async() => {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection('../assets/demo.png');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach((label: any) => console.log(label.description));
};

export default quickstart;
