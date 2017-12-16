//Declare global variables
//=============================
var time = 30;
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

// window.onload = function() {
//   $("#start").on("click", quizTimer);
//   // $("#stop").on("click", stopwatch.stop);
//   // $("#reset").on("click", stopwatch.reset);
//   // $("#start").on("click", stopwatch.start);
// };


//Functions:
//===============================================

//Timer functions

function quizTimer(){

	$("#timer").text("00:30");
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


function displayCurrentQuestion() {
	$("#next").show();
	$("#start").hide();

	var question = questions[currentQuestion].question;
    var questionClass = $(document).find("#questions");
    var choiceList = $(document).find("#choiceList");
    console.log(choiceList);
    var numChoices = questions[currentQuestion].choices.length;
    
    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        console.log(choice);
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}


$("#next").on("click", function () {

	  value = $("input[type='radio']:checked").val();
	  
	   if (value == undefined) {
	   	    $(document).find("#quizMessage").text("Please select an answer");
            $(document).find("#quizMessage").show();
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

$("#restart").on("click", function () {
	 time = 30;
	 correctCounter =0;
	 currentQuestion =  0;
	 incorrectCounter =0;
	 remainingQuestions =6;
	 $("#results,#restart").hide()
	 $("#quizMessage,#questions,#next,#timer,#choiceList, #clip").show();
	quizTimer();
    displayCurrentQuestion();
 });


function endGame() {

	 $("#quizMessage,#questions,#next,#timer,#choiceList").hide();
	
	$("#results").append("Game over. Time remaining:" + time + " Correct answers:" + correctCounter + " Incorrect anwers:" + incorrectCounter + " Remaining Questions: " + remainingQuestions);
	clearInterval(intervalId);
	$("#restart, #results, #clip").show();
}

$(document).ready(function () {

	$("#quizMessage, #next, #quizMessage, #restart, #clip" ).hide();
	// $(document).find("#next").hide();
	// $(document).find("#quizMessage").hide();
	// $(document).find("#restart").hide();

});

$("#start").on("click", function () {
	quizTimer();
    displayCurrentQuestion();
 });



    // $(this).find(".quizMessage").hide();
