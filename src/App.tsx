import { useEffect, useState } from 'react';
import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';

import { InfoItem } from './components/InfoItem';
import { Button } from './components/Button';
import { GridItemType } from './types/GridItemType';
import { GridItem } from './components/GridItem';

import { items } from './data/items';
import { formatTimeElapsed } from './helpers';

function App() {
  const [palying, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeELapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => {
    let timer = setInterval(() => {
      if (palying) setTimeELapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  },[palying, timeElapsed]);

  useEffect(() => resetAndCreateGrid(), []);

  const resetAndCreateGrid = () => {
    // passo 1 - resetar o jogo
    setTimeELapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // passo 2 - criar o grid
    // 2.1 criar grid vazio
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i ++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    }
    // 2.2 preencher grid
    for (let w = 0; w < 2; w ++) {
      for (let x = 0; x < items.length; x ++) {
        let pos: number = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));  
        }
        tmpGrid[pos].item = x;
      }
    }

    // 2.3 jogar no state
    setGridItems(tmpGrid);

    // passo 3 - começar 
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {

  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value="0" />
        </C.InfoArea>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />

      </C.Info>


      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) =>
            <GridItem 
              key={index} 
              item={item}
              onClick={() => handleItemClick(index)} />
          )}
        </C.Grid>
      </C.GridArea>


    </C.Container>
  );
}

export default App;
