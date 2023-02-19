// Set up the game
const questions = [
    { question: '5 + 7', answer: '12' },
    { question: '12 - 5', answer: '7' },
    { question: '3 * 4', answer: '12' },
    { question: '10 / 2', answer: '5' },
    { question: '16 / 4', answer: '4' },
    { question: '9 - 3', answer: '6' },
    { question: '7 * 8', answer: '56' },
    { question: '20 / 4', answer: '5' },
    { question: '2 + 2 * 2', answer: '6' },
    { question: '10 - 4 * 2', answer: '2' },
    { question: '4 * 4 * 4', answer: '64' },
    { question: '16 / 2 / 2', answer: '4' },
    { question: '1/2 + 1/4', answer: '3/4' },
    { question: '1/3 + 1/6', answer: '1/2' },
    { question: '2/3 - 1/6', answer: '1/2' },
    { question: '3/4 + 1/4', answer: '1' },
    { question: '3/5 * 2', answer: '6/5' },
    { question: '5/8 * 3/4', answer: '15/32' },
    { question: '0.5 + 0.25', answer: '0.75' },
    { question: '0.75 - 0.25', answer: '0.5' },
    { question: '0.1 + 0.2', answer: '0.3' },
    { question: '0.4 * 0.2', answer: '0.08' },
    { question: '5 squared', answer: '25' },
    { question: '10 cubed', answer: '1000' },
    { question: 'Area of a rectangle with length 5 and width 3', answer: '15' },
    { question: 'Perimeter of a square with side length 4', answer: '16' },
    { question: 'Rounding 3.567 to the nearest tenth', answer: '3.6' },
    { question: 'Rounding 8.276 to the nearest hundredth', answer: '8.28' }
  
  
  ];
  

let currentQuestionIndex = 0;
let score = 0;

// Display the current question
function displayQuestion() {
  const questionElement = document.getElementById('question');
  const choicesElement = document.getElementById('choices');
  const nextButton = document.getElementById('next-button');
  const tryAgainButton = document.getElementById('try-again-button');

  // Enable the Next Question button if the user has tried three times or less
  if (numTries < 3) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
    
  }

  // Display the current question and choices
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = '';
  currentQuestion.choices.forEach(choice => {
    const choiceElement = document.createElement('button');
    choiceElement.textContent = choice;
    choiceElement.onclick = checkAnswer;
    choicesElement.appendChild(choiceElement);
  });
}


let numTries = 0; // variable to keep track of number of tries

function checkAnswer() {
  const answerElement = document.getElementById('answer');
  const feedbackElement = document.getElementById('feedback');
  const scoreElement = document.getElementById('score');
  const successAudio = new Audio('audio/success.mp3');
  const tryagainAudio = new Audio('audio/try-again3.mp3');
  const failAudio = new Audio('audio/fail.mp3');

  const userAnswer = answerElement.value.trim();

  if (userAnswer === questions[currentQuestionIndex].answer) {
    feedbackElement.textContent = 'Correct!';
    feedbackElement.classList.add('success');
    successAudio.play();
    score++;
    numTries = 0; // reset number of tries if answer is correct
  } else {
    numTries++;
    if (numTries >= 3) {
      feedbackElement.textContent = 'Incorrect. You have reached the maximum number of tries for this question.';
      feedbackElement.classList.remove('success');
      failAudio.play();
      numTries = 0; // reset number of tries
    } else {
      feedbackElement.textContent = 'Incorrect. Try again!';
      feedbackElement.classList.remove('success');
      tryagainAudio.play();
      return; // exit the function early and don't update the currentQuestionIndex
    }
  }

  // Show feedback and update score
  answerElement.value = '';
  feedbackElement.style.display = 'block';
  scoreElement.textContent = score;

  // Go to the next question or end the game
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endGame();
  } else {
    displayQuestion();
  }
}


  // Go to the next question or end the game
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endGame();
  } else {
    displayQuestion();
  }


function endGame() {
  const storyTextElement = document.getElementById('story-text');
  const feedbackElement = document.getElementById('feedback');
  const scoreElement = document.getElementById('score');
  const gameElement = document.getElementById('game');
  const storyElement = document.getElementById('story');
  const ufoElement = document.getElementById('ufo');
  const cowElement = document.getElementById('cow');

  const accuracy = Math.round((score / questions.length) * 100);

  // Check if the user has passed or failed the game
  if (accuracy >= 70) {
    storyTextElement.textContent = `Great job! You answered ${score} out of ${questions.length} questions correctly (${accuracy}%). You helped the aliens save their cow friend.`;
    storyTextElement.classList.add('success');
  } else {
    storyTextElement.textContent = `Oh no! You answered only ${score} out of ${questions.length} questions correctly (${accuracy}%). The aliens were unable to save their cow friend.`;
    storyTextElement.classList.add('fail');
  }

  feedbackElement.style.display = 'none';
  scoreElement.style.display = 'none';

  // Animate victory or defeat sign
  const resultElement = document.createElement('div');
  resultElement.classList.add('result');
  if (accuracy >= 70) {
    resultElement.textContent = 'Victory!';
    resultElement.classList.add('success');
  } else {
    resultElement.textContent = 'Defeat!';
    resultElement.classList.add('fail');
  }
  storyElement.appendChild(resultElement);

  // Activate the beam
  gameElement.style.display = 'none';
  storyElement.style.display = 'flex';
  ufoElement.classList.add('beam');
  cowElement.classList.add('beam');

  // Wait 3 seconds and reload the page to play again
  setTimeout(() => location.reload(), 3000);
}

// Display the first question
displayQuestion();
