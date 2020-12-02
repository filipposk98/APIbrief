const video = document.getElementById('video')
const video2 = document.getElementById('video2')
let stopV = document.getElementById("choice2")
let startV = document.getElementById("choice1")
let videoArray = [video, video2];
let list1 = document.getElementById("list1");
let list2 = document.getElementById("list2");
let list3 = document.getElementById("list3");
let list4 = document.getElementById("list4");
//lists for video2
let list5 = document.getElementById("list5");
let list6 = document.getElementById("list6");
let list7 = document.getElementById("list7");
let list8 = document.getElementById("list8");
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
let neutral2 = 0;
let happy2 = 0;
let sad2 = 0;
let surprised2 = 0;
let disgusted2 = 0;
let angry2 = 0;
let fearful2 = 0;
let highValus2 = [];
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
    for (let i=0; i<videoArray.length; i++){
    navigator.getUserMedia(
    { video: {} },
    stream => videoArray[i].srcObject = stream,
    err => console.error(err),
    console.log("Cam Turn On")
    )
  }
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

  neutral2 = 0;
  happy2 = 0;
  sad2 = 0;
  surprised2 = 0;
  disgusted2 = 0;
  angry2 = 0;
  fearful2 = 0;
  
    
    const canvas = faceapi.createCanvasFromMedia(videoArray[0])
    const canvas2 = faceapi.createCanvasFromMedia(videoArray[1])
    document.body.append(canvas)
    canvas2.classList.add("canvas2");
    document.body.append(canvas2)
    
    console.log(canvas, canvas2)
    const displaySize = { width: videoArray[0].width, height: videoArray[0].height }
    const displaySize2 = { width: videoArray[1].width, height: videoArray[1].height }
    faceapi.matchDimensions(canvas, displaySize)
    faceapi.matchDimensions(canvas2, displaySize2)
     var interval = setInterval(async () => {
       if  (! timeStop) {
      console.log(timeStop)

      const detections = await faceapi.detectAllFaces(videoArray[0], new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

      const detections2 = await faceapi.detectAllFaces(videoArray[1], new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      //console.log(resizedDetections[0].expressions)

      const resizedDetections2 = faceapi.resizeResults(detections2, displaySize2)
      //console.log(resizedDetections[0].expressions)

      const sorted = Object.entries(resizedDetections[0].expressions).sort(([,a],[,b]) => a-b);
      const sorted2 = Object.entries(resizedDetections2[0].expressions).sort(([,a],[,b]) => a-b);
      console.log(sorted[6][0]);

      highValus.push (sorted[6][0]);
      highValus2.push (sorted2[6][0]);
      console.log(highValus2);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.height)

      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

      faceapi.draw.drawDetections(canvas2, resizedDetections2)
      faceapi.draw.drawFaceLandmarks(canvas2, resizedDetections2)
      faceapi.draw.drawFaceExpressions(canvas2, resizedDetections2)
    }
    }, 300)
     
}




// // Automatic stops after timelimit
// setTimeout (() => {
//   console.log("I am in");
//   timeStop = true;

// }, 20200);


// Stops the function when we say to stop it
function vidOff() {

  for (let i=0; i<videoArray.length; i++){
  timeStop = true;
  videoArray[i].pause();
  videoArray[i].src = "";
  let stream = videoArray[i].srcObject;
  stream.getTracks()[0].stop();
  }
  console.log("Vid off");

  // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  // highValus.forEach(element => {
  //   switch(element) {
  //     case 'neutral':
  //       neutral++;
  //         break;
  //     case 'happy':
  //       happy++;
  //         break;
  //     case 'sad':
  //       sad++;
  //         break;
  //     case 'surprised':
  //       surprised++;
  //         break;
  //     case 'disgusted':
  //       disgusted++;
  //         break;
  //     case 'angry':
  //       angry++;
  //         break;  
  //      case 'fearful':
  //       fearful++;
  //         break;   
  // }
  // })
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


//Persentage for second array
 let persentageHappy2 = Math.round((happy2 / highValus2.length) * 100);
 console.log(persentageHappy2);
 console.log(highValus2.length);

 let persentageNuetral2 = Math.round((neutral2 / highValus2.length) * 100);
 console.log(persentageNuetral2);

 let persentageSad2 = Math.round((sad / highValus2.length) * 100);
 console.log(persentageSad2);

 let persentageSurprised2 = Math.round((surprised2 / highValus2.length) * 100);
 console.log(persentageSurprised2);

 let persentageAngry2 = Math.round((angry2 / highValus2.length) * 100);
 console.log(persentageAngry2);

 let persentageFeraful2= Math.round((fearful2 / highValus2.length) * 100);
 console.log(persentageFeraful2);

 let persentageDesgusted2 = Math.round((disgusted2 / highValus2.length) * 100);
 console.log(persentageDesgusted2);


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

    list5.innerHTML = 
    `<li>Neutral: ${persentageNuetral2}%</li>
     <li>Happy: ${persentageHappy2}%</li>
     <li>Sad: ${persentageSad2}%</li>
     <li>Suprised: ${persentageSurprised2}%</li>
     <li>Disgusted: ${persentageDesgusted2}%</li>
     <li>Angry: ${persentageAngry2}%</li>
     <li>Fearful: ${persentageFeraful2}%</li>`;
     persentageNuetral2 = 0;
     persentageHappy2 = 0;
     persentageSad2 = 0;
     persentageSurprised2 = 0;
     persentageDesgusted2 = 0;
     persentageAngry2 = 0;
     persentageFeraful2 = 0;



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

    list6.innerHTML = 
    `<li>Neutral: ${persentageNuetral2}%</li>
     <li>Happy: ${persentageHappy2}%</li>
     <li>Sad: ${persentageSad2}%</li>
     <li>Suprised: ${persentageSurprised2}%</li>
     <li>Disgusted: ${persentageDesgusted2}%</li>
     <li>Angry: ${persentageAngry2}%</li>
     <li>Fearful: ${persentageFeraful2}%</li>`;
     persentageNuetral2 = 0;
     persentageHappy2 = 0;
     persentageSad2 = 0;
     persentageSurprised2 = 0;
     persentageDesgusted2 = 0;
     persentageAngry2 = 0;
     persentageFeraful2 = 0;

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

    list7.innerHTML = 
    `<li>Neutral: ${persentageNuetral2}%</li>
     <li>Happy: ${persentageHappy2}%</li>
     <li>Sad: ${persentageSad2}%</li>
     <li>Suprised: ${persentageSurprised2}%</li>
     <li>Disgusted: ${persentageDesgusted2}%</li>
     <li>Angry: ${persentageAngry2}%</li>
     <li>Fearful: ${persentageFeraful2}%</li>`;
     persentageNuetral2 = 0;
     persentageHappy2 = 0;
     persentageSad2 = 0;
     persentageSurprised2 = 0;
     persentageDesgusted2 = 0;
     persentageAngry2 = 0;
     persentageFeraful2 = 0;

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

    list8.innerHTML = 
    `<li>Neutral: ${persentageNuetral2}%</li>
     <li>Happy: ${persentageHappy2}%</li>
     <li>Sad: ${persentageSad2}%</li>
     <li>Suprised: ${persentageSurprised2}%</li>
     <li>Disgusted: ${persentageDesgusted2}%</li>
     <li>Angry: ${persentageAngry2}%</li>
     <li>Fearful: ${persentageFeraful2}%</li>`;
     persentageNuetral2 = 0;
     persentageHappy2 = 0;
     persentageSad2 = 0;
     persentageSurprised2 = 0;
     persentageDesgusted2 = 0;
     persentageAngry2 = 0;
     persentageFeraful2 = 0;
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

  highValus2.forEach(element => {
    switch(element) {
      case 'neutral':
        neutral2++;
          break;
      case 'happy':
        happy2++;
          break;
      case 'sad':
        sad2++;
          break;
      case 'surprised':
        surprised2++;
          break;
      case 'disgusted':
        disgusted2++;
          break;
      case 'angry':
        angry2++;
          break;  
       case 'fearful':
        fearful2++;
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


const st = {};

st.flap = document.querySelector('#flap');
st.toggle = document.querySelector('.toggle');

st.choice1 = document.querySelector('#choice1');
st.choice2 = document.querySelector('#choice2');

st.flap.addEventListener('transitionend', () => {

    if (st.choice1.checked) {
        st.toggle.style.transform = 'rotateY(-15deg)';
        setTimeout(() => st.toggle.style.transform = '', 400);
    } else {
        st.toggle.style.transform = 'rotateY(15deg)';
        setTimeout(() => st.toggle.style.transform = '', 400);
    }

})

st.clickHandler = (e) => {

    if (e.target.tagName === 'LABEL') {
        setTimeout(() => {
            st.flap.children[0].textContent = e.target.textContent;
        }, 250);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    st.flap.children[0].textContent = st.choice2.nextElementSibling.textContent;
});

document.addEventListener('click', (e) => st.clickHandler(e));
