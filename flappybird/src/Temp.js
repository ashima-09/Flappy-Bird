import { useEffect, useRef, useState } from "react";

const birdRef = useRef(null);
const gameDisplayRef = useRef(null);
const groundRef = useRef(null);


useEffect(() => {
  const bird = birdRef.current;
  const gameDisplay = gameDisplayRef.current;
  const ground = groundRef.current;
}, []);

const [birdBottom, setBirdBottom] = useState(100);
const [birdLeft] = useState(520);
const [gravity] = useState(3);
const [isGameOver, setIsGameOver] = useState(false);
const [gap] = useState(430);

function startGame() {
  setBirdBottom(birdBottom => birdBottom - gravity);
  // birdBottom -= gravity;
}

useEffect(() => {
  const gameTimerId = setInterval(startGame, 20);
  return () => {
    clearInterval(gameTimerId);
  }
}, []);

function generateObstacle() {
  const [obstacleLeft, setObstacleLeft] = useState(1500);
  const [randomHeight, setRandomHeight] = useState(Math.random() * 60);
  const [obstacleBottom, setObstacleBottom] = useState(randomHeight);

  // const obstacle = document.createElement('div');
  const obstacle = document.createElement('div', { style: { obstacle_style } }, { className: 'obstacle' });
  const topObstacle = document.createElement('div', { style: { topObstacle_style } }, { className: 'topObstacle' });
  // const obstacle = document.createElement('div', {
  //   style:
  //   {
  //     backgroundImage: `url(${img2})`,
  //     width: '60px',
  //     height: '300px',
  //     position: 'absolute',
  //     bottom: obstacleBottom + 'px',
  //     left: obstacleLeft + 'px'
  //   }
  // }, { className: 'obstacle' });
  // const topObstacle = document.createElement('div', {
  //   style:
  //   {
  //     backgroundImage: `url(${img2})`,
  //     width: '60px',
  //     height: '300px',
  //     position: 'absolute',
  //     transform: 'rotate(180deg)',
  //     bottom: obstacleBottom + gap + 'px',
  //     left: obstacleLeft + 'px'
  //   }
  // }, { className: 'topObstacle' });

  if (!isGameOver) {
    obstacle_style = {
      backgroundImage: `url(${img2})`,
      width: '60px',
      height: '300px',
      position: 'absolute',
      bottom: obstacleBottom + 'px',
      left: obstacleLeft + 'px'
    }

    topObstacle_style = {
      backgroundImage: `url(${img2})`,
      width: '60px',
      height: '300px',
      position: 'absolute',
      transform: 'rotate(180deg)',
      bottom: obstacleBottom + gap + 'px',
      left: obstacleLeft + 'px'
    }
  }

  

}

useEffect(() => {

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500)
      setBirdBottom(birdBottom => birdBottom + 70);
  }

  document.addEventListener('keyup', control);
  return () => {
    document.removeEventListener('keyup', control);
  }
}, []);



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
            <div className="bird" ref={birdRef} style={{ backgroundImage: `url(${img3})`, height: '45px', width: '60px', position: 'absolute', bottom: 100, bottom: birdBottom, left: birdLeft }}>
            </div>
          </div>
        </div>
        <div className="ground w-100" ref={groundRef} style={{ backgroundImage: `url(${img4})`, position: 'absolute', zIndex: +1, top: '580px', height: '150px', bottom: '120px' }}>
        </div>
      </div></>

  );
}

