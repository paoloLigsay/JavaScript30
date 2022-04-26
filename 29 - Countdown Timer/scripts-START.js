const $ = selector => {
  const elements = [...document.querySelectorAll(selector)] // force it to be an actual array
  return elements.length > 1 ? elements : elements[0] // no new DOM selections have been made
}

const time_left_container = $('.display h1'),
      time_end_container = $('.display p'),
      buttons = $('button.timer__button'),
      form = $('form#custom')

let interval_id

const set_time_to_ui = time => {
  let m = Math.floor(+time / 60),
  s = +time - m * 60

  s - 10 < 0 && (s = '0' + (time - m * 60).toString())

  time_left_container.textContent = `${m}:${s}`
  time--

  time < 0 && clearInterval(interval_id)
}

const start_countdown = (time) => {
  clearInterval(interval_id)
  set_time_to_ui(time)

  interval_id = setInterval(() => {
    time--
    set_time_to_ui(time)
  }, 1000)
}

const set_date = seconds => {
  const c_date = new Date()

  c_date.setSeconds(c_date.getSeconds() + seconds)
  const h = c_date.getHours() % 12 === 0 ? 12 : c_date.getHours() % 12
  const m = c_date.getMinutes() - 10 < 0 ? '0' + c_date.getMinutes().toString() : c_date.getMinutes()

  // time_left and time_end_container
  start_countdown(seconds)
  time_end_container.textContent = `Be Back At ${h}:${m}`
}

buttons.forEach(button => button.addEventListener('click', e => set_date(+e.target.dataset.time)))

form.addEventListener('submit', e => {
  e.preventDefault()
  set_date(+e.target[0].value * 60)
})
