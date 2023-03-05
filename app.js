document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdBottom = 100
    let birdLeft = 520
    let gravity = 3
    let isGameOver = false
    let gap = 430

    function startGame () {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500)
            birdBottom += 70
        bird.style.bottom = birdBottom + 'px'
    }
    document.addEventListener('keyup', control)

    function generateObstacle() {
        let obstacleLeft = 1500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }

        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)

        let hit=false

        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'

        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            if(!hit && !isGameOver)
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            
            if ((((obstacleLeft > 500) && (obstacleLeft < 565)) && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200)) || (birdBottom < 0)) {
                gameOver()
                clearInterval(timerId);
                console.log("obstacle",obstacleLeft)
                console.log("bird",birdLeft)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver)
            setTimeout(generateObstacle, 3000)
    }
    generateObstacle()
    function gameOver() {
        clearInterval(gameTimerId);
        hit=true
        isGameOver = true
        document.removeEventListener('keyup', control)
    }

})