let counter = 1
let table = `<table class='feedback-table'>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
             </table>`
function clearLastPrompt() {
  $('#question').html('')
}

function displayQuestion(question){
  clearLastPrompt()
  $('#question').html(question)
  if (counter == 1){
    listenForAnswer()
  }
}

function listenForAnswer(){
  $('.answer-button').click(function() {
      displayFeedback($(this).data().id)
  })
}
function displayFeedback(answer){
  let question = $('#question').text()
  $('.feedback-table:first').append(`<tr><td>${question}</td><td>${answer}</td><td>${eval(question)}</td></tr><br />`)
  if (answer == eval(question)){
    $('.feedback-table:first tr:last').addClass('correct-answer')
  }
  else {
    $('.feedback-table:first tr:last').addClass('incorrect-answer')
  }
  counter ++
  beginTurnCycle($("input[name='difficulty']:checked").val())
}

function beginTurnCycle(difficulty){
  if (counter <= 20){
    let question = createQuestion(difficulty)
    displayQuestion(question)
  }
  else {
    endSession()
  }
}

function endSession(){
  counter = 1
  $('.answer-button').off()
  alert('Study Session Complete!')
  listenForStartSession()
}

function createQuestion(difficulty){
  if (difficulty == 'easy'){
    return questionMaker.easyQuestion()
  }
  else if (difficulty == 'medium'){
    return questionMaker.medQuestion()
  }
  else {
    return questionMaker.hardQuestion()
  }
}
function listenForStartSession() {
  $('#start-game-button').click(function() {
      beginTurnCycle($("input[name='difficulty']:checked").val())
      $('#feedback-holder').prepend(table)
      $('#start-game-button').off()
  })
}

$(document).ready( () =>{
  listenForStartSession()
  $('form').on('submit', (event) => event.preventDefault());
})
