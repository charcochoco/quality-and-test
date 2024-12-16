const Game = require('../../game.js');

let game;

beforeAll(async () => {
    game = new Game();
    await game.loadWords();
    game.word = "ecole";
    game.unknowWord = "#####";
});

describe("Game test", () => {

    test("Le mot est bien 'ecole'", () => {
        expect(game.word).toBe("ecole");
    });

    test("Test d'une lettre correct 'c'", () => {
        result = game.guess("c", game.unknowWord, Date.now(), 5);
        expect(result.success).toBe(true);
        expect(result.newUnknowWord).toBe("#c###");
    });

    test("Test d'une lettre correct qui est présent plusieurs fois 'e'", () => {
        result = game.guess("e", game.unknowWord, Date.now(), 5);
        expect(result.success).toBe(true);
        expect(result.newUnknowWord).toBe("e###e");
    });

    test("Test d'une lettre incorrect 'f'", () => {
        result = game.guess("f", game.unknowWord, Date.now(), 5);
        expect(result.success).toBe(false);
        expect(result.newUnknowWord).toBe("#####");
    });

    test("Lettre pas alphabétique", () => {
        expect(() => {game.guess("!", game.unknowWord, Date.now(), 5)}).toThrow('Veuillez entrer une seule lettre alphabétique.');
    });

    test("Test mot non défini", () => {
        game.word = null;

        expect(() => {
            game.guess("a", game.unknowWord, Date.now(), 5);
        }).toThrow("The word has not been set. Please ensure that the game has been initialized properly.");

        game.word = "ecole";
    });

    test("Calcul score correct", () => {
        result = game.calculateScore(new Date(Date.now() - 3 * 60 * 1000), 3);//il y a 3 minutes
        expect(result).toBe(720);
    });

    test("Calcul score dépassé", () => {
        result = game.calculateScore(new Date(Date.now() - 20 * 60 * 1000), 3);//il y a 20 minutes
        expect(result).toBe(0);
    });

    test("Calcul score timer non défini", () => {
        expect(() => {game.calculateScore(null, 3)}).toThrow('Le chronométrage n\'est pas correctement initialisé.');
    });

    test("Test fonction print", () => {
        result = game.print();
        expect(result).toBe("#####");
    });

    test("Test fonction trueWord", () => {
        result = game.trueWord();
        expect(result).toBe("ecole");
    });

    test("Test aucun mot disponible dans la liste", () => {
        game.listOfWords = [];
    
        expect(() => {
            game.chooseWord();
        }).toThrow("No words available to choose from.");
    });
});
