const STORE = {
 questions: {
  accessibility: [
   {
    question: "What is one thing the lang property used for?",
    code: `&lt;html lang="en"&gt;`,
    answers: [
     "To set what version of HTML the page uses",
     "To determine the linear angle for CSS properties",
     "To restrict the page to only be viewed in certain regions",
     "To be used by search engines to return language specific results"
    ],
    correctAnswer: "To be used by search engines to return language specific results"
   },{
    question: "Why would someone use the role property?",
    code: `&lt;div role="progressbar"&gt;&lt;/div&gt;`,
    answers: [
     "To replace semantic markup",
     "To add a heading or label to a section",
     "To define what parent an element is related to",
     "To add additional info when no native element is appropriate"
    ],
    correctAnswer: "To add additional info when no native element is appropriate"
   },{
    question: "What is accessibility in a website?",
    code: ``,
    answers: [
     "The usage of semantic HTML when structuring a page",
     "Using a lang attribute to define a page's native language",
     "Adding additional attributes for screen readers (alt, role, etc)",
     "All of these answers are accessibility best practices"
    ],
    correctAnswer: "All of these answers are accessibility best practices"
   },{
    question: "What does ARIA stand for?",
    code: ``,
    answers: [
     "Applied Responsive Interactive Attributes",
     "Assumed Rendering of Included Articles",
     "Accrued Resource Immersive Anchors",
     "Accessible Rich Internet Applications"
    ],
    correctAnswer: "Accessible Rich Internet Applications"
   },{
    question: "What is an accessible method for making keyboard navigatable image icons?",
    code: ``,
    answers: [
     "&lt;img src='test.jpg' access='keyboard' ...&gt;",
     "&lt;nav keyboard='tab'&gt;&lt;img ...&gt;&lt;/nav&gt;",
     "&lt;img src='test.jpg' nav='true' ...&gt;",
     "&lt;input type='image' src='test.jpg' ...&gt;"
    ],
    correctAnswer: "&lt;input type='image' src='test.jpg' ...&gt;"
   }
  ],
  arrays: [
   {
    question: "Which method would we use to return the value 4?",
    code: `let arr = [2,4,6,8,10]`,
    answers: [
     "arr[4]",
     "arr[2]",
     "arr[3]",
     "arr[1]"
    ],
    correctAnswer: "arr[1]"
   },{
    question: "How would we add a value to the end of the array?",
    code: `let arr = 
['a','b','c','d','e']`,
    answers: [
     "arr.pop('f')",
     "arr.append('f')",
     "arr.add('f')",
     "arr.push('f')"
    ],
    correctAnswer: "arr.push('f')"
   },{
    question: "What would we use to remove and return the last value of the array?",
    code: `let arr = 
[3,1,4,1,5,9]`,
    answers: [
     "arr.remove(9)",
     "arr.grep('9')",
     "arr.shift()",
     "arr.pop()"
    ],
    correctAnswer: "arr.pop()"
   },{
    question: "How would we find the length of the following array?",
    code: `let arr = 
[23,1,943,81,-52,3.14159]`,
    answers: [
     "arr.depth()",
     "arr.index",
     "arr.shift()",
     "arr.length"
    ],
    correctAnswer: "arr.length"
   },{
    question: "Which index is the value 9 at in the following array?",
    code: `let arr = 
[23,1,943,81,9,3.14159]`,
    answers: [
     "2",
     "3",
     "5",
     "4"
    ],
    correctAnswer: "4"
   }
  ],
  elements: [
   {
    question: "What are the 3 basic required elements for an HTML page?",
    code: ``,
    answers: [
     "&lt;header&gt;, &lt;main&gt;, &lt;footer&gt;",
     "&lt;start&gt;, &lt;middle&gt;, &lt;end&gt;",
     "&lt;html&gt;, &lt;body&gt;, &lt;script&gt;",
     "&lt;html&gt;, &lt;head&gt;, &lt;body&gt;"
    ],
    correctAnswer: "&lt;html&gt;, &lt;head&gt;, &lt;body&gt;"
   },{
    question: "Which HTML element is the largest heading and should generally only be used once?",
    code: ``,
    answers: [
     "&lt;heading&gt;",
     "&lt;title&gt;",
     "&lt;h6&gt;",
     "&lt;h1&gt;"
    ],
    correctAnswer: "&lt;h1&gt;"
   },{
    question: "Which HTML element creates a line break?",
    code: `
&lt;p&gt;The quick brown fox... 
&lt;tag&gt;jumped over the lazy dogs&lt;/p&gt;`,
    answers: [
     "&lt;break&gt;",
     "&lt;hr&gt;",
     "&lt;lb&gt;",
     "&lt;br&gt;"
    ],
    correctAnswer: "&lt;br&gt;"
   },{
    question: "How do we create an HTML link?",
    code: ``,
    answers: [
     "&lt;link href='test.com'&gt;Test.com&lt;/link&gt;",
     "&lt;a src='test.com'&gt;Test.com&lt;/a&gt;",
     "&lt;href url='test.com'&gt;Test.com&lt;/href&gt;",
     "&lt;a href='test.com'&gt;Test.com&lt;/a&gt;"
    ],
    correctAnswer: "&lt;a href='test.com'&gt;Test.com&lt;/a&gt;"
   },{
    question: "Which of these elements are all &lt;table&gt; elements?",
    code: 
`&lt;table&gt;
 ... 
&lt;/table&gt;`,
    answers: [
     "&lt;thead&gt;, &lt;th&gt;, &lt;cell&gt;",
     "&lt;thead&gt;, &lt;tbody&gt;, &lt;row&gt;",
     "&lt;tbody&gt;, &lt;tr&gt;, &lt;cell&gt;",
     "&lt;thead&gt;, &lt;tr&gt;, &lt;td&gt;"
    ],
    correctAnswer: "&lt;thead&gt;, &lt;tr&gt;, &lt;td&gt;"
   }
  ],
  flexbox: [
   {
    question: "What is Flexbox?",
    code: ``,
    answers: [
     "A JavaScript library for responsive design",
     "An HTML markup allowing for flexible content",
     "An development approach to creating semantic HTML",
     "A collection of CSS properties for ease of page layouts"
    ],
    correctAnswer: "A collection of CSS properties for ease of page layouts"
   },{
    question: "To use flexbox we define a container as a flexbox. What is the CSS to do this?",
    code: 
`.flex-container {
 ...
}`,
    answers: [
     "position: flex",
     "display: flexbox",
     "float: flexbox",
     "display: flex"
    ],
    correctAnswer: "display: flex"
   },{
    question: "flex-basis defines what...?",
    code: 
`.flex-item {
 flex-basis: 20px;
}`,
    answers: [
     "The base of the flex element",
     "The margin of the flex element",
     "The boldness of the flex element",
     "The initial size of the flex element"
    ],
    correctAnswer: "The initial size of the flex element"
   },{
    question: "Which values are we able to use for flex-direction?",
    code: 
`.flex-container {
 flex-direction: ...
}`,
    answers: [
     "flex-start, flex-end, space-between, space-around",
     "start, center, end, space-evenly",
     "horizontal, vertical, reverse-horizontal, reverse-vertical",
     "row, row-reverse, column, column-reverse"
    ],
    correctAnswer: "row, row-reverse, column, column-reverse"
   },{
    question: "What does the css property order for flex items allow you to do?",
    code: 
`.flex-item {
 order: ...
}`,
    answers: [
     "Specify the direction that flex items appear",
     "Define when each flex item is loaded",
     "Sort flex items by different values (alphabetical, numerical)",
     "Specify which order the flex items appear"
    ],
    correctAnswer: "Specify which order the flex items appear"
   }
  ],
  forms: [
   {
    question: "What are considered the two most important attributes for a form?",
    code: `
&lt;form ...&gt;
&lt;/form&gt;`,
    answers: [
     "lang, process",
     "before, after",
     "id, class",
     "method, action"
    ],
    correctAnswer: "method, action"
   },{
    question: "What are the some of the most popular &lt;input&gt; types?",
    code: `&lt;input type='...'&gt;`,
    answers: [
     "css, target, label",
     "auto, keyboard, mouse",
     "text, include, exclude",
     "text, checkbox, button"
    ],
    correctAnswer: "text, checkbox, button"
   },{
    question: "Which attribute of an input does the label for attribute relate to?",
    code: 
`&lt;label for=...&gt;&lt;/label&gt;
&lt;input ...&gt;`,
    answers: [
     "role",
     "value",
     "type",
     "id"
    ],
    correctAnswer: "id"
   },{
    question: "Which attribute of an input type of radio links them together to ensure only one is selected?",
    code: `&lt;input type='radio' ...&gt;`,
    answers: [
     "role",
     "value",
     "id",
     "name"
    ],
    correctAnswer: "name"
   },{
    question: "What is the difference between the GET and POST methods?",
    code: `
&lt;form method='get'&gt;
&lt;form method='post'&gt;`,
    answers: [
     "The GET method simply retrieves data while POST can send and receive",
     "The POST method simply submits data while GET can send and receive",
     "The POST method is used for different database types",
     "The GET method sends all information in the URL"
    ],
    correctAnswer: "The GET method sends all information in the URL"
   }
  ],
  loops: [
   {
    question: "What are the two types of JavaScript loops?",
    code: ``,
    answers: [
     "loop, cycle",
     "inclusive, exclusive",
     "anonymous, declared",
     "for, while"
    ],
    correctAnswer: "for, while"
   },{
    question: "What order do the 3 conditions of a for loop consist of?",
    code: `for(...;...;...){`,
    answers: [
     "variables; start condition; final expression",
     "variables; counter; function",
     "iteration; initialization; condition",
     "initialization; condition; final expression"
    ],
    correctAnswer: "initialization; condition; final expression"
   },{
    question: "What conditional would we use to run this loop 5 times?",
    code: `for(let i=0;...; i++){`,
    answers: [
     "i===5",
     "5",
     "i&lt;=5",
     "i&lt;5"
    ],
    correctAnswer: "i&lt;5"
   },{
    question: "What happens when a while loop's condition is always true?",
    code: `while(5===5){ ... }`,
    answers: [
     "The execution code will never run",
     "The execution code will run once",
     "A syntax error will halt the page at run time",
     "The execution code will run indefinitely"
    ],
    correctAnswer: "The execution code will run indefinitely"
   },{
    question: "What will the variable count be equal to at the end of this loop?",
    code: `
let count = 0;
for(let i=0; i&lt;3; i++){
 count+=1;
}
return count;`,
    answers: [
     "1",
     "2",
     "0",
     "3"
    ],
    correctAnswer: "3"
   }
  ],
  methods: [
   {
    question: "How do we convert this string of words into an array of the whole words?",
    code: `let str = 
"The quick brown fox 
jumped over the lazy dogs"`,
    answers: [
     "str.split()",
     "str.words('')",
     "str.convert('')",
     "str.split(' ')"
    ],
    correctAnswer: "str.split(' ')"
   },{
    question: "How would we replace the second word in this string with the word 'will'?",
    code: `let str = "I cannot code well"`,
    answers: [
     "str.replace('will', 'cannot')",
     "str.convert('cannot', 'will')",
     "str.mask('will', 'cannot')",
     "str.replace('cannot', 'will')"
    ],
    correctAnswer: "str.replace('cannot', 'will')"
   },{
    question: "How do you call this object's method?",
    code: `
let obj = {
 car: 'Car',
 sayCar: function(){
  console.log(this.car);
 }
}`,
    answers: [
     "function sayCar(obj)",
     "obj.function(sayCar)",
     "sayCar()",
     "obj.sayCar()"
    ],
    correctAnswer: "obj.sayCar()"
   },{
    question: "What is a JavaScript method?",
    code: ``,
    answers: [
     "A style of writing out code in a readable way",
     "The HTML tag that allows you to write JavaScript inline",
     "A type of variable that allows it to be mutable",
     "A property of an object that executes a function"
    ],
    correctAnswer: "A property of an object that executes a function"
   },{
    question: "Why shouldn't we use ES6 arrow functions in object method declarations?",
    code: `
let obj = {
 car: "Audi",
 callCar: () =&gt; {
  return this.car 
 }
}`,
    answers: [
     "Arrow functions provide extra properties that are irrelevant to the object",
     "Arrow functions require parameters",
     "Arrow functions are always anonymous",
     "Arrow functions have a different scope of this than the object"
    ],
    correctAnswer: "Arrow functions have a different scope of this than the object"
   }
  ],
  CSS: [
   {
    question: "What does CSS stand for?",
    code: ``,
    answers: [
     "Creative Standard Solution",
     "Color, Style, Scale",
     "Compressed Specific Structure",
     "Cascading Style Sheets"
    ],
    correctAnswer: "Cascading Style Sheets"
   },{
    question: "How would you set a background color to red?",
    code: ``,
    answers: [
     "backgroundcolor: red",
     "color: red",
     "bg-color: red",
     "background-color: red"
    ],
    correctAnswer: "background-color: red"
   },{
    question: "What does box-sizing: border box do?",
    code: `box-sizing: border-box;`,
    answers: [
     "Adds a border to the element",
     "Forces the element to maintain rectangular shape",
     "Eliminates any properties of an existing border",
     "Forces the margin, padding, and border dimensions to be inclusive of its width"
    ],
    correctAnswer: "Forces the margin, padding, and border dimensions to be inclusive of its width"
   },{
    question: "What is the difference between position: inline and position: inline-block?",
    code: `
position: inline;
position: inline-block;`,
    answers: [
     "inline is only used to define exclusive padding and margin",
     "inline-block is only used to define additional margins",
     "inline is used to avoid wrapping elements to different rows on large screens",
     "inline-block allows a user to define a width and height"
    ],
    correctAnswer: "inline-block allows a user to define a width and height"
   },{
    question: "What color would the the &lt;p id='foo' class='para'&gt; paragraph be?",
    code: 
`* { color: cyan; }
#foo { color: yellow; }
.para { color: red; }
p.para { color: blue; }`,
    answers: [
     "cyan",
     "red",
     "blue",
     "yellow"
    ],
    correctAnswer: "yellow"
   }
  ],
  conditionals: [
   {
    question: "What are two types of conditional statements in JavaScript?",
    code: ``,
    answers: [
     "if, when",
     "choice, determined",
     "switch, then",
     "if, switch"
    ],
    correctAnswer: "if, switch"
   },{
    question: "What will this conditional statement evaluate to?",
    code: 
`if(5&lt;=2){ return true; } 
else { return false; }`,
    answers: [
     "5 &gt; 2",
     "true",
     "5 &lt;= 2",
     "false"
    ],
    correctAnswer: "false"
   },{
    question: "When would you use a switch statement?",
    code: ``,
    answers: [
     "When you want to produce a random outcome",
     "If there is a variable involved that may change",
     "When you need to switch a boolean to true or false",
     "When you need many differing actions for many specific evaluations"
    ],
    correctAnswer: "When you need many differing actions for many specific evaluations"
   },{
    question: "What will this conditional statement evaluate to?",
    code: 
`let foo = 1;
if(foo){ return true; }
else { return false; }`,
    answers: [
     "1",
     "false",
     "foo",
     "true"
    ],
    correctAnswer: "true"
   },{
    question: "What will this conditional statement evaluate to?",
    code:
`let foo = 0;
if(foo && foo &lt; 5){
 return 1; }
else if(foo &lt; 5){ 
 return 2; }
else { 
 return 3; }`,
    answers: [
     "1",
     "3",
     "false",
     "2"
    ],
    correctAnswer: "2"
   }
  ],
  objects: [
   {
    question: "How do we console.log the value of the make of this car?",
    code: 
`let car = {
 year: 2018,
 make: "Audi",
 model: "S4"
}`,
    answers: [
     "console.log(obj.car(make))",
     "console.log(car(make))",
     "console.log(make)",
     "console.log(car.make)"
    ],
    correctAnswer: "console.log(car.make)"
   },{
    question: "How do we push all of an object's keys into a new array called carProps?",
    code: 
`let car = {
 year: 2018,
 make: "Audi",
 model: "S4"
}`,
    answers: [
     "let carProps = car.keys(all)",
     "let carProps = [Object(car).keys()]",
     "let carProps = car.Object.keys()",
     "let carProps = Object.keys(car)"
    ],
    correctAnswer: "let carProps = Object.keys(car)"
   },{
    question: "What do you call a property of an object that is a function?",
    code:
`let car = {
 year: 2018,
 make: "Audi",
 model: "S4",
 displayName: function(){
  return this.year +
      + " "
      + this.make 
      + " "
      + this.model
 }
}`,
    answers: [
     "Object function",
     "Return function",
     "Function property",
     "Object method"
    ],
    correctAnswer: "Object method"
   },{
    question: "What makes an object different than an array?",
    code: ``,
    answers: [
     "Objects can contain any data structure, while arrays cannot",
     "Arrays are only useful as a storage medium, while objects can contain functions",
     "Arrays are limited to a single dimension, while objects can be nested",
     "Objects associate keys and values, while arrays are simply a list of data"
    ],
    correctAnswer: "Objects associate keys and values, while arrays are simply a list of data"
   },{
    question: "What would the following code console.log?",
    code:
`let obj = {
 total: 5,
 multiplier: 4,
 multiply: function(){
  return 
   this.total *
   this.multiplier;
 }
}
console.log(obj.multiply()*2);`,
    answers: [
     "10",
     "8",
     "80",
     "40"
    ],
    correctAnswer: "40"
   }
  ]
 }
};


// Make the quiz. Create a model for our app's state
function makeQuiz(){
	// Creating an object to store the app's state when beginning the quiz
	return {
		// Gathering a random question out of the available questions for each category
		questions: helpers.getRandomQuestions(STORE),
		// Boolean for if the quiz is in progress or not
		midQuiz: false,
		// Array of correct/incorrect answers to use for our progress bar
		progress: {
			progressBar: [],
			incorrectCategories: []
		},
		// Boolean to determine if the end state should display
		completed: false,
		// Monitoring which question we are currently on
		currentQuestion: 0,
		// Keeps track of total correct answers
		correctAnswers: 0,
		// Keeps current selected answer
		currentAnswer: "",
		// Keeps track of % completed
		percCorrect: 0
	}
}

// Apply fadeOut animations and set the stage for DOM text/element changes
function $fade(appState){

	// This is the completed state of of a quiz
	if(appState.completed){
		
		// Fade out elements with a promise to avoid choppy behavior
		$.when($('.question-answer-wrapper, .question-wrapper, .answer-wrapper').fadeOut(500))
			.done(function(){

				// Display results of the quiz
				$showResults(appState);
				$('.results-wrapper').hide().removeClass('hide');
				$('.question-answer-wrapper, .results-wrapper').fadeIn(500);
	    });

	// This is if the app is just starting
	} else if(appState.midQuiz === false){

		// Set a flag that the app has begun
		appState.midQuiz = true;
		// Fade out elements with a promise to avoid choppy behavior
		$.when($('.question-answer-wrapper, .question-wrapper, .code, .answer-wrapper, .start-quiz, .quit-quiz, .results-wrapper, .progress, .progress-bar').fadeOut(500))
			.done(function(){
				// Remove any progress from a previous quiz (if any);
				helpers.updateProgressBar(appState);
				$('.progress-count').html('1 / 10');
				$('.progress-perc').html('');
				// Kill previous results
				$('.failures').remove();
				// Lots to do... mostly just setting up a new environment for a new quiz
				$updateQuestion(appState);
				$('progress-bar').empty();
				$('progress-fill').html('Progress: <span class="progress-count">1 / 10</span><span class="progress-perc"></span>');
				$('.question-answer-wrapper, .answer-wrapper').removeClass('begin');
				$('.submit-btn, .progress, .progress-bar').removeClass('hide');
				$('.progress, .progress-bar').hide();
				$('.question-answer-wrapper, .question-wrapper, .answer-wrapper, .progress, .progress-bar').fadeIn(500);
				if(!$('.code').hasClass('hide')){$('.code').fadeIn(500)};
	    });

	// This is if the app is in the middle of execution
	} else if(appState.midQuiz){
		$.when($('.question-answer-wrapper, .question-wrapper, .answer-wrapper').fadeOut(500))
			.done(function(){
				$updateQuestion(appState);
				$('.question-answer-wrapper, .question-wrapper, .answer-wrapper').fadeIn(500);
	    });
	}
}

// Work in progress...
function $showResults(appState){
	if(appState.correctAnswers === 10){
		let endMsg = `You got ${appState.percCorrect}% correct!
I have nothing else to teach you. Move on and prosper!
`;
	} else {
		$('.answer-btn').remove();
		let endMsg = `You got ${appState.percCorrect}% correct!`
		let endFeedback = ``;
		if(appState.progress.incorrectCategories.length === 0){
			endFeedback = `You aced it! Good job!`;
		} else {
			endFeedback = `You may want to study up on the following categories:`;
		}
		
		$('.quiz-end-score').html(endMsg);
		let $failList = $('<ul class="failures"></ul>');
		appState.progress.incorrectCategories.map((cat => {
			$failList.append("<li class='category'>" + cat + "</li>");
		}));
		$('.quiz-end-feedback-p').html(endFeedback);
		$('.quiz-end-categories').append($failList);
		$('.results-wrapper').removeClass('hide').css('display', 'flex');
		$('.question-answer-wrapper, .results-wrapper, .quiz-end-feedback, .quiz-end-score, .retry-btn').css('display', 'flex').fadeIn(500);		
	}

}

// Update the question, code, answers, buttons in the DOM while we're in a faded out state
function $updateQuestion(appState){
	$('.answer-btn').remove();

	// Update the question and code text with the current question
	$('.question').html(appState.questions[appState.currentQuestion].question);

	// This is a hack to hide/show the code portion
	// Only 1/3 of the questions contain code so we hide it if they aren't present
	if(appState.questions[appState.currentQuestion].code == ``){
		$('.code').addClass('hide');
	} else {
		$('.code').removeClass('hide');
		$('.code').html(`<pre>${appState.questions[appState.currentQuestion].code}</pre>`);
	}
	
	// Change continue back to submit
	$('.continue-btn')
		.val("Submit")
		.removeClass('continue-btn')
		.addClass('submit-btn')
		.prop('disabled', true);

	// Add in available answers for the question
	let $answers = [];

	// Adding the answers to a temporary array
	for(let i=0; i<appState.questions[appState.currentQuestion].answers.length; i++){

		// Add current question answers to an array
		let $answer = $('<button class="answer-btn" type="button"></button>');
		$answer.html(appState.questions[appState.currentQuestion].answers[i]);
		$answers.push($answer);
	}

	// Shuffle the answers
	helpers.shuffleAnswers($answers)

	// Push answers to the DOM
	$answers.forEach((answer) => {
		$('.answer-wrapper').prepend(answer);
	});
}

// Simple class and enable/disable DOM selection when answer is selected
function selectAnswer(answer){
	$('.answer-btn').removeClass('selected');
	answer.addClass('selected');
	$('.submit-btn').prop('disabled', false);
}

// Answer is selected and submitted
// Push a feedback state
function submitAnswer(appState){

	// This will be returned true or false based on their answer
	let correct;

	// Add styles to the answers to show if their answer was correct or not
	$('.answer-btn').each(function () {
		if($(this).html() === appState.questions[appState.currentQuestion].correctAnswer){
			$(this).addClass('pass');
			// If answer is correct and selected...
			if($(this).hasClass('selected')){
				correct = "pass";
				appState.correctAnswers++;
				appState.questions[appState.currentQuestion];
			}

		// Handle correct answer if selected answer is incorrect
		} else if ($(this).hasClass('selected')){
			$(this).addClass('fail dim-answer');
			correct = "fail";
			appState.progress.incorrectCategories.push(appState.questions[appState.currentQuestion].category);

		// Dim the other answers to make the correct one more prevalent
		} else {
			$(this).addClass('dim-answer');
		}
	});

	// Add a progress bar indicator to our appState object
	appState.progress.progressBar.push(`<div class="progress-indicator ${correct}"></div>`);
	
	// Update our percent correct (parse a float and set it to a fixed percentage)
	appState.percCorrect = parseFloat(appState.correctAnswers / (appState.currentQuestion + 1) * 100).toFixed();

	// Update our current question VS total quiz length
	$('.progress-count').html(`
		${appState.currentQuestion + 1} / ${appState.questions.length}
	`);

	// Update our current correct percentage
	$('.progress-perc').html(`
		 // ${(appState.percCorrect)}% Correct
	`)

	// Change submit back to continue
	$('.submit-btn')
		.val("Continue")
		.removeClass('submit-btn')
		.addClass('continue-btn')

	// Disable selecting answers
	$('.answer-btn').prop("disabled", true);

	// Update our progress-bar DOM
	helpers.updateProgressBar(appState);

	// Continue to next question
	appState.currentQuestion++;

	// Verify if we're done or not
	if(appState.currentQuestion === appState.questions.length){
		appState.completed = true;
	}
	
}

// Silly easter egg for saying you don't want to do the quiz
function killQuiz(){
	$('.start-quiz, .quit-quiz').hide();
	let failureMsg = "You didn't grow. You didn't improve. You took a shortcut and gained nothing. You experienced a hollow victory. Nothing was risked and nothing was gained. It's sad you don't know the difference..."
	let msgSplit = failureMsg.split(" ");
	let counter = 0;
	$('.question').empty();
	let startTroll = setInterval(function () {
		$('.question').append(msgSplit[counter] + " ");
		counter++;
		if(counter > msgSplit.length - 1){
  			clearInterval(startTroll);
  			$('.start-quiz').text('You can do it! Start Quiz').fadeIn(500);
		}
	}, 250);
}

// These are simple algorithms to modify data that don't need an individual function
let helpers = {
	// Pick a random question from the available ones
	pickRandomQ: function(obj,section){
		return Math.floor(Math.random() * obj.questions[section].length);		
	},
	// Gather a random question from every category
	getRandomQuestions: function(obj){
		let questions = [];
		let categories = Object.keys(obj.questions);
		categories.forEach((cat) => {
			let randomQ = this.pickRandomQ(obj,cat);
			let question = obj.questions[cat][randomQ];
			question.category = cat;
			questions.push(question);
		});
		return questions;
	},
	// Shuffle the answers so they don't appear in the same order
	shuffleAnswers: function(arr){
	    for (var i = arr.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = arr[i];
	        arr[i] = arr[j];
	        arr[j] = temp;
	    }
	},
	// Update progress bar DOM element
	updateProgressBar: function(appState){
		$('.progress-bar').empty();
		appState.progress.progressBar.forEach((progInd => {
			$('.progress-bar').append(progInd);
		}))
	}
}

// Lets start the show
$(function(){

	// Kill any form refresh
	$('.answer-wrapper').on('submit', function(e){
		e.preventDefault();
	});

	// Storage for quiz app state
	let quizData;

	// Start quiz
	$('.start-quiz, .retry-btn').on('click', function(){
		quizData = makeQuiz();
		$fade(quizData);
	});

	// Select an answer
	$('.question-answer-wrapper').on('click', '.answer-btn', function(){
		selectAnswer($(this));
	})

	// Submit your answer to display feedback and advance question counter
	$('.question-answer-wrapper').on('click', '.submit-btn', function(e){
		submitAnswer(quizData);
	});

	// Submit your answer to display feedback and advance question counter
	$('.question-answer-wrapper').on('click', '.continue-btn', function(){
		$fade(quizData);
	});

	// Easter egg to chastize the user
	$('.quit-quiz').on('click', function(){
		killQuiz();
	})
})
