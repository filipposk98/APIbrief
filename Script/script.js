const video = document.getElementById('video')
let stopV = document.getElementById("TurnOffFD")
let startV = document.getElementById("TurnOnFD")
let list1 = document.getElementById("list1");
let list2 = document.getElementById("list2");
let list3 = document.getElementById("list3");
let list4 = document.getElementById("list4");
const startEvaluationBtn = document.getElementById("startEvaluationBtn");
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
let iteration =0;


startEvaluationBtn.addEventListener('click',individualEvaluation);




Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)



function startVideo() {
  // highValus =[] ;

  // if (neutral > 0 ) {
  //   neutral = 0;
  // } else if (happy > 0 ) {
  //   happy = 0;
  // }
    //timeStop = false;
    navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err),
    console.log("Cam Turn On")
    
  )
}
startV.addEventListener("click", startVideo) 


function faceDetection() {
//video.addEventListener('play', () => {
  neutral = 0;
  happy = 0;
  sad = 0;
  surprised = 0;
  disgusted = 0;
  angry = 0;
  fearful = 0;
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
  
  }



// // Automatic stops after timelimit
// setTimeout (() => {
//   console.log("I am in");
//   timeStop = true;

// }, 20200);


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
 
  persentageCalcul() 

  }
  //Call the vidOff function
stopV.addEventListener("click", vidOff);


function persentageCalcul() {

 let persentageHappy = Math.round((happy / highValus.length) * 100);
 console.log(persentageHappy);
 console.log(highValus.length);

 let persentageNuetral = Math.round((neutral / highValus.length) * 100);
 console.log(persentageNuetral);

 let persentageSad= Math.round((sad / highValus.length) * 100);
 console.log(persentageSad);

 let persentageSurprised= Math.round((surprised / highValus.length) * 100);
 console.log(persentageSurprised);

 let persentageAngry= Math.round((angry / highValus.length) * 100);
 console.log(persentageAngry);

 let persentageFeraful= Math.round((fearful / highValus.length) * 100);
 console.log(persentageFeraful);

 let persentageDesgusted= Math.round((disgusted / highValus.length) * 100);
 console.log(persentageDesgusted);

 if (iteration === 3 ) {
 list1.innerHTML = 
   `<li>Neutral: ${persentageNuetral}%</li>
    <li>Happy: ${persentageHappy}%</li>
    <li>Sad: ${persentageSad}%</li>
    <li>Suprised: ${persentageSurprised}%</li>
    <li>Disgusted: ${persentageDesgusted}%</li>
    <li>Angry: ${persentageAngry}%</li>
    <li>Fearful: ${persentageFeraful}%</li>`;
    persentageNuetral = 0;
    persentageHappy = 0;
    persentageSad = 0;
    persentageSurprised = 0;
    persentageDesgusted = 0;
    persentageAngry = 0;
    persentageFeraful = 0;



 } else if (iteration === 4) {
    list2.innerHTML = 
   `<li>Neutral: ${persentageNuetral}%</li>
    <li>Happy: ${persentageHappy}%</li>
    <li>Sad: ${persentageSad}%</li>
    <li>Suprised: ${persentageSurprised}%</li>
    <li>Disgusted: ${persentageDesgusted}%</li>
    <li>Angry: ${persentageAngry}%</li>
    <li>Fearful: ${persentageFeraful}%</li>`;
    persentageNuetral = 0;
    persentageHappy = 0;
    persentageSad = 0;
    persentageSurprised = 0;
    persentageDesgusted = 0;
    persentageAngry = 0;
    persentageFeraful = 0;

 } else if(iteration === 5) {
    list3.innerHTML = 
   `<li>Neutral: ${persentageNuetral}%</li>
    <li>Happy: ${persentageHappy}%</li>
    <li>Sad: ${persentageSad}%</li>
    <li>Suprised: ${persentageSurprised}%</li>
    <li>Disgusted: ${persentageDesgusted}%</li>
    <li>Angry: ${persentageAngry}%</li>
    <li>Fearful: ${persentageFeraful}%</li>`;
    persentageNuetral = 0;
    persentageHappy = 0;
    persentageSad = 0;
    persentageSurprised = 0;
    persentageDesgusted = 0;
    persentageAngry = 0;
    persentageFeraful = 0;

 } else if (iteration === 6) {
    list4.innerHTML = 
   `<li>Neutral: ${persentageNuetral}%</li>
    <li>Happy: ${persentageHappy}%</li>
    <li>Sad: ${persentageSad}%</li>
    <li>Suprised: ${persentageSurprised}%</li>
    <li>Disgusted: ${persentageDesgusted}%</li>
    <li>Angry: ${persentageAngry}%</li>
    <li>Fearful: ${persentageFeraful}%</li>`;
    persentageNuetral = 0;
    persentageHappy = 0;
    persentageSad = 0;
    persentageSurprised = 0;
    persentageDesgusted = 0;
    persentageAngry = 0;
    persentageFeraful = 0;
 }
}

function individualEvaluation() {
  
  console.log("i am in time out");
  setTimeout (() => {
       
      console.log(iteration);
      faceDetection();
      expressionsCalc();
      console.log("finish evaluation");
      if(iteration <= 5){
       iteration++;

     individualEvaluation();
     
      }else{ 
        iteration = 0;
        timeStop=true;
  //       highValus =[] ;

  // if (neutral > 0 ) {
  //   neutral = 0;
  // } else if (happy > 0 ) {
  //   happy = 0;
  // } else if (sad > 0 ) {
  //   sad = 0;
  // } else if (surprised > 0) {
  //   surprised = 0;
  // } else if (angry > 0) {
  //   angry = 0;
  // } else if (fearful > 0) {
  //   fearful = 0;
  // } else if (disgusted > 0) {
  //   disgusted = 0;
  // }
       }
    
  
    }, 1000);
    timeStop=false;
}

function expressionsCalc() {
  highValus.forEach(element => {
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
  // console.log(fearful, "fearful");
  // console.log(angry, "angry");
  // console.log(disgusted, "disgusted");
  // console.log(surprised, "surprised");
  // console.log(sad, "sad");
  // console.log(happy, "happy");
  // console.log(neutral, "neutral");
  // console.log(highValus);
 
  persentageCalcul() 
}


