require('dotenv').config();
const express = require('express');
const path = require('path');
const Game = require('./game.js');

const PORT = process.env.PORT || 3030;

const app = express();
const game = new Game();

let scoreTab = [];
let wordDate = new Date().toLocaleDateString();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', (request, response) => {
    response.render('pages/index');
});

app.post('/guess', (request, response) => {
    try {
        const letter = request.body.letter;
        const unknowWord = request.body.unknowWord;
        const startTimer = request.body.startTimer;
        const numberOfTries = request.body.numberOfTries;
        const result = game.guess(letter, unknowWord, startTimer, numberOfTries);

        response.json({
            success: true,
            word: game.word,
            correct: result.success,
            newUnknowWord: result.newUnknowWord,
            score: result.score
        });
    } catch (error) {
        response.json({
            success: false,
            error: error.message
        });
    }
});

app.get('/trueWord', (request, response) => {
    response.json({
        word: game.trueWord()
    });
});

app.get('/unknowWord', (request, response) => {
    response.json({
        game: game.print()
    });
});

app.get('/scoreTab', (request, response) => {
    response.json({
        scoreTab: scoreTab.sort((a, b) => a.score - b.score).slice(0, 1000)
    });
});

app.post('/addScoreToTab', (request, response) => {
    const newScore = { score: request.body.score, userName: request.body.userName, date: new Date().toLocaleDateString() };
    scoreTab.push(newScore);

    response.json({
        scoreTab: scoreTab,
    });
});

app.get('/resetGame', async (request, response) => {
    if(wordDate != new Date().toLocaleDateString()){
        await game.loadWords();
        wordDate = new Date().toLocaleDateString();
    }

    response.json({
        game: game.print()
    });
});

(async () => {
    try {
        await game.loadWords();
        app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
    } catch (error) {
        console.error("Failed to load words and start the server:", error);
    }
})();
