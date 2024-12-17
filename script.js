/* Seleciona todas as células do tabuleiro*/ 
const cells = document.querySelectorAll('[data-cell]');
/* Seleciona os elementos de pontuação*/
const scoreX = document.getElementById('score-x'); 
const scoreO = document.getElementById('score-o'); 
/*Seleciona os botões de reset*/
const resetBoardButton = document.getElementById('reset-board-button'); 
const resetScoreButton = document.getElementById('reset-score-button'); 
/* Variável para controlar de quem é a vez */ 
let isXTurn = true; 
/* Variáveis para armazenar a pontuação*/ 
let xWins = 0; 
let oWins = 0; 
/* Adiciona evento de clique a cada célula*/
cells.forEach(cell => { cell.addEventListener('click', handleClick, { once: true }); });
/* Adiciona evento de clique aos botões de reset*/ resetBoardButton.addEventListener('click', resetGame); resetScoreButton.addEventListener('click', resetScore); 
/* Função chamada quando uma célula é clicada*/
 function handleClick(e) { const cell = e.target; 
const currentClass = isXTurn ? 'x' : 'o'; 
placeMark(cell, currentClass); 
if (checkWin(currentClass)) { updateScore(currentClass); 
alert(`${currentClass.toUpperCase()} venceu!`); 
} else if (isDraw()) { alert('Empate!'); 
} else { isXTurn = !isXTurn; 
} 
} 
/* Função para marcar a célula com X ou O*/ 
function placeMark(cell, currentClass) { cell.classList.add(currentClass); cell.textContent = currentClass.toUpperCase(); 
}
/* Função para verificar se há um vencedor*/ 
function checkWin(currentClass) { const winningCombinations = [ 
[0, 1, 2], 
[3, 4, 5], 
[6, 7, 8], 
[0, 3, 6], 
[1, 4, 7], 
[2, 5, 8], 
[0, 4, 8], 
[2, 4, 6] 
]; 
return winningCombinations.some(combination => { 
return combination.every(index => { 
return cells[index].classList.contains(currentClass); 
}); 
}); 
} 
/* Função para verificar se houve empate*/ 
function isDraw() { 
return [...cells].every(cell => { 
return cell.classList.contains('x') || cell.classList.contains('o'); }); 
} 
/* Função para atualizar a pontuação*/ 
function updateScore(winner) { 
if (winner === 'x') { 
xWins++; 
scoreX.textContent = `Jogador X: ${xWins}`; 
} else { oWins++; 
scoreO.textContent = `Jogador O: ${oWins}`; 
} 
} 
/* Função para resetar o jogo*/ 
function resetGame() { 
cells.forEach(cell => { 
cell.classList.remove('x', 'o'); 
cell.textContent = ''; 
cell.addEventListener('click', handleClick, { once: true }); 
}); 
isXTurn = true;
 } 
/* Função para resetar o placar*/ 
function resetScore() { 
xWins = 0; 
oWins = 0; 
scoreX.textContent = `Jogador X: ${xWins}`; 
scoreO.textContent = `Jogador O: ${oWins}`; 
resetGame();
} 
