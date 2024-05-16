const questions = [
    // Array of quiz questions, options, and answers
    // Example:
    {
        question: "What is an object in C++?",
        options: ["A block of code", "An instance of a class", "A primitive data type", "A conditional statement"],
        answer: "An instance of a class"
    },
    {
        question: "Which OOP principle describes the ability of an object to take multiple forms in C++?",
        options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
        answer: "Polymorphism"
    },
    {
        question: "What is inheritance in C++?",
        options: ["The ability to create multiple instances of an object", "The process of wrapping data and methods into a single unit", "The process of one class acquiring the properties and functionalities of another class", "A feature that allows the same method to be used for different purposes"],
        answer: "The process of one class acquiring the properties and functionalities of another class"
    },
    {
        question: "What does the 'static' keyword mean in C++?",
        options: ["The method can be accessed without creating an instance of the class", "The method cannot be overridden in a subclass", "The method is part of the superclass", "The method is available only to the class that defines it"],
        answer: "The method can be accessed without creating an instance of the class"
    },
    {
        question: "What is the purpose of the 'this' pointer in C++?",
        options: ["To refer to the current instance of the class", "To create an instance of a class", "To call a superclass constructor", "To declare a constant value"],
        answer: "To refer to the current instance of the class"
    },
    {
        question: "What is function overloading in C++?",
        options: ["Defining a new function in a subclass with the same name as a function in the superclass", "Defining a function in a subclass with a different name as a function in the superclass", "Defining multiple functions in a class with the same name but different parameters", "Defining multiple functions in a class with the same name and parameters"],
        answer: "Defining multiple functions in a class with the same name but different parameters"
    },
    {
        question: "What is the purpose of the 'virtual' keyword in C++?",
        options: ["To refer to the current instance of the class", "To create an instance of a class", "To declare a class method that can be overridden in derived classes", "To declare a constant value"],
        answer: "To declare a class method that can be overridden in derived classes"
    },
    {
        question: "What is an abstract class in C++?",
        options: ["A class that cannot be instantiated", "A class that can be instantiated but cannot be subclassed", "A class that contains abstract methods", "A class that contains concrete methods"],
        answer: "A class that contains abstract methods"
    },
    {
        question: "What is the purpose of an interface in C++?",
        options: ["To define a blueprint of a class", "To create multiple instances of a class", "To store primitive data types", "To define a collection of related methods with empty bodies"],
        answer: "To define a collection of related methods with empty bodies"
    },
    {
        question: "What is the difference between an abstract class and an interface in C++?",
        options: ["An abstract class can have both abstract and concrete methods, while an interface can only have abstract methods", "An abstract class can only have abstract methods, while an interface can have both abstract and concrete methods", "An abstract class can be instantiated, while an interface cannot be instantiated", "An abstract class cannot have constructors, while an interface can have constructors"],
        answer: "An abstract class can have both abstract and concrete methods, while an interface can only have abstract methods"
    }
    // Add more questions here...
];

let currentQuestion = 0;
let score = 0;
let userResponses = []; // Array to store user's responses

// Function to load quiz questions
function loadQuestion() {
    const questionContainer = document.getElementById("quiz-container");
    const questionData = questions[currentQuestion];

    // Generate HTML markup for the question and options
    //<!--<button id="submit-btn">Next</button>

    const questionMarkup = `
        <h2>${questionData.question}</h2>
        <form id="quiz-form">
            ${questionData.options.map(option => `
                <div class="option">
                    <label>
                        <input type="radio" name="answer" value="${option}">
                        ${option}
                    </label>
                </div>
            `).join("")}
        </form>
    `;

    questionContainer.innerHTML = questionMarkup;
}

// Function to handle quiz submission
function submitQuiz() {
    const selectedOption = document.querySelector("input[name='answer']:checked");
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        userResponses.push(userAnswer); // Store user's answer

        if (userAnswer === questions[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    } else {
        alert("Please select an answer.");
    }
}

// Function to display the quiz score and generate report
function showScore() {
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.style.display = "block";
    document.getElementById("score").textContent = `Your Score: ${score} / ${questions.length}`;

    // Display generate report button
    const reportButton = document.createElement("button");
    reportButton.textContent = "Generate Quiz Report";
    reportButton.addEventListener("click", generateQuizReport);
    scoreContainer.appendChild(reportButton);
}

// Function to generate and display the quiz report
function generateQuizReport() {
    const reportContainer = document.createElement("div");
    reportContainer.classList.add("quiz-report");

    // Loop through each question to display in the report
    questions.forEach((questionData, index) => {
        const userAnswer = userResponses[index];
        const isCorrect = userAnswer === questionData.answer;

        const questionElement = document.createElement("div");
        questionElement.classList.add("report-question");

        // Display question
        const questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${questionData.question}`;
        questionElement.appendChild(questionText);

        // Display user's answer
        const userAnswerText = document.createElement("p");
        userAnswerText.textContent = `Your Answer: ${userAnswer || "Not answered"}`;
        if (!isCorrect) {
            userAnswerText.style.color = "red"; // Set user's answer to red if incorrect
        }
        questionElement.appendChild(userAnswerText);

        // Display correct answer
        const correctAnswerText = document.createElement("p");
        correctAnswerText.textContent = `Correct Answer: ${questionData.answer}`;
        if (!isCorrect) {
            correctAnswerText.style.color = "green"; // Highlight correct answer in green if user's answer is wrong
        }
        questionElement.appendChild(correctAnswerText);

        reportContainer.appendChild(questionElement);
    });

    // Append the report container to the document body
    document.body.appendChild(reportContainer);

    // Add download button to save the report as a PDF
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download Report (PDF)";
    downloadButton.addEventListener("click", () => {
        const opt = {
            margin:       1,
            filename:     'quiz_report.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(reportContainer).set(opt).save();

        // Clean up
        document.body.removeChild(reportContainer);
        document.body.removeChild(downloadButton);
    });

    // Append download button to the document body
    document.body.appendChild(downloadButton);
}

// Event listener for quiz submission
document.getElementById("submit-btn").addEventListener("click", function(event) {
    event.preventDefault();
    submitQuiz();
});

// Load the first question when the page loads
loadQuestion();