
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const restartBtn = document.getElementById('restart-btn')
const iconBtns = document.querySelectorAll('.icon')
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6]
  ]
let turn = ''
let winner
let tie 
let board 

//iterate through the board 
function init(){
    winner = false
    tie = false
    board = 
    ['', '', '',
    '', '', '',
    '', '', '']
}

restartBtn.addEventListener('click',reset)
iconBtns.forEach((iconBtn) => {iconBtn.addEventListener('click', selectIcon)})

squareEls.forEach((sqr) => {sqr.addEventListener('click', handleClick)})

function handleClick(e){
    let squareIndex = parseInt(e.target.id)
    if(board[squareIndex] !== '' || winner){
        return 
    }
    placePiece(squareIndex)
    checkWinner()
    switchPlayerTurn()
    render()
}

function placePiece(index){
    board[index] = turn 
}

function updateBoard(){
    board.forEach((element, index) => {//for each element inside of the board
        squareEls[index].innerText = element
    })
}

function updateMsg(){
    if(winner){
        if(turn ==='x'){
            messageEl.textContent = `Player O Wins!`;
        }
        else{
            messageEl.textContent = `Player X Wins!`;
        }
    } else if (tie) {
        messageEl.textContent = 'It\'s a Tie!';
    } else {
        messageEl.textContent = `Turn: ${turn.toUpperCase()}`;
    }
}

function switchPlayerTurn(){
    turn = turn  === 'x' ? 'o' : 'x'
}

function checkWinner(){
    winningCombos.forEach((combo) => {
        if(board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]){
            winner = true
            return
        }
        else{
            tie = board.every((sqr) => sqr !== '')
        }
    })
}

function render(){
    updateBoard()
    updateMsg()
}

function selectIcon(e){
    turn = e.target.id === 'o' ? 'o' : 'x'
    messageEl.textContent = `${turn.toUpperCase()} goes first`
    reset()
}

function reset(){
    init()
    squareEls.forEach((sqr) => {
        sqr.innerText = ''
    })
    if (turn) {
        messageEl.textContent = `Turn: ${turn.toUpperCase()}`
    }
}

init()
