// Your Code Here

//declaring variables
let userName
let answer = null
let userscore = 0
let scorepercentage = 0
let numberOfquestions = 0
let numberOfansweredquestions = 0
let serializedGames = null
let highestscore = 0
let userscorehistory = null

//declaring objects and array
let games = []
let game = { }

//functions
function scorepercentageFct(score, idx) {
    let percentage = score/idx
    return percentage
}

//login
userName = window.prompt('Please enter your name:')
console.log(userName)

//retrieving user history 
serializedGames = localStorage.getItem('games')
if(serializedGames === null){
    games = [] 
} else {
    games = JSON.parse(serializedGames)
    for (let x = 0; x < games.length; x++) {
        if (userName === games[x].user) {
            if (userscorehistory === null) {
                userscorehistory = games[x].score
            } else {
                userscorehistory = userscorehistory + ', ' + games[x].score
            }
            if(games[x].score > highestscore) {
                highestscore = games[x].score
            }
        }
    }
    if (userscorehistory != null) {
        window.alert('Your score(s) ' +userscorehistory)
        if (highestscore > 0) {
            window.alert('Your highest score is ' +highestscore)
        } 
    }
    
}

//Start asking questions
for (let i = 0; i<questions.length; i++) {
    answer = window.prompt(questions[i].text).toUpperCase()
    console.log(answer)
    numberOfquestions ++
    if (answer === questions[i].correctAnswer) {
        userscore += 10
        numberOfansweredquestions +=1
        console.log("Good job!")
    }
    else {
        console.log('Try again!')
    }
    console.log(userName, ' current scor is ', userscore)
}

//rendering results
scorepercentage = scorepercentageFct(numberOfansweredquestions, numberOfquestions)
window.alert(userName +' you answerd correctly to the ' +scorepercentage*100 +'% of a total of ' +numberOfquestions +' questions.' )
window.alert('Your total score is ' +userscore)

//saving the results
game = { 
    user: userName,
    score: userscore    
}
console.log(game)
games.push(game)

console.log(games)

serializedGames = JSON.stringify(games)
localStorage.setItem('games', serializedGames)

