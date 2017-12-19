//Declare global variables
//=============================
var time = 60;
var correctCounter =0;
var currentQuestion =  0;
var incorrectCounter =0;
var remainingQuestions =6;
var intervalId;
var questions = [{
	question: "On what day did The Titanic hit the iceberg?",
	choices:[" 18 March 1913", " 12 April 1914", " 14 April 1912"," 15 March 1915"],
	correctAnswer: 2
}, {
	question:"What percent of the people on board the Titanic survived?"  ,
	choices:[" 32%", " 4%", " 12%", " 61%"],
	correctAnswer:0
}, {
	question:"What was the name of the Titanic's captain?",
	choices:[" Captain Edward J. Smith", " Captain Franklin D. Howard", " Captain John W. Smith", " Captain Dwight Q. Edwards"
 ],
	correctAnswer:0
}, {
	question: "Where was the Titanic built? ",
	choices:[" Southampton, England", " Queenstown, Ireland", " Cherbourg, France", " Belfast, Ireland"  ],
	correctAnswer:3
}, {
	question: "How many decks were on the Titanic?",
	choices:[" 10"," 7"," 9", " 8"],
	correctAnswer:2
}, {
	question: "How many watertight compartments was the Titanic equipped with?",
	choices:[" 13"," 5"," 10"," 16"],
	correctAnswer:3
}]; 


//Supporting Functions:
//===============================================

//Timer functions

function quizTimer(){

	$("#timer").text("01:00");
 	 intervalId = setInterval( function () 
	  { time --;
	  	var converted = timeConverter(time);
	  	 $("#timer").text(converted);
	  	
	  	if (time===0){
	 	clearInterval(intervalId);
	 	endGame();
	 } 
	 }, 1000);
}


function timeConverter(t) {

	  var minutes = Math.floor(t / 60);
	  var seconds = t - (minutes * 60);

	  if (seconds < 10) {
	    seconds = "0" + seconds;
	  }

	  if (minutes === 0) {
	    minutes = "00";
	  } else if (minutes < 10) {
	    minutes = "0" + minutes;
	  }

	  return minutes + ":" + seconds;
}

//Function to dynamically generate quiz questions
function displayCurrentQuestion() {
	$("#next, #main").show();
	$("#start, #image, #clip").hide();

	var question = questions[currentQuestion].question;
    var questionClass = $(document).find("#questions");
    var choiceList = $(document).find("#choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    
    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements 
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

//Function to identify correct or incorrect answer
$("#next").on("click", function () {

	  value = $("input[type='radio']:checked").val();
	  
	   if (value == undefined) {
	   	    $(document).find("#quizMessage").text("Please select an answer");
            $(document).find("#quizMessage").show();
            // $("#next").prop("disabled",true);
            // $("#next").hide();
             // $('#next').attr('disabled', true)
        } else {
        	 $(document).find("#quizMessage").hide();
        	 // $("#next").toggle();
        	   // $('#next').attr('disabled', false);

        }

        if(value==questions[currentQuestion].correctAnswer){
        	correctCounter++;
        } else {
        	incorrectCounter ++;
        }

        remainingQuestions --;
        currentQuestion ++;

        if(currentQuestion<questions.length) {
        	displayCurrentQuestion();
        } else {
        	endGame();
        }

});

//Funciton to end the game 

function endGame() {

	 $("#quizMessage,#questions,#next,#timer,#choiceList").hide();
		
	$("#timeRemaining").text("Time remaining: " + time);
	$("#correctAnswer").text("Correct answers: " + correctCounter);
	$("#incorrectAnswer").text("Incorrect answers: "  + incorrectCounter);
	$("#remaining").text("Remaining Questions: " + remainingQuestions);

	clearInterval(intervalId);
	$("#restart, #results, #clip").show();
}


//Main game functions
//===============================================

$(document).ready(function () {

	$("#quizMessage, #next, #quizMessage, #restart, #clip, #main" ).hide();
});


$("#start").on("click", function () {
	quizTimer();
    displayCurrentQuestion();
 });


$("#restart").on("click", function () {
	 time = 60;
	 correctCounter =0;
	 currentQuestion =  0;
	 incorrectCounter =0;
	 remainingQuestions =6;
	 $("#results,#restart, #quizMessage").hide()
	 $("#quizMessage,#questions,#next,#timer,#choiceList, #clip").show();
	quizTimer();
    displayCurrentQuestion();
 });


    