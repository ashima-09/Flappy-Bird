import React, { useState, useEffect, useRef } from 'react';
import img1 from './images/bg.png';
import img2 from './images/pipe.png';
import img3 from './images/bird.png';
import img4 from './images/gnd.png';
import './style.css';


function Game() {
  const birdRef = useRef(null);
  const gameDisplayRef = useRef(null);
  const groundRef = useRef(null);


  useEffect(() => {
    const bird = birdRef.current;
    const gameDisplay = gameDisplayRef.current;
    const ground = groundRef.current;
  },[]);

  const [birdBottom, setBirdBottom] = useState(100);
  const [birdLeft] = useState(520);
  const [gravity] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gap] = useState(430);

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
  generateObstacle()
  function gameOver() {
    setIsGameOver(true);
    hit = true;
    clearInterval(gameTimerId);
    document.removeEventListener('keyup', control);
  }

  // return (
  //   <div>
  //     <div className="bird" ref={birdRef} style={{ bottom: birdBottom, left: birdLeft }} />
  //     <div className="game-container" ref={gameDisplayRef}>
  //       <div className="ground" ref={groundRef}/>
  //     </div>
  //   </div>
  // );
}



function App() {
  // game();
  return (
    <>
      <Game />

      <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
        {/* <style dangerouslySetInnerHTML={{ __html: "\n .obstacle {\n            background-image: ;\n            width: 60px;\n            height: 300px;\n            position: absolute;\n        }\n\n        .topObstacle {\n            background-image: url(images/pipe.png);\n            width: 60px;\n            transform: rotate(180deg);\n            height: 300px;\n            position: absolute;\n        }\n    " }} /> */}
        {/* {game()} */}
        {/* <Game/> */}
        <div className="game-container w-100" ref={gameDisplayRef} style={{ height: '730px', position: 'absolute' }}>
          <div className="sky w-100" style={{ backgroundImage: `url(${img1})`, height: '580px', position: 'absolute' }}>
            {/* <div className="obstacle" style={{backgroundImage: `url(${img2})`, width: '60px',height: '300px'}}></div> */}
            <div className="bird" ref={birdRef} style={{ backgroundImage: `url(${img3})`, height: '45px', width: '60px', position: 'absolute', bottom: 100,bottom: birdBottom, left: birdLeft }}>
            </div>
          </div>
        </div>
        <div className="ground w-100" ref={groundRef} style={{ backgroundImage: `url(${img4})`, position: 'absolute', zIndex: +1, top: '580px', height: '150px', bottom: '120px' }}>
        </div>
      </div></>

  );
}

export default App;

