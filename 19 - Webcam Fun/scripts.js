const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const rgb_input = document.querySelectorAll('.rgb input');

const get_web_cam = async () => {
  video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  video.play()
}

const video_to_canvas = () => {
  const width = video.videoWidth,
        height = video.videoHeight

  canvas.width = width
  canvas.height = height

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)

    // additional - PIXELS : pattern: rgba
    let pixels = ctx.getImageData(0, 0, width, height)
    // console.log(pixels)
    // debugger

    // Editing Pixel RGBA
    // pixels = red_effect(pixels)

    // Editing Pixel RGBA
    // pixels = rgb_split(pixels)
    // ctx.globalAlpha = 0.1 //transparency

    // GreeenScreen
    // pixels = green_screen(pixels)

    // put video edited to canvas
    // ctx.putImageData(pixels, 0, 0)
  }, 16)
}

const red_effect = pixels => {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100
    pixels.data[i + 1] = pixels.data[i + 1] - 50
    pixels.data[i + 2] = pixels.data[i + 2] - 50
  }
  return pixels
}

const rgb_split = pixels => {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]
    pixels.data[i + 800] = pixels.data[i + 1]
    pixels.data[i - 50] = pixels.data[i + 2]
  }
  return pixels
}

const green_screen = pixels => {
  const levels = {}

  for(let inp of rgb_input) {
    levels[inp.name] = inp.value
  }

  for(let i = 0; i < pixels.data.length; i+=4) {
    red = pixels.data[i + 0]
    green = pixels.data[i + 1]
    blue = pixels.data[i + 2]
    alpha = pixels.data[i + 3]

    if( red >= levels.rmin
      && green >= levels.rmin
      && blue >= levels.rmin
      && red >= levels.rmax
      && green >= levels.rmax
      && blue >= levels.rmax
    ) {
      pixels.data[i+ 3] = 0
    }
  }

  return pixels
}

const take_photo = () => {
  snap.currentTime = 0
  snap.play()

  const photo = canvas.toDataURL('image/jpeg')//base64 representation of the picture
  strip.innerHTML += `
    <a href="${photo}" download="handsome">
      <img src="${photo}"/>
    </a>
  `
}

get_web_cam()
video.addEventListener('playing', video_to_canvas)