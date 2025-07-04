// routes/quiz.js
const router = require('express').Router();
const quizController = require('../controllers/quizController');

router.post('/', quizController.generateQuiz);

module.exports = router;