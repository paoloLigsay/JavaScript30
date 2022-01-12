const $ = selector => {
  const elements = [...document.querySelectorAll(selector)] // force it to be an actual array
  return elements.length > 1 ? elements : elements[0] // no new DOM selections have been made
}

const play_button = $('button.player__button.toggle'),
      video = $('.player__video'),
      volume_range = $('input[name="volume"]'),
      play_back_rate = $('input[name="playbackRate"]'),
      skip_back = $('button[data-skip="-10"]'),
      skip_forward = $('button[data-skip="25"]'),
      progress = $('.progress__filled')

let is_play = false,
    video_done = false

const toggle_play = () => {
  is_play = !is_play

  if(is_play) {
    video.play()
    play_button.innerHTML = '❚ ❚'
  } else {
    video.pause()
    play_button.innerHTML = '►'
  }
}

/* Initial */
progress.style.setProperty('flex-basis', `0%`)

/* Event Listeners */
video.addEventListener('timeupdate', () => progress.style.setProperty('flex-basis', `${(video.currentTime/video.duration)*100}%`))
video.addEventListener('click', toggle_play)
play_button.addEventListener('click', toggle_play)
volume_range.addEventListener('change', () => video.volume = volume_range.value)
play_back_rate.addEventListener('change', () => video.playbackRate  = play_back_rate.value)
skip_back.addEventListener('click', () => video.currentTime -= skip_back.dataset.skip*-1)
skip_forward.addEventListener('click', () => video.currentTime += +skip_forward.dataset.skip)