import React, { useState, useEffect } from 'react';

function Game() {
  const [birdBottom, setBirdBottom] = useState(100);
  const [birdLeft, setBirdLeft] = useState(520);
  const [gravity, setGravity] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gap, setGap] = useState(430);

  useEffect(() => {
    document.addEventListener('keyup', control);
    const gameTimerId = setInterval(startGame, 20);
    return () => {
      document.removeEventListener('keyup', control);
      clearInterval(gameTimerId);
    };
  }, []);

  function startGame() {
    setBirdBottom((prev) => prev - gravity);
  }

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) {
      setBirdBottom((prev) => prev + 70);
    }
  }

  function generateObstacle() {
    let obstacleLeft = 1500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;

    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');

    if (!isGameOver) {
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }

    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);

    let hit = false;

    obstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.left = obstacleLeft + 'px';

    obstacle.style.bottom = obstacleBottom + 'px';
    topObstacle.style.bottom = obstacleBottom + gap + 'px';

    function moveObstacle() {
      if (!hit && !isGameOver) obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + 'px';
      topObstacle.style.left = obstacleLeft + 'px';

      if (obstacleLeft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }

      if (
        (obstacleLeft > 500 &&
          obstacleLeft < 565 &&
          (birdBottom < obstacleBottom + 153 ||
            birdBottom > obstacleBottom + gap - 200)) ||
        birdBottom < 0
      ) {
        gameOver();
        clearInterval(timerId);
        console.log('obstacle', obstacleLeft);
        console.log('bird', birdLeft);
      }
    }

    let timerId = setInterval(moveObstacle, 20);

    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }

  function gameOver() {
    setIsGameOver(true);
    hit = true;
    clearInterval(gameTimerId);
    document.removeEventListener('keyup', control);
  }

  return (
    <div>
      <div className="bird" style={{ bottom: birdBottom, left: birdLeft }} />
      <div className="game-container">
        <div className="ground" />
      </div>
    </div>
  );
}

export default Game;
