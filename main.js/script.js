// Set up the game
const questions = [
    { question: '3 + 4', answer: '7' },
    { question: '5 + 2', answer: '7' },
    { question: '8 + 9', answer: '17' },
    { question: '6 + 1', answer: '7' },
    { question: '2 + 2', answer: '4' }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Display the current question
  function displayQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = questions[currentQuestionIndex].question;
  }
  
  // Check the user's answer
  function checkAnswer() {
    const answerElement = document.getElementById('answer');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
  
    const userAnswer = answerElement.value.trim();
  
    if (userAnswer === questions[currentQuestionIndex].answer) {
      feedbackElement.textContent = 'Correct!';
      score++;
    } else {
      feedbackElement.textContent = 'Incorrect. Try again!';
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
  
  // End the game and activate the beam
  function endGame() {
    const storyTextElement = document.getElementById('story-text');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const gameElement = document.getElementById('game');
    const storyElement = document.getElementById('story');
    const ufoElement = document.getElementById('ufo');
    const cowElement = document.getElementById('cow');
  
    // Show end game message and hide feedback and score
    storyTextElement.textContent = 'Great job! You helped the aliens save their cow friend.';
    feedbackElement.style.display = 'none';
    scoreElement.style.display = 'none';
  
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
  