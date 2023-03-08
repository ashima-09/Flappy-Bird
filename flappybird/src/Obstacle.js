import React, { useState, useEffect } from 'react';
import Game from './App';
import App from './App';

function Obstacle({ isGameOver, birdBottom, gap, gameDisplay, gameOver }) {
  const [obstacleLeft, setObstacleLeft] = useState(1500);
  const [obstacleBottom, setObstacleBottom] = useState(0);
    //random height
    //createElement('div')
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');

  useEffect(() => {
    if (!isGameOver) {      
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }
      gameDisplay.appendChild(obstacle);
      gameDisplay.appendChild(topObstacle);

      let timerId = setInterval(moveObstacle, 20);

      function moveObstacle() {
        if (!isGameOver) {
          setObstacleLeft((obstacleLeft) => obstacleLeft - 2);
        }

        setObstacleBottom((obstacleBottom) => obstacleBottom + 1);

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
        }
      }

      return () => {
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
        clearInterval(timerId);
      };
    
  }, [isGameOver, birdBottom, gap, gameDisplay, gameOver, obstacleLeft, obstacleBottom]);

  useEffect(() => {
    if (!isGameOver) {
      const timeoutId = setTimeout(() => {
        setObstacleLeft(1500);
        setObstacleBottom(Math.random() * 60);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isGameOver]);

  return (
    <>
      <div
        className="obstacle"
        style={{ left: obstacleLeft + 'px', bottom: obstacleBottom + 'px' }}
      ></div>
      <div
        className="topObstacle"
        style={{ left: obstacleLeft + 'px', bottom: obstacleBottom + gap + 'px' }}
      ></div>
    </>
  );
}

export default Obstacle;
