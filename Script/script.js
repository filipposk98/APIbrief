const video = document.getElementById('video')
let stopV = document.getElementById("TurnOffFD")
let startV = document.getElementById("TurnOnFD")
let list = document.getElementById("list");
let interval = "";
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
let timeStop = false;
let neutral = 0;
let happy = 0;
let sad = 0;
let surprised = 0;
let disgusted = 0;
let angry = 0;
let fearful = 0;
let highValus =[] ;




Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)



function startVideo() {
  highValus =[] ;
  if (neutral > 0 ) {
    neutral = 0;
  }
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
    neutral = 0;
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
     var interval = setInterval(async () => {
       if  (! timeStop) {
        console.log(timeStop)

      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
     console.log(resizedDetections[0].expressions)
      const sorted = Object.entries(resizedDetections[0].expressions).sort(([,a],[,b]) => a-b);
      console.log(sorted[6][0]);
      highValus.push (sorted[6][0]);
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
  timeStop = true;
  video.pause();
  video.src = "";
  let stream = video.srcObject;
  stream.getTracks()[0].stop();
  console.log("Vid off");
  // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  highValus.forEach(element => {
    // if  (element === "neutral") {
    //   neutral++;
    // } else if (element === "happy") {
    //   happy++; 
    // } else if (element === "sad") {
    //    sad++;
    // }
    switch(element) {
      case 'neutral':
        neutral++;
          break;
      case 'happy':
        happy++;
          break;
      case 'sad':
        sad++;
          break;
      case 'surprised':
        surprised++;
          break;
      case 'disgusted':
        disgusted++;
          break;
      case 'angry':
        angry++;
          break;  
       case 'fearful':
        fearful++;
          break;   
  }
  })
  console.log(fearful, "fearful");
  console.log(angry, "angry");
  console.log(disgusted, "disgusted");
  console.log(surprised, "surprised");
  console.log(sad, "sad");
  console.log(happy, "happy");
  console.log(neutral, "neutral");
  console.log(highValus);

  list.innerHTML = `<li>Neutral: ${neutral}</li>
                    <li>Happy: ${happy}</li>
                    <li>Sad: ${sad}</li>
                    <li>Suprised: ${surprised}</li>
                    <li>Disgusted: ${disgusted}</li>
                    <li>Angry: ${angry}</li>
                    <li>Fearful: ${fearful}</li>`;

  
}


  stopV.addEventListener("click", vidOff);



 



