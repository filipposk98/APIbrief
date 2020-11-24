const video = document.getElementById('video')
let stopV = document.getElementById("TurnOffFD")
let startV = document.getElementById("TurnOnFD")
let interval = "";
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
let timeStop = false;
let neutral = 0;

// var interval;
// const webcam = new Webcam(video, 'user', canvasElement, snapSoundElement);

let highValus =[] ;




Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)



function startVideo() {
    timeStop = false;
    navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err),
    console.log("Cam Turn On")
  )
}
startV.addEventListener("click", startVideo) 



video.addEventListener('play', () => {
  
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
     interval = setInterval(async () => {
       if  (! timeStop) {
        console.log(timeStop)

      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
     console.log(resizedDetections[0].expressions)
      const sorted = Object.entries(resizedDetections[0].expressions).sort(([,a],[,b]) => a-b);
      console.log(sorted[6][0]);
      highValus.push (sorted[6][0]);
      // highValus.forEach(element => {
      //   if  (element === "neutral") {
      //     neutral++;
      //   }
      // })
      
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)}
    }, 300)
  
  })



// Automatic stops after timelimit
setTimeout (() => {
  console.log("I am in");
  timeStop = true;

}, 20200);


// Stops the function when we say to stop it
function vidOff() {
  //clearInterval(theDrawLoop);
  //ExtensionData.vidStatus = 'off';
  timeStop = true;
  video.pause();
  video.src = "";
  let stream = video.srcObject;
  stream.getTracks()[0].stop();
  console.log("Vid off");
  // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  highValus.forEach(element => {
    if  (element === "neutral") {
      neutral++;
    }
  })
  console.log(neutral);
  console.log(highValus);

}

  stopV.addEventListener("click", vidOff);

//   let picture = webcam.snap();
// document.querySelector('#download-photo').href = picture;

 



