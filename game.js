const tools = require('./tools.js');
const csv = require('csv-parser');
const fs = require('fs');

class Game {

    constructor() {
        this.listOfWords = [];
    }

    loadWords() {
        return new Promise((resolve, reject) => {
            fs.createReadStream('words_fr.txt')
                .pipe(csv())
                .on('data', (row) => {
                    this.listOfWords.push(row.word.toLowerCase());
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                    this.chooseWord();
                    resolve();
                })
                .on('error', reject);
        });
    }

    chooseWord() {
        if (this.listOfWords.length > 0) {
            this.word = this.listOfWords[tools.getRandomInt(this.listOfWords.length)];
            this.unknowWord = this.word.replace(/./g, '#');
        } else {
            throw new Error("No words available to choose from.");
        }
    }

    calculateScore(startTimer, numberOfTries) {
        if (!startTimer) {
            throw new Error("Le chronométrage n'est pas correctement initialisé.");
        }

        const timeElapsedInSeconds = Math.floor((Date.now() - startTimer) / 1000);
        let currentScore = 1000;
        currentScore -= timeElapsedInSeconds;
        currentScore -= 50 * (5 - numberOfTries);

        if (currentScore < 0) {
            currentScore = 0;
        }

        return currentScore;
    }

    guess(oneLetter, unknowWord, startTimer, numberOfTries) {
        if (!this.word) {
            throw new Error("The word has not been set. Please ensure that the game has been initialized properly.");
        }
        
        if (!/^[a-zA-Z]$/.test(oneLetter)) {
            throw new Error("Veuillez entrer une seule lettre alphabétique.");
        }

        let isReplace = false;
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === oneLetter) {
                unknowWord = tools.replaceAt(unknowWord, i, oneLetter);
                isReplace = true;
            }
        }
        
        if (isReplace) {
            return {success: true, newUnknowWord: unknowWord, score: this.calculateScore(startTimer, numberOfTries)};
        } else {
            return {success: false, newUnknowWord: unknowWord, score: this.calculateScore(startTimer, numberOfTries - 1)};
        }
    }

    print() {
        return this.unknowWord;
    }
    
    trueWord() {
        return this.word;
    }

}

module.exports = Game;
