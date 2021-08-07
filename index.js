const start = document.querySelector('#start')
const game = document.querySelector('#game')
const result = document.querySelector('#result')
const timeGame = document.querySelector('#time')
const timeHeader = document.querySelector('#time-header')
const resultHeader = document.querySelector('#result-header')
const gameTime = document.querySelector('#game-time')

const colors = ['#7474BF', '#348ac7', '#ffdde1', '#ee9ca7', '#99f2c8', '#f5af19', '#a17fe0']
let score = 0
let isStartedGame = false


const show = (el) => {
    return el.classList.remove('hide')
}

const hide = (el) => {
    return el.classList.add('hide')
}



gameTime.addEventListener('input', setGameTime = () => {
    let time = +gameTime.value
    timeGame.textContent = time.toFixed(1)
    show(timeHeader)
    hide(resultHeader)
})

start.addEventListener('click', () => {
    score = 0
    setGameTime()
    gameTime.setAttribute('disabled', 'true')
    isStartedGame = true
    game.style.backgroundColor = 'white'
    hide(start)

    const interval = setInterval(() => {
        let time = parseFloat(timeGame.textContent)

        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            timeGame.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
})

game.addEventListener('click', (event) => {
    if (!isStartedGame) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
})



const setGameScore = () => {
    result.textContent = score.toString()
}

const endGame = () => {
    isStartedGame = false
    setGameScore()
    gameTime.removeAttribute('disabled')
    show(start)
    game.innerHTML = ''
    game.style.backgroundColor = '#ccc'
    hide(timeHeader)
    show(resultHeader)
}


const renderBox = () => {
    game.innerHTML = ''

    const boxSize = getRandom(30, 100)
    const box = document.createElement('div')
    const gameSize = game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    let randomColorIndex = getRandom(0, colors.length)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    game.insertAdjacentElement('afterbegin', box)
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}