function startGame(difficulty){
  console.log(difficulty)
}
$(document).ready( () =>{
  $('#start-game-button').click(function() {
      startGame($("input[name='difficulty']:checked").val())
  })
  $('form').on('submit', (event) => event.preventDefault());

})
