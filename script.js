// Quiz Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startBtn = document.getElementById('start-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const reviewBtn = document.getElementById('review-btn');
    const shareBtn = document.getElementById('share-btn');
    
    // Quiz State Elements
    const questionText = document.getElementById('question-text');
    const questionNumber = document.getElementById('question-number');
    const currentQuestionDisplay = document.getElementById('current-question');
    const totalQuestionsDisplay = document.getElementById('total-questions');
    const currentScoreDisplay = document.getElementById('current-score');
    const optionsContainer = document.getElementById('options-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const correctFeedback = document.getElementById('correct-feedback');
    const incorrectFeedback = document.getElementById('incorrect-feedback');
    const correctAnswerText = document.getElementById('correct-answer-text');
    const questionCategory = document.getElementById('question-category');
    const progressFill = document.getElementById('progress-fill');
    const timerDisplay = document.getElementById('timer');
    const timerProgress = document.querySelector('.timer-progress');
    
    // Results Elements
    const scorePercentage = document.getElementById('score-percentage');
    const correctAnswersDisplay = document.getElementById('correct-answers');
    const totalAnswersDisplay = document.getElementById('total-answers');
    const timeTakenDisplay = document.getElementById('time-taken');
    const performanceMessage = document.getElementById('performance-message');
    
    // Quiz Questions Data
    const quizQuestions = [
        {
            id: 1,
            question: "What is the chemical symbol for gold?",
            category: "science",
            options: [
                { text: "Au", correct: true },
                { text: "Ag", correct: false },
                { text: "Fe", correct: false },
                { text: "Pb", correct: false }
            ]
        },
        {
            id: 2,
            question: "Which planet is known as the Red Planet?",
            category: "science",
            options: [
                { text: "Venus", correct: false },
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: false }
            ]
        },
        {
            id: 3,
            question: "Who was the first President of the United States?",
            category: "history",
            options: [
                { text: "Thomas Jefferson", correct: false },
                { text: "Abraham Lincoln", correct: false },
                { text: "George Washington", correct: true },
                { text: "John Adams", correct: false }
            ]
        },
        {
            id: 4,
            question: "In which year did World War II end?",
            category: "history",
            options: [
                { text: "1943", correct: false },
                { text: "1944", correct: false },
                { text: "1945", correct: true },
                { text: "1946", correct: false }
            ]
        },
        {
            id: 5,
            question: "What does CPU stand for?",
            category: "technology",
            options: [
                { text: "Central Processing Unit", correct: true },
                { text: "Computer Personal Unit", correct: false },
                { text: "Central Process Unit", correct: false },
                { text: "Computer Processing Unit", correct: false }
            ]
        },
        {
            id: 6,
            question: "Which programming language is known for web development?",
            category: "technology",
            options: [
                { text: "Java", correct: false },
                { text: "Python", correct: false },
                { text: "JavaScript", correct: true },
                { text: "C++", correct: false }
            ]
        },
        {
            id: 7,
            question: "What is the capital of Australia?",
            category: "geography",
            options: [
                { text: "Sydney", correct: false },
                { text: "Melbourne", correct: false },
                { text: "Canberra", correct: true },
                { text: "Perth", correct: false }
            ]
        },
        {
            id: 8,
            question: "Which ocean is the largest?",
            category: "geography",
            options: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Arctic Ocean", correct: false },
                { text: "Pacific Ocean", correct: true }
            ]
        },
        {
            id: 9,
            question: "What is the speed of light in vacuum?",
            category: "science",
            options: [
                { text: "300,000 km/s", correct: true },
                { text: "150,000 km/s", correct: false },
                { text: "450,000 km/s", correct: false },
                { text: "600,000 km/s", correct: false }
            ]
        },
        {
            id: 10,
            question: "Who invented the World Wide Web?",
            category: "technology",
            options: [
                { text: "Bill Gates", correct: false },
                { text: "Steve Jobs", correct: false },
                { text: "Tim Berners-Lee", correct: true },
                { text: "Mark Zuckerberg", correct: false }
            ]
        }
    ];
    
    // Category Icons and Names
    const categoryInfo = {
        science: { name: "Science", icon: "flask", color: "#e74c3c" },
        history: { name: "History", icon: "landmark", color: "#f39c12" },
        technology: { name: "Technology", icon: "laptop-code", color: "#3498db" },
        geography: { name: "Geography", icon: "globe-americas", color: "#27ae60" }
    };
    
    // Quiz State Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswers = new Array(quizQuestions.length).fill(null);
    let timer;
    let timeRemaining = 15;
    let totalTimeTaken = 0;
    let timerInterval;
    let selectedCategories = ['science', 'history', 'technology', 'geography'];
    let filteredQuestions = [...quizQuestions];
    
    // Initialize the application
    function init() {
        totalQuestionsDisplay.textContent = quizQuestions.length;
        updateCategorySelection();
        attachEventListeners();
        updateFilteredQuestions();
    }
    
    // Update filtered questions based on selected categories
    function updateFilteredQuestions() {
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
        selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
        
        if (selectedCategories.length === 0) {
            selectedCategories = ['science', 'history', 'technology', 'geography'];
            document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = true);
        }
        
        filteredQuestions = quizQuestions.filter(q => selectedCategories.includes(q.category));
        totalQuestionsDisplay.textContent = filteredQuestions.length;
    }
    
    // Update category selection UI
    function updateCategorySelection() {
        const categoryOptions = document.querySelectorAll('.category-option');
        categoryOptions.forEach(option => {
            const value = option.querySelector('input').value;
            const icon = option.querySelector('i');
            const info = categoryInfo[value];
            
            if (info) {
                option.querySelector('span i').className = `fas fa-${info.icon}`;
                option.style.borderColor = selectedCategories.includes(value) ? info.color : '#e0e0e0';
            }
        });
    }
    
    // Attach event listeners
    function attachEventListeners() {
        startBtn.addEventListener('click', startQuiz);
        prevBtn.addEventListener('click', showPreviousQuestion);
        nextBtn.addEventListener('click', showNextQuestion);
        submitBtn.addEventListener('click', submitQuiz);
        restartBtn.addEventListener('click', restartQuiz);
        reviewBtn.addEventListener('click', reviewAnswers);
        shareBtn.addEventListener('click', shareResults);
        
        // Category selection
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateFilteredQuestions();
                updateCategorySelection();
            });
        });
    }
    
    // Start the quiz
    function startQuiz() {
        welcomeScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswers.fill(null);
        totalTimeTaken = 0;
        currentScoreDisplay.textContent = '0';
        
        if (filteredQuestions.length === 0) {
            alert('Please select at least one category!');
            welcomeScreen.style.display = 'block';
            quizScreen.style.display = 'none';
            return;
        }
        
        loadQuestion(currentQuestionIndex);
        startTimer();
    }
    
    // Load a specific question
    function loadQuestion(index) {
        if (index < 0 || index >= filteredQuestions.length) return;
        
        currentQuestionIndex = index;
        const question = filteredQuestions[index];
        
        // Update question display
        questionText.textContent = question.question;
        questionNumber.textContent = index + 1;
        currentQuestionDisplay.textContent = index + 1;
        
        // Update category display
        const category = categoryInfo[question.category];
        questionCategory.innerHTML = `<i class="fas fa-${category.icon}"></i> <span>${category.name}</span>`;
        questionCategory.style.color = category.color;
        questionCategory.style.background = `${category.color}15`;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        feedbackContainer.style.display = 'none';
        
        // Create option elements
        const letters = ['A', 'B', 'C', 'D'];
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            if (selectedAnswers[index] === optionIndex) {
                optionElement.classList.add('selected');
            }
            
            optionElement.innerHTML = `
                <div class="option-letter">${letters[optionIndex]}</div>
                <div class="option-text">${option.text}</div>
            `;
            
            optionElement.addEventListener('click', () => selectAnswer(optionIndex));
            optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === filteredQuestions.length - 1 ? 'Review' : `Next <i class="fas fa-arrow-right"></i>`;
        submitBtn.style.display = index === filteredQuestions.length - 1 ? 'inline-flex' : 'none';
        
        // Update progress bar
        const progressPercentage = ((index + 1) / filteredQuestions.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Reset timer
        resetTimer();
        
        // Show feedback if answer was already selected
        if (selectedAnswers[index] !== null) {
            showAnswerFeedback(index);
        }
    }
    
    // Select an answer
    function selectAnswer(optionIndex) {
        // Clear any existing selected option
        const options = document.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        
        // Mark selected option
        options[optionIndex].classList.add('selected');
        selectedAnswers[currentQuestionIndex] = optionIndex;
        
        // Stop timer and calculate time bonus
        clearInterval(timerInterval);
        const timeBonus = Math.floor(timeRemaining * 0.5); // Bonus points for faster answers
        
        // Check if answer is correct
        const question = filteredQuestions[currentQuestionIndex];
        const isCorrect = question.options[optionIndex].correct;
        
        if (isCorrect) {
            score += 10 + timeBonus; // Base points + time bonus
            currentScoreDisplay.textContent = score;
        }
        
        // Show feedback
        showAnswerFeedback(currentQuestionIndex);
        
        // Enable next button if it's disabled
        nextBtn.disabled = false;
    }
    
    // Show answer feedback
    function showAnswerFeedback(questionIndex) {
        const question = filteredQuestions[questionIndex];
        const selectedAnswerIndex = selectedAnswers[questionIndex];
        
        if (selectedAnswerIndex === null) return;
        
        const options = document.querySelectorAll('.option');
        const selectedOption = question.options[selectedAnswerIndex];
        const isCorrect = selectedOption.correct;
        
        // Highlight correct/incorrect answers
        question.options.forEach((option, index) => {
            if (option.correct) {
                options[index].classList.add('correct');
            } else if (index === selectedAnswerIndex && !option.correct) {
                options[index].classList.add('incorrect');
            }
        });
        
        // Show feedback message
        if (isCorrect) {
            correctFeedback.style.display = 'flex';
            incorrectFeedback.style.display = 'none';
        } else {
            correctFeedback.style.display = 'none';
            incorrectFeedback.style.display = 'flex';
            
            // Find and show correct answer
            const correctOption = question.options.find(opt => opt.correct);
            correctAnswerText.textContent = correctOption.text;
        }
        
        feedbackContainer.style.display = 'block';
    }
    
    // Timer functions
    function startTimer() {
        resetTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    function resetTimer() {
        timeRemaining = 15;
        updateTimerDisplay();
    }
    
    function updateTimer() {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
            totalTimeTaken++;
            
            // Change timer color when time is running low
            if (timeRemaining <= 5) {
                timerProgress.style.stroke = '#e74c3c';
                timerDisplay.style.color = '#e74c3c';
            }
        } else {
            clearInterval(timerInterval);
            // Auto-select an answer if none selected
            if (selectedAnswers[currentQuestionIndex] === null) {
                autoSelectAnswer();
            }
        }
    }
    
    function updateTimerDisplay() {
        timerDisplay.textContent = timeRemaining;
        const circumference = 169.65; // 2 * π * r (27px radius)
        const offset = circumference - (timeRemaining / 15) * circumference;
        timerProgress.style.strokeDashoffset = offset;
    }
    
    function autoSelectAnswer() {
        if (selectedAnswers[currentQuestionIndex] !== null) return;
        
        // Select a random answer
        const randomIndex = Math.floor(Math.random() * 4);
        selectAnswer(randomIndex);
    }
    
    // Navigation functions
    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            loadQuestion(currentQuestionIndex - 1);
            startTimer();
        }
    }
    
    function showNextQuestion() {
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
            startTimer();
        } else {
            submitQuiz();
        }
    }
    
    // Submit quiz and show results
    function submitQuiz() {
        clearInterval(timerInterval);
        quizScreen.style.display = 'none';
        resultsScreen.style.display = 'block';
        
        // Calculate results
        const totalQuestions = filteredQuestions.length;
        let correctCount = 0;
        
        selectedAnswers.forEach((answerIndex, questionIndex) => {
            if (answerIndex !== null) {
                const question = filteredQuestions[questionIndex];
                if (question.options[answerIndex].correct) {
                    correctCount++;
                }
            }
        });
        
        // Update results display
        const percentage = Math.round((correctCount / totalQuestions) * 100);
        scorePercentage.textContent = `${percentage}%`;
        correctAnswersDisplay.textContent = correctCount;
        totalAnswersDisplay.textContent = totalQuestions;
        timeTakenDisplay.textContent = `${totalTimeTaken} seconds`;
        
        // Update score progress circle
        const circumference = 339.292; // 2 * π * r (54px radius)
        const offset = circumference - (percentage / 100) * circumference;
        document.querySelector('.score-progress').style.strokeDashoffset = offset;
        
        // Update performance message
        let message = '';
        let icon = '';
        
        if (percentage >= 90) {
            message = 'Outstanding! You are a quiz master!';
            icon = 'fas fa-crown';
        } else if (percentage >= 70) {
            message = 'Great job! You have excellent knowledge.';
            icon = 'fas fa-star';
        } else if (percentage >= 50) {
            message = 'Good effort! Keep learning and improving.';
            icon = 'fas fa-thumbs-up';
        } else {
            message = 'Keep practicing to improve your score!';
            icon = 'fas fa-book';
        }
        
        performanceMessage.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    }
    
    // Restart quiz
    function restartQuiz() {
        resultsScreen.style.display = 'none';
        welcomeScreen.style.display = 'block';
        clearInterval(timerInterval);
    }
    
    // Review answers
    function reviewAnswers() {
        resultsScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        currentQuestionIndex = 0;
        loadQuestion(currentQuestionIndex);
        
        // Disable answer selection in review mode
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        submitBtn.style.display = 'none';
    }
    
    // Share results
    function shareResults() {
        const percentage = scorePercentage.textContent;
        const correct = correctAnswersDisplay.textContent;
        const total = totalAnswersDisplay.textContent;
        
        const shareText = `I scored ${percentage} (${correct}/${total}) on the Knowledge Challenge Quiz! Test your knowledge too!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Quiz Results',
                text: shareText,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Results copied to clipboard!');
            }).catch(() => {
                prompt('Copy this text to share:', shareText);
            });
        }
    }
    
    // Initialize the app
    init();
});