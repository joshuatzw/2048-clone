document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.querySelector('#result')
  const width = 4
  let squares = []
  let square;
  let score = 0


  // Create a playing board


  function createBoard() {
    for (let i = 0; i < width*width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }

  createBoard();

  //generate a number randomly in an empty spot on the gridDisplay
  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2
    } else {
      generate()
    }
    
    checkForStyling()
    checkForLose()
  }

  //swipe right
  function moveRight() {
    for (let i = 0; i<width*width; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour =  squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        // console.log(row)

        // Filter rows to keep elements that are !== 0.
        let filteredRow = row.filter(num => num !== 0)
        // console.log(filteredRow)
        let missing = 4 - filteredRow.length;
        let zeroes = Array(missing).fill(0)
        // console.log(zeroes)
        let newRow = zeroes.concat(filteredRow)
        // console.log(newRow)

        squares[i].innerHTML = newRow[0]
        squares[i+1].innerHTML = newRow[1]
        squares[i+2].innerHTML = newRow[2]
        squares[i+3].innerHTML = newRow[3]

      }
    }
  }

  //swipe left
  function moveLeft() {
    for (let i = 0; i<width*width; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour =  squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        // console.log(row)

        // Filter rows to keep elements that are !== 0.
        let filteredRow = row.filter(num => num !== 0)
        // console.log(filteredRow)
        let missing = 4 - filteredRow.length;
        let zeroes = Array(missing).fill(0)
        // console.log(zeroes)
        let newRow = filteredRow.concat(zeroes)
        // console.log(newRow)

        squares[i].innerHTML = newRow[0]
        squares[i+1].innerHTML = newRow[1]
        squares[i+2].innerHTML = newRow[2]
        squares[i+3].innerHTML = newRow[3]

      }
    }
  }

  //swipe down
  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+width*2].innerHTML
      let totalFour = squares[i+width*3].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      let filteredColumn = column.filter(num => num !== 0);
      let missing = 4 - filteredColumn.length;
      let zeroes = Array(missing).fill(0);
      let newColumn = zeroes.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i+width].innerHTML = newColumn[1]
      squares[i+width*2].innerHTML = newColumn[2]
      squares[i+width*3].innerHTML = newColumn[3]
    }
  }

     //swipe up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+width*2].innerHTML
      let totalFour = squares[i+width*3].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      let filteredColumn = column.filter(num => num !== 0);
      let missing = 4 - filteredColumn.length;
      let zeroes = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeroes)

      squares[i].innerHTML = newColumn[0]
      squares[i+width].innerHTML = newColumn[1]
      squares[i+width*2].innerHTML = newColumn[2]
      squares[i+width*3].innerHTML = newColumn[3]
    }
  }

  
  function combineRow() {
    for (let i =0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i+1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineColumn() {
    for (let i =0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i+width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }
  
  // assign Keycodes
  function control(e) {
    if(e.keyCode === 37) {
      keyLeft()
    } 
    else if (e.keyCode === 39) {
      // 39 is the keycode for the right arrow button.
      keyRight()
    }
    else if (e.keyCode === 38) {
      keyUp()
    }
    else if (e.keyCode === 40) {
      keyDown()
    } else {
      return
    }
  }

  document.addEventListener('keyup', control);
  
  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  // Check for win
  function checkForWin() {
    for (let i = 0; i<squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "you win!";
        document.removeEventListener('keyup', control)
      }
    }
  }

  // check for Lose
  function checkForLose() {
    let zeroes = 0
    for (let i = 0; i<squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeroes++;
      }
    }
    if (zeroes === 0) {
      resultDisplay.innerHTML = "you lose!";
    }
  }


  // Check for Styling

  function checkForStyling() {
    for (let i = 0; i < squares.length; i++) {

      if (squares[i].innerHTML == 0) { squares[i].className = 'zero-tile' }
      else if (squares[i].innerHTML == 2) {squares[i].className = 'two-tile'}
      else if (squares[i].innerHTML == 4) {squares[i].className = 'four-tile'}
      else if (squares[i].innerHTML == 8) {squares[i].className = 'eight-tile'}
      else if (squares[i].innerHTML == 16) {squares[i].className = 'sixteen-tile'}
      else if (squares[i].innerHTML == 32) {squares[i].className = 'thirtytwo-tile'}
      else if (squares[i].innerHTML == 64) {squares[i].className = 'sixtyfour-tile'}
      else if (squares[i].innerHTML == 128) {squares[i].className = 'onetwoeight-tile'}
      else if (squares[i].innerHTML == 256) {squares[i].className = 'twofivesix-tile'}
      else if (squares[i].innerHTML == 512) {squares[i].className = 'fiveonetwo-tile'}
      else if (squares[i].innerHTML == 1024) {squares[i].className = 'onezerotwofour-tile'}
      else if (squares[i].innerHTML == 2048) {squares[i].className = 'twozerofoureight-tile'}
  
      // switch(parseInt(squares[i].innerHTML)) {
      //   case 0:
      //     squares[i].className = '';
          
      //   case 2:
      //     squares[i].className = '';
          
      //   case 4:
      //     squares[i].className = '';
      //     squares[i].className = 'four-tile'
      //   case 8:
      //     squares[i].className = '';
      //     squares[i].className = 'eight-tile'
      //   case 16:
      //     squares[i].className = '';
      //     squares[i].className = 'sixteen-tile'
      //   case 32:
      //     squares[i].className = '';
      //     squares[i].className = 'thirtytwo-tile'
      // }
    }
  }

})