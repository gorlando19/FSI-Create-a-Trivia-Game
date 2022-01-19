// Your Code Here

//declaring variables
let startoverglob = true 
let startoverloc = false
let userName = null
let answer
let userscore
let scorepercentage
let numberOfquestions
let numberOfansweredquestions
let serializedGames
let highestscore
let userscorehistory
let alltimer = {}
let string1

//declaring objects and array
let games = []
let game = { }

//functions
function userhistoryfct(endOfgame) {
    string1 = ''
    for (let x = 0; x < games.length; x++) {
        if (games[x].score > alltimer.alltimescore) {
            alltimer.alltimeuser = games[x].user
            alltimer.alltimescore = games[x].score
        }
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
        if (endOfgame === false) {
            string1 = ('Your score(s): ' +userscorehistory) 
        } else {
            string1 = ('Your score is ' +userscore)
        }
        if (highestscore > 0) {
            string1 = string1 + '\nYour highest score is ' +highestscore
        }
        if (alltimer.alltimescore > 0) {
            string1 = string1 + "\n\nThe all time higher score belongs to: \n" + alltimer.alltimeuser + " and it is: " + alltimer.alltimescore 
        }
    window.alert(string1)
    }
}

function scorepercentageFct(score, idx) {
    let percentage = score/idx
    return percentage
}

//start

while (startoverglob === true) {
    //inizialing variables
    answer = null
    userscore = 0
    scorepercentage = 0
    numberOfquestions = 0
    numberOfansweredquestions = 0
    serializedGames = null
    highestscore = 0
    userscorehistory = null
    alltimer = {
        alltimeuser: null,
        alltimescore: 0
    }
    //login
    userName = window.prompt('Please enter your name:')

    //retrieving user history 
    serializedGames = localStorage.getItem('games')
    if(serializedGames === null){
        games = [] 
    } else {
        games = JSON.parse(serializedGames)
        userhistoryfct(false)
        
    }
    
    //question loop
    for (let i = 0; i<questions.length; i++) {
        answer = window.prompt(questions[i].text)
        numberOfquestions ++
        if (answer === null) {
            window.alert("You did not answer this question. \nYour current score is: " + userscore)
            i--
            continue
        } 
        if (answer.length===0) {
            window.alert("You did not answer this question. \nYour current score is: " + userscore)
            i--
            continue
        }
        answer = answer.toUpperCase()
        if (answer === questions[i].correctAnswer) {
            userscore += 10
            numberOfansweredquestions +=1
            window.alert("Good job :) \nYour current score is: " + userscore)
        }else {
            window.alert("Try again :( \nYour current score is: " + userscore)
        }
    }

    //rendering results
    scorepercentage = scorepercentageFct(numberOfansweredquestions, numberOfquestions)
    window.alert(userName +" you answerd correctly to the " +scorepercentage*100 +"% of a total of " +numberOfquestions +" questions. \nYour total score is " +userscore )
    //window.alert('Your total score is ' +userscore)

    //saving the results
    game = { 
        user: userName,
        score: userscore    
    }
    games.push(game)
    serializedGames = JSON.stringify(games)
    localStorage.setItem('games', serializedGames)
    userhistoryfct(true)
    while (startoverloc === false) {
        answer = window.prompt("Would you like to start over? (Y/N)")
        if (answer === null) {
            startoverglob = false
            startoverloc = true
            continue
        }
        answer = answer.toUpperCase()
        if (answer === "Y") {
            startoverglob = true
            startoverloc = true 
        } else if (answer ==="N") {
            startoverglob = false
            startoverloc = true
        }
        console.log(startoverloc)
    }
 
}
