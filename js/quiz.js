//CSUMB - CST 336 - Summer 2019
//Quiz.js - Bodey Provansal
//VARIABLES
var questionTot = 3;
var questionNum = -1;
var numCorrect = 0;
var playerName = "";
var userAnswers = [];
var questions = [{
  question: "Java, the Programming Language, had two previous names before being officially released by Sun Microsystems in 1995. What were they?",
    answers: {
      a: "Green Tree and Oak", 
      b: "Green Tea and Espresso",
      c: "C2 and Better Than FORTRAN"
    },
  correctAnswer: "Green Tree and Oak"
}, 
{
 question: "Java, a slang term for coffee, is made from the _____ of Coffea Trees",
  answers: {
    a: "Beans",
    b: "Seeds",
    c: "Bark"
  },
  correctAnswer: "Seeds"
}, 
{
  question: "Java, an island that sits between the Indian and Pacific Ocean, is a part of what country?",
    answers: {
      a: "Australia",
      b: "Malaysia",
      c: "Indonesia"
    },
  correctAnswer: "Indonesia"
}]; 
//LISTENERS
$(".nameBtn").click(function() {
  saveName();
  disableButton($(this));
});

$(".startBtn").click(function() {      
    $("#name").empty();
    getQuestion(questionNum + 1);
    getAnswers();
    getButtons();
  });

$(".submitBtn").click(function() {    
    saveAnswer();
    if (questionNum == (questionTot - 1)) {
      $(".submitQuizBtn").show();
    }
  });
$(".submitQuizBtn").click(function() {    
    saveAnswer();
    checkAnswers();
    displayResults();
    disableButton($(this));
  });
$(".prevBtn").click(function() {
    getQuestion(questionNum - 1);
    getAnswers();
    getButtons();
  });
$(".nextBtn").click(function() {
    getQuestion(questionNum + 1);
    getAnswers();
    getButtons();
  });
//FUNCTIONS
function saveName() {
  playerName = $("#nameText").val();
  $("#namePopup").append("<p class='name-p'> Hello, " + playerName + "!</p><br />");
  $("#namePopup").append("<p class='name-p'> Let's Get Started.</p>");
  $("#namePopup").show();
  $(".startBtn").show();
}

function startQuiz() {
  getQuestion(0);
  getAnswers();
  getButtons();
}

function getQuestion(num) {
  questionNum = num;
  $("#question").empty();
  $("#question").append("<h2>Question # " + (questionNum + 1) + "</h2>");
  $("#question").append("<p> " + questions[questionNum].question + " </p>");    
}

function getAnswers() {
  $("#answers").empty();
  $("#feedback").text("");
  $("#answers").append("<input type='radio' class='answer' name='answer' value='"+ questions[questionNum].answers.a +"'> " + questions[questionNum].answers.a + " <br>");
  $("#answers").append("<input type='radio' class='answer' name='answer' value='"+ questions[questionNum].answers.b +"'> " + questions[questionNum].answers.b + " <br>");
  $("#answers").append("<input type='radio' class='answer' name='answer' value='"+ questions[questionNum].answers.c +"'> " + questions[questionNum].answers.c + " <br>"); 
}

function getButtons() {  
  if (questionNum == (questionTot - 1)){
    //
  } else {
    $(".submitBtn").show();
  }
  if (questionNum < 1) {
      $(".prevBtn").hide();
    } else {
      $(".prevBtn").show();
    }
  if (questionNum == (questionTot - 1)) {
      $(".nextBtn").hide();
    } else {
      $(".nextBtn").show();
    }
}

function saveAnswer() {
  currAnswer = $("input[type='radio'][class='answer']:checked").val();
  if (currAnswer != undefined) {
    userAnswers[questionNum] = currAnswer;
  } else {
    currAnswer = "";
    userAnswers[questionNum] = currAnswer;
  }
  $("#feedback").text("Your answer is saved: " + currAnswer);
}

function checkAnswers() {
  for (var i = 0; i <= questionNum; i++) {
    if(userAnswers[i] == questions[i].correctAnswer) {      
      numCorrect += 1;
    }    
  }
}

function displayResults() {
  $("#resultsDiv").append("<h2 id='resultsH2'> Here Are Your Results, " + playerName + "</h2>");
  $("#resultsDiv").append("<h3 id='resultsH3'> You answered <b>" + numCorrect + "</b> out of <b>" + questionTot +  "</b> questions correctly. </h3>");
  $("#resultsDiv").append("<p class='results-p'> <b>Here are your answers: </b></p>");
  for (var i = 0; i < userAnswers.length; i++) {
    $("#resultsDiv").append("<p class='results-p'>    Question #" + (i + 1) + ": " + userAnswers[i] + "</p>");
  }
  $("#resultsDiv").show();  
}

function disableButton(btn) {
  btn.prop("disabled", true);
}
