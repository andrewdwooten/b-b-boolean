const operators = [ '>', '<', '==', '!=', '>=', '<=']
const comparors = ['||', '&&']
const booleans  = ['false', 'true']
const difficulties = ['easy', 'medium', 'hard']

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function randomNumber(){
  return Math.floor(Math.random() * 100)
}

class questionMaker {

  static base(){
    return `${randomNumber()} ${operators.random()} ${randomNumber()}`
  }

  static hardBase(){
    return `${booleans.random()} ${comparors.random()} ${booleans.random()}`
  }

  static easyQuestion(){
    return `${questionMaker.base()} ${comparors.random()} ${questionMaker.base()}`
  }

  static medQuestion(){
    return `${questionMaker.easyQuestion()} ${comparors.random()} ${questionMaker.easyQuestion()}`
  }

  static hardQuestion(){
    if (counter % 2 == 0) {
      return `((${questionMaker.hardBase()}) ${comparors.random()} ${booleans.random()}) ${comparors.random()} ((${questionMaker.hardBase()}) ${comparors.random()} ${booleans.random()})`
    }
    else if (counter % 3 == 0) {
      return `((${questionMaker.hardBase()}) ${comparors.random()} ${booleans.random()}) ${comparors.random()} (!(${questionMaker.hardBase()}) ${comparors.random()} ${booleans.random()})`
    }
    else {
      return `(!(${questionMaker.hardBase()}) ${comparors.random()} ${booleans.random()}) ${comparors.random()} ((${questionMaker.hardBase()}) ${comparors.random()} ${booleans.random()})`
    }
  }

  static randomQuestion(){
    let randomDifficulty = difficulties.random()
    if (randomDifficulty == 'easy'){
      return questionMaker.easyQuestion()
    }
    else if (randomDifficulty == 'medium'){
      return questionMaker.medQuestion()
    }
    else {
      return questionMaker.hardQuestion()
    }
  }
}
