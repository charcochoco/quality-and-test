let numberOfTries = localStorage.getItem('numberOfTries') || 5;
let startDate = localStorage.getItem('startDate') || new Date().toLocaleDateString();
let startTimer = localStorage.getItem('startTimer') || Date.now();
let score = localStorage.getItem('score') || 1000;
let isWin = localStorage.getItem('isWin') || false;
let userName = localStorage.getItem('userName') || null;

document.addEventListener('DOMContentLoaded', async function() {
    if(startDate == new Date().toLocaleDateString()){
        localStorage.setItem('numberOfTries', numberOfTries);
        localStorage.setItem('score', score);
        localStorage.setItem('startTimer', startTimer);
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('isWin', isWin);
        localStorage.setItem('userName', userName);
    }
    else{
        localStorage.setItem('numberOfTries', 5);
        localStorage.setItem('score', 1000);
        localStorage.setItem('startTimer', Date.now());
        localStorage.setItem('startDate', new Date().toLocaleDateString());
        localStorage.setItem('isWin', false);
        localStorage.setItem('userName', null);

        await fetch('/resetGame')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('unknowWord', data.game);
            });
    }

    document.getElementById('score').innerText = "Score : " + localStorage.getItem('score');

    document.getElementById('scoresection').hidden = true;

    if (localStorage.getItem('isWin') == "false" && localStorage.getItem('numberOfTries') > 0){
        showOrHideSection(false, true);

        document.getElementById('numberOfTries').innerText = localStorage.getItem('numberOfTries');
        if (localStorage.getItem('unknowWord') === null){
            fetch('/unknowWord')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('unknowWord', data.game);
                    document.getElementById('word').innerText = data.game;
                });
        }
        else{
            document.getElementById('word').innerText = localStorage.getItem('unknowWord');
        }
    }
    else{
        showOrHideSection(true, false);

        if (localStorage.getItem('userName') != null){
            getTabScore();
            document.getElementById('scoresection').hidden = false;

            getShareUrl()

            document.getElementById('namesection').hidden = true;
        }

        if(localStorage.getItem('isWin') == "true"){
            document.getElementById('isWin').innerText = "Gagné !";
        }
        else{
            document.getElementById('isWin').innerText = "Perdu, recommencer demain";
            fetch('/trueWord')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('finalWord').innerText = "Le mot était : " + data.word;
                });
        }
    }
});

document.getElementById('testButton').addEventListener('click', function() {
    if(localStorage.getItem('numberOfTries') == 0){
        return;
    }

    const letter = document.getElementById('letterInput').value.toLowerCase();
    if (letter) {
        fetch('/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                letter: letter, 
                unknowWord: localStorage.getItem('unknowWord'), 
                numberOfTries: localStorage.getItem('numberOfTries'), 
                startTimer: localStorage.getItem('startTimer') 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('score', data.score);
                document.getElementById('score').innerText = "Score : " + localStorage.getItem('score');

                if(data.correct){
                    localStorage.setItem('unknowWord', data.newUnknowWord);
                    document.getElementById('word').innerText = data.newUnknowWord;

                    if(localStorage.getItem('unknowWord') == data.word){
                        document.getElementById('letterInput').disabled = true;
                        document.getElementById('testButton').disabled = true;
                        document.getElementById('isWin').innerText = "Gagné !";

                        showOrHideSection(true, false);

                        localStorage.setItem('isWin', true);
                    }
                }
                else{
                    const currentNumberOfTries = localStorage.getItem('numberOfTries') - 1;

                    if(currentNumberOfTries == 0){
                        document.getElementById('letterInput').disabled = true;
                        document.getElementById('testButton').disabled = true;
                        document.getElementById('finalWord').innerText = "Le mot était : " + data.word;
                        localStorage.setItem('score', 0);
                        document.getElementById('score').innerText = "Score : " + localStorage.getItem('score');
                        document.getElementById('isWin').innerText = "Perdu, recommencer demain";

                        showOrHideSection(true, false);
                    }

                    localStorage.setItem('numberOfTries', currentNumberOfTries);

                    document.getElementById('numberOfTries').innerText = currentNumberOfTries;
                }
            } else {
                alert(data.error);
            }
        });
    }
    document.getElementById('letterInput').value = '';
});

function getTabScore(){
    fetch('/scoreTab')
        .then(response => response.json())
        .then(data => {
            if(data.scoreTab == null){
                return;
            }
            const scoreTabBody = document.querySelector('#scoreTab tbody');

            scoreTabBody.innerHTML = '';

            data.scoreTab.forEach((score, index) => {
                const tr = document.createElement('tr');

                const tdPlace = document.createElement('td');
                tdPlace.innerText = data.scoreTab.length - index;
                tr.appendChild(tdPlace);

                const tdName = document.createElement('td');
                tdName.innerText = score.userName;
                tr.appendChild(tdName);

                const tdScore = document.createElement('td');
                tdScore.innerText = score.score;
                tr.appendChild(tdScore);

                const tdDate = document.createElement('td');
                tdDate.innerText = score.date;
                tr.appendChild(tdDate);

                scoreTabBody.prepend(tr);
            });
        });
}


document.getElementById('submitNameButton').addEventListener('click', function() {
    const userName = document.getElementById('nameInput').value;

    if(userName == ""){
        return;
    }

    localStorage.setItem("userName", userName);
    
    fetch('/addScoreToTab', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            score: localStorage.getItem('score'),
            userName: localStorage.getItem('userName')
        })
    })
    .then(response => response.json())
    .then(data => {
        getTabScore();
    });

    getShareUrl()

    document.getElementById('scoresection').hidden = false;
    document.getElementById('namesection').hidden = true;
});

function getShareUrl(){
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Mon score est ${localStorage.getItem('score')} !`);

    document.getElementById('facebookShare').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    document.getElementById('twitterShare').href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    document.getElementById('whatsappShare').href = `https://api.whatsapp.com/send?text=${text} ${url}`;
}

function showOrHideSection(isShowGameSection, isShowResultSection) {
    document.getElementById('gamesection').hidden = isShowGameSection;
    document.getElementById('resultsection').hidden = isShowResultSection;
}