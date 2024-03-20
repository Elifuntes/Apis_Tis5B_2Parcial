import { Component, OnInit } from '@angular/core';

export class Question {
  text: string = "";
  choices: string[] = [];
  answer: string = "";

  constructor(text: string, choices: string[], answer: string) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;

  }

  correctAnswer(choice: string) {
    return choice === this.answer;
  }
}
export class Quiz {
  score: number = 0;
  questions: Question[] = [];
  questionIndex: number = 0;
  constructor(questions: Question[]) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  getQuestionIndex() {
    return this.questions[this.questionIndex]
  }
  isEnded() {
    return this.questions.length === this.questionIndex;
  }

  guess(answer: string) {

    if (this.getQuestionIndex().correctAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }

}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {


  questions: Question[] = [
    new Question("¿Una de las maravillas con las que cuenta mexico?", ["Chichen itza", "La basilica de Guadalupe", "El rio lerma", "Nada"], "Chichen itza"),
    new Question("¿Cuál es el nombre del protagonista de Dragon Ball?", ["a) Goku", "b) Vegeta", "c) Gohan", "d) Piccolo"], "a)Goku"),
    new Question("¿Qué objeto es necesario para invocar al dragón Shenron?", ["a) Las Esferas del Dragón","b) El Radar del Dragón","c) La Espada Z","d) La Capa de Invisibilidad"], "a) Las Esferas del Dragón"),
    new Question("¿Me va a poner 10?", ["Si", "No", "No se lo merece", "Claro q si"], "Claro q si"),
  ];

  quiz = new Quiz(this.questions);

  preguntaActual: string = "";

  progreso: string = "";
  gameOver: string = "";

  constructor() { }

  ngOnInit() {
    this.populate();
  }

  choicesActuales: string[] = [];

  guess(id: number, guess: string) {
    this.quiz.guess(guess);
    this.populate();
  }
  populate() {
    if (this.quiz.isEnded()) {
      this.showScores();
    } else {
      this.preguntaActual = this.quiz.getQuestionIndex().text;
      //show choices
      this.choicesActuales = this.quiz.getQuestionIndex().choices;

      this.showProgress();
    }
  }

  showProgress() {
    var currentQuestionNumber = this.quiz.questionIndex + 1;
    this.progreso = "Questions " + currentQuestionNumber + " of " + this.quiz.questions.length;
  }

  showScores() {
    this.gameOver = "Your Scores: " + this.quiz.score;
  }

  showingResults(){
    return this.gameOver == "" ;
  }
}