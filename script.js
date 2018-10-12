(function() {
    const myQuestions = [
        {
            progress: "1/10",
            question: "Who is the strongest?",
            answers: {
                a: "Superman",
                b: "The Terminator",
                c: "Waluigi, obviously",
                d: "Waluigi, obviously"
            },
            correctAnswer: "c"
        },
        {
            progress: "2/10",
            question: "What is the best site ever created?",
            answers: {
                a: "SitePoint",
                b: "Simple Steps Code",
                c: "Trick question; they're both the best",
                d: "Waluigi, obviously"
            },
            correctAnswer: "c"
        },
        {
            progress: "3/10",
            question: "Where is Waldo really?",
            answers: {
                a: "Antarctica",
                b: "Exploring the Pacific Ocean",
                c: "Sitting in a tree",
                d: "Minding his own business, so stop asking"
            },
            correctAnswer: "d"
        },
        {
            progress: "4/10",
            question: "Where is Waldo really?",
            answers: {
                a: "Antarctica",
                b: "Exploring the Pacific Ocean",
                c: "Sitting in a tree",
                d: "Minding his own business, so stop asking"
            },
            correctAnswer: "d"
        },
        {
            progress: "5/10",
            question: "Where is Waldo really?",
            answers: {
                a: "Antarctica",
                b: "Exploring the Pacific Ocean",
                c: "Sitting in a tree",
                d: "Minding his own business, so stop asking"
            },
            correctAnswer: "d"
        },
        {
            progress: "6/10",
            question: "Where is Waldo really?",
            answers: {
                a: "Antarctica",
                b: "Exploring the Pacific Ocean",
                c: "Sitting in a tree",
                d: "Minding his own business, so stop asking"
            },
            correctAnswer: "d"
        },
        {
            progress: "7/10",
            question: "Where is Waldo really?",
            answers: {
                a: "Antarctica",
                b: "Exploring the Pacific Ocean",
                c: "Sitting in a tree",
                d: "Minding his own business, so stop asking",
                c: "Waluigi, obviously"
            },
            correctAnswer: "d"
        },
        {
            progress: "8/10",
            question: "Where is Waldo really?",
            answers: {
                a: "Antarctica",
                b: "Exploring the Pacific Ocean",
                c: "Sitting in a tree",
                d: "Minding his own business, so stop asking",
                c: "Waluigi, obviously"
            },
            correctAnswer: "d"
        },
        {
            progress: "9/10",
            question: "Where is Waldo really?",
            answers: {
                a: "Antarctica",
                b: "Exploring the Pacific Ocean",
                c: "Sitting in a tree",
                d: "Minding his own business, so stop asking"
            },
            correctAnswer: "d"
        }
        ,
        {
            progress: "10/10",
            question: "Where is Waldo really?",
            answers: {
                a: "Antarctica",
                b: "Exploring the Pacific Ocean",
                c: "Sitting in a tree",
                d: "Minding his own business, so stop asking"
            },
            correctAnswer: "d"
        }
    ];

    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
                // ...add an HTML radio button
                answers.push(
                    `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="slide">
           <div class="question"> ${currentQuestion.question} ${currentQuestion.progress} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
            );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                // if answer is wrong or blank
                // color the answers red
                answerContainers[questionNumber].style.color = "red";
            }
        });

        // show number of correct answers out of total
        if (numCorrect > 5) {
            resultsContainer.innerHTML = `Gratuluacje! Odpowiedziałeś poprawnie na ${numCorrect} z ${myQuestions.length} pytań!`;
        } else {
            resultsContainer.innerHTML = `Kiepsko! Odpowiedziałeś poprawnie na ${numCorrect} z ${myQuestions.length} pytań!`;
        }

        if (localStorage.getItem("scoresList") === null) {
            var scores = [numCorrect];
            localStorage.setItem("scoresList", JSON.stringify(scores));
        } else {
            var scoresString = localStorage.getItem("scoresList");
            var scores = JSON.parse(scoresString);
            document.getElementById("scores").innerHTML = "Twoje poprzednie wyniki: " + scores;
            scores.push(numCorrect);
            localStorage.setItem("scoresList", JSON.stringify (scores));
        }
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    // display quiz right away
    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);

    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();

var width = 10;

function move() {
    var elem = document.getElementById("myBar");
    if (width < 100) {
        width+=10;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
    }
}

function moveBack() {
    var elem = document.getElementById("myBar");
    if (width < 100) {
        width = width - 10;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
    }
}