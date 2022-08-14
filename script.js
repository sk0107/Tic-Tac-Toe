var board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
var sqLen = 0;
var turn = 0;
var computerDifficulty = 0;
const boardRatio = 0.375;
window.onresize = drawBoard;

function drawX(i, j) {
    const lineThicknessRatio = 0.04;
    const xSize = 0.6;

    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = canvas.width * lineThicknessRatio;
    ctx.strokeStyle = "#FF0000";
    ctx.lineCap = "round";

    var x = (2*j + 1) * sqLen / 2;
    var y = (2*i + 1) * sqLen / 2;

    ctx.beginPath();
    ctx.moveTo(x - sqLen / 2 * xSize, y - sqLen / 2 * xSize);
    ctx.lineTo(x + sqLen / 2 * xSize, y + sqLen / 2 * xSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - sqLen / 2 * xSize, y + sqLen / 2 * xSize);
    ctx.lineTo(x + sqLen / 2 * xSize, y - sqLen / 2 * xSize);
    ctx.stroke();
}

function drawO(i, j) {
    const lineThicknessRatio = 0.04;
    const oSize = 0.6;

    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = canvas.width * lineThicknessRatio;
    ctx.strokeStyle = "#0000FF";

    var x = (2*j + 1) * sqLen / 2;
    var y = (2*i + 1) * sqLen / 2;

    ctx.beginPath();
    ctx.arc(x, y, sqLen * oSize / 2, 0*Math.PI, 2*Math.PI);
    ctx.stroke();
}

function drawBoard() {
    const lineThicknessRatio = 0.02;

    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth * boardRatio;
    canvas.height = canvas.width;
    ctx.lineWidth = canvas.width * lineThicknessRatio * 2;

    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = canvas.width * lineThicknessRatio;
    sqLen = canvas.width / 3;

    ctx.beginPath();
    ctx.moveTo(sqLen, 0);
    ctx.lineTo(sqLen, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(2 * sqLen, 0);
    ctx.lineTo(2 * sqLen, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 3);
    ctx.lineTo(canvas.width, canvas.height / 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 2 * canvas.height / 3);
    ctx.lineTo(canvas.width, 2 * canvas.height / 3);
    ctx.stroke();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == 0) {
                drawX(i, j);
            } else if (board[i][j] == 1) {
                drawO(i, j);
            }
        }
    }
}

function checkWin() {
    if (turn < 3) {
        return -1;
    }
    if (board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0] >= 0) {
        return board[0][0];
    }
    if (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0] >= 0) {
        return board[1][0];
    }
    if (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0] >= 0) {
        return board[2][0];
    }
    if (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0] >= 0) {
        return board[0][0];
    }
    if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] >= 0) {
        return board[0][1];
    }
    if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] >= 0) {
        return board[0][2];
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] >= 0) {
        return board[0][0];
    }
    if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] >= 0) {
        return board[2][0];
    }
    return -1;
}

function endGame(result) {
    if (computerDifficulty) {
        if (result == 0) {
            document.getElementById("result").innerHTML = "You won!";
        } else if (result == 1) {
            document.getElementById("result").innerHTML = "Sorry, you lost.";
        } else {
            document.getElementById("result").innerHTML = "It was a tie.";
        }
    } else {
        if (result == 0) {
            document.getElementById("result").innerHTML = "Player 1 won!";
        } else if (result == 1) {
            document.getElementById("result").innerHTML = "Player 2 won!";
        } else {
            document.getElementById("result").innerHTML = "It was a tie.";
        }
    }
    board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    turn = 0;
    document.getElementById("result").style.display = "inline-block";
    document.getElementById("back-button").innerHTML = "Play again";
}

function computerMove() {
    if (computerDifficulty > 1) {
        // for the win
        for (let i = 0; i < 3; i++) {
            if (board[i][0] + board[i][1] + board[i][2] == 1 && board[i][0] != 0 && board[i][1] != 0 && board[i][2] != 0) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == -1) {
                        board[i][j] = 1;
                        return;
                    }
                }
            }
            if (board[0][i] + board[1][i] + board[2][i] == 1 && board[0][i] != 0 && board[1][i] != 0 && board[2][i] != 0) {
                for (let j = 0; j < 3; j++) {
                    if (board[j][i] == -1) {
                        board[j][i] = 1;
                        return;
                    }
                }
            }
        }
        if (board[0][0] + board[1][1] + board[2][2] == 1 && board[0][0] != 0 && board[1][1] != 0 && board[2][2] != 0) {
            for (let i = 0; i < 3; i++) {
                if (board[i][i] == -1) {
                    board[i][i] = 1;
                    return;
                }
            }
        }
        if (board[2][0] + board[1][1] + board[0][2] == 1 && board[2][0] != 0 && board[1][1] != 0 && board[0][2] != 0) {
            for (let i = 0; i < 3; i++) {
                if (board[2-i][i] == -1) {
                    board[2-i][i] = 1;
                    return;
                }
            }
        }
        // defense
        for (let i = 0; i < 3; i++) {
            if (board[i][0] + board[i][1] + board[i][2] == -1 && board[i][0] != 1 && board[i][1] != 1 && board[i][2] != 1) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == -1) {
                        board[i][j] = 1;
                        return;
                    }
                }
            }
            if (board[0][i] + board[1][i] + board[2][i] == -1 && board[0][i] != 1 && board[1][i] != 1 && board[2][i] != 1) {
                for (let j = 0; j < 3; j++) {
                    if (board[j][i] == -1) {
                        board[j][i] = 1;
                        return;
                    }
                }
            }
        }
        if (board[0][0] + board[1][1] + board[2][2] == -1 && board[0][0] != 1 && board[1][1] != 1 && board[2][2] != 1) {
            for (let i = 0; i < 3; i++) {
                if (board[i][i] == -1) {
                    board[i][i] = 1;
                    return;
                }
            }
        }
        if (board[2][0] + board[1][1] + board[0][2] == -1 && board[2][0] != 1 && board[1][1] != 1 && board[0][2] != 1) {
            for (let i = 0; i < 3; i++) {
                if (board[2-i][i] == -1) {
                    board[2-i][i] = 1;
                    return;
                }
            }
        }
        if (computerDifficulty > 2) {
            // prevent forks
            if (board[0][0] == -1 && board[0][1] == 0 && board[0][2] == -1 && board[1][0] == 0 && board[2][0] == -1) {
                board[0][0] = 1;
                return;
            }
            if (board[0][0] == -1 && board[0][1] == 0 && board[0][2] == -1 && board[1][2] == 0 && board[2][2] == -1) {
                board[0][2] = 1;
                return;
            }
            if (board[2][0] == -1 && board[2][1] == 0 && board[2][2] == -1 && board[1][0] == 0 && board[0][0] == -1) {
                board[2][0] = 1;
                return;
            }
            if (board[2][0] == -1 && board[2][1] == 0 && board[2][2] == -1 && board[1][2] == 0 && board[0][2] == -1) {
                board[2][2] = 1;
                return;
            }
            if (turn == 3 && board[0][0] == 0 && board[1][1] == 1 && board[2][2] == 0) {
                let i = Math.floor(Math.random() * 3), j = Math.floor(Math.random() * 3);
                while (i + j == 2 || board[i][j] != -1) {
                    i = Math.floor(Math.random() * 3), j = Math.floor(Math.random() * 3);
                }
                board[i][j] = 1;
                return;
            }
            if (turn == 3 && board[2][0] == 0 && board[1][1] == 1 && board[0][2] == 0) {
                let i = Math.floor(Math.random() * 3), j = Math.floor(Math.random() * 3);
                while (i == j || board[i][j] != -1) {
                    i = Math.floor(Math.random() * 3), j = Math.floor(Math.random() * 3);
                }
                board[i][j] = 1;
                return;
            }
        }
        // take best position
        if (board[1][1] == -1) {
            board[1][1] = 1;
            return;
        }
        // pick random
        if (turn == 1) {
            let i = Math.floor(Math.random() * 2), j = Math.floor(Math.random() * 2)
            while (board[i*2][j*2] != -1) {
                i = Math.floor(Math.random() * 2), j = Math.floor(Math.random() * 2)
            }
            board[i*2][j*2] = 1;
            return;
        }
    }
    let i = Math.floor(Math.random() * 3), j = Math.floor(Math.random() * 3)
    while (board[i][j] != -1) {
        i = Math.floor(Math.random() * 3), j = Math.floor(Math.random() * 3)
    }
    board[i][j] = 1;
}

function playGame(event) {
    if (document.getElementById("result").style.display == "inline-block") {
        document.getElementById("result").style.display = "none";
        board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
        turn = 0;
    }
    drawBoard();
    const canvas = document.getElementById("board");
    document.getElementById("back-button").innerHTML = "Go back";
    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;

    let i = parseInt(clickY / sqLen);
    let j = parseInt(clickX / sqLen);
    if (i >= 0 && i < 3 && j >= 0 && j < 3 && board[i][j] < 0) {
        board[i][j] = turn % 2;
        validMove = true;
        turn++;
        var result = checkWin();
        drawBoard();
        if (result >= 0 || turn == 9) {
            endGame(result);
            return;
        }
        if (computerDifficulty && result == -1 && turn < 9) {
            computerMove();
            turn++;
            drawBoard();
            result = checkWin();
            if (result >= 0 || turn == 9) {
                endGame(result);
            }
        }
    }
}

function startEasyComputerGame() {
    computerDifficulty = 1;
    startGame();
}

function startMediumComputerGame() {
    computerDifficulty = 2;
    startGame();
}

function startHardComputerGame() {
    computerDifficulty = 3;
    startGame();
}

function startFriendGame() {
    computerDifficulty = 0;
    startGame();
}

function startGame() {
    board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    turn = 0;
    document.getElementById("back-button").innerHTML = "Go back";
    const startElems = document.getElementsByClassName("start");
    for (let i = 0; i < startElems.length; i++) {
        startElems[i].style.display = "none";
    }
    const gameElems = document.getElementsByClassName("game");
    for (let i = 0; i < gameElems.length; i++) {
        gameElems[i].style.display = "inline-block";
    }
    document.getElementById("result").style.display = "none";
    drawBoard();
}

function goBack() {
    board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    turn = 0;
    computerDifficulty = 0;
    const startElems = document.getElementsByClassName("start");
    for (let i = 0; i < startElems.length; i++) {
        startElems[i].style.display = "inline-block";
    }
    document.getElementById("title").style.display = "block";
    const gameElems = document.getElementsByClassName("game");
    for (let i = 0; i < gameElems.length; i++) {
        gameElems[i].style.display = "none";
    }
}