let counter = 1
let table = `<table class='feedback-table'>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
             </table>`

function listenForStartSession() {
$('#start-game-button').click(function() {
   beginTurnCycle($("input[name='difficulty']:checked").val())
   $('#feedback-holder').prepend(table)
   $('#start-game-button').off()
})
}

function beginTurnCycle(difficulty){
 if (counter <= 20){
   let question = getQuestion(difficulty)
   displayQuestion(question)
 }
 else {
   endSession()
 }
}

function getQuestion(difficulty){
  return questionMaker.createQuestion(difficulty)
}

function displayQuestion(question){
  clearLastPrompt()
  $('#question').html(question)
  if (counter == 1){
    listenForAnswer()
  }
}

function clearLastPrompt() {
  $('#question').html('')
}

function listenForAnswer(){
  $('.answer-button').click(function() {
      displayFeedback($(this).data().id)
  })
}

function displayFeedback(answer){
  let question = $('#question').text()
  let feedback = `<tr><td>${question}</td><td>${answer}</td><td>${eval(question)}</td></tr>`
  $(feedback).insertAfter('.feedback-table:first tr:first')
  styleFeedback(answer, question)
  continueSession()
}

function styleFeedback(answer, question) {
  if (answer == eval(question)){
    $('.feedback-table:first tr:nth-child(2)').addClass('correct-answer')
  }
  else {
    $('.feedback-table:first tr:nth-child(2)').addClass('incorrect-answer')
  }
}

function continueSession() {
  counter ++
  beginTurnCycle($("input[name='difficulty']:checked").val())
}


function endSession(){
  counter = 1
  $('.answer-button').off()
  alert('Study Session Complete!')
  listenForStartSession()
}

$(document).ready( () =>{
  listenForStartSession()
  $('form').on('submit', (event) => event.preventDefault());
})
