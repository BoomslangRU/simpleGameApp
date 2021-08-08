const start = document.querySelector('#start')
const game = document.querySelector('#game')
const result = document.querySelector('#result')
const timeGame = document.querySelector('#time')
const timeHeader = document.querySelector('#time-header')
const resultHeader = document.querySelector('#result-header')
const gameTime = document.querySelector('#game-time')

// array colors boxes
const colors = ['#7474BF', '#348ac7', '#ffdde1', '#ee9ca7', '#99f2c8', '#f5af19', '#a17fe0']

// local state
let score = 0
let isStartedGame = false

// function show elements 
const show = el => el.classList.remove('hide')

// function hide elements
const hide = el => el.classList.add('hide')


// event subscription block and subsequent logic

// logic of interaction with input
gameTime.addEventListener('input', setGameTime = () => {
    let time = +gameTime.value
    timeGame.textContent = time.toFixed(1)
    show(timeHeader)
    hide(resultHeader)
})

// logic of interaction with button
start.addEventListener('click', () => {
    score = 0
    setGameTime()
    gameTime.setAttribute('disabled', 'true')
    isStartedGame = true
    game.style.backgroundColor = 'white'
    hide(start)

    // function => time counter
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

// logic of interaction with block div 
game.addEventListener('click', event => {
    if (!isStartedGame) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
})



const setGameScore = () => result.textContent = score.toString()

// the end of the game
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

// logic for creating boxes
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

// function of obtaining random numbers
const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)
