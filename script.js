const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

const quizQuestions = [
    {
        question: "Кто отвечает на вопросы тихо, но быстро?",
        answers: {
            a: "Аида",
            b: "Жанерке",
            c: "Амира"
        },
        correctAnswer: "a"
    },
    {
        question: "Где мы снимали фильм SCP в 6 классе?",
        answers: {
            a: "В Астане",
            b: "Возле школы",
            c: "В парке"
        },
        correctAnswer: "b"
    },
    {
        question: "Какой самый сложный день в школе",
        answers: {
            a: "Понедельник",
            b: "Пятница",
            c: "Воскресение"
        },
        correctAnswer: "a"
    },
    {
        question: "Продолжите фразу 'Я Сабинина мама'",
        answers: {
            a: "У Махмута макасы потерялся",
            b: "У Сабины беляши потерялся",
            c: "У Сабины кроссовка потерялся"
        },
        correctAnswer: "c"
    },
    {
        question: "Сколько лет школе? (Официально)",
        answers: {
            a: "50",
            b: "28",
            c: "31"
        },
        correctAnswer: "b"
    },
    {
        question: "Как вы называли Даяну в сериале SCP?",
        answers: {
            a: "Дача",
            b: "Взятка",
            c: "Даяна"
        },
        correctAnswer: "a"
    },
    {
        question: "Как Али назвал пенал Әділета на Қазақ тілі",
        answers: {
            a: "PUMA",
            b: "Рита",
            c: "руптуптум"
        },
        correctAnswer: "b"
    },
    {
        question: "Какой подарок мы подарим?",
        answers: {
            a: "Косметика",
            b: "Шопер",
            c: "Серьги"
        },
        correctAnswer: "c"
    }
];

function buildQuiz() {
    const output = [];

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (let letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

async function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    // Очищаем предыдущие классы
    answerContainers.forEach(container => {
        container.classList.remove('correct', 'incorrect');
    });

    // Проверяем ответы поочередно с воспроизведением звука
    for (let questionNumber = 0; questionNumber < quizQuestions.length; questionNumber++) {
        const currentQuestion = quizQuestions[questionNumber];
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainer.classList.add('correct');
            await playSound(correctSound); // Воспроизводим правильный звук
        } else {
            answerContainer.classList.add('incorrect');
            await playSound(incorrectSound); // Воспроизводим неправильный звук
        }
    }

    // Обновляем результаты
    resultsContainer.innerHTML = `${numCorrect} из ${quizQuestions.length}`;
}

// Функция для воспроизведения звука с ожиданием завершения
function playSound(sound) {
    return new Promise(resolve => {
        sound.play();
        sound.onended = resolve; // Ждём окончания звука
    });
}

buildQuiz();

submitButton.addEventListener('click', showResults);