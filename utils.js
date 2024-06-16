import questions from './questions.json' assert { type: 'json' };
let allQuestions = []

export const getRandomQuestion = (topic) => {
   let questionTopic = topic.toLowerCase()
   for (let item of Object.values(questions)) {
      for (let i = 0; i < item.length; i++) {
         item[i].id = allQuestions.length
         allQuestions.push(item[i])
      }
   }

   let randomQuestionIndex;
   randomQuestionIndex = questions[questionTopic]?.length ? Math.floor(Math.random() * questions[questionTopic].length) : Math.floor(Math.random() * allQuestions.length)
   //console.log(questions[questionTopic]?.length ? Math.floor(Math.random() * questions[questionTopic].length) : Math.floor(Math.random() * allQuestions.length));

   return questions[questionTopic]?.length ? questions[questionTopic][randomQuestionIndex] : allQuestions[randomQuestionIndex]
}
export const getCorrectAnswer = (topic, id) => {
   let questionTopic = topic.toLowerCase()
   //const question = questions[questionTopic].filter((item) => item.id == id)[0] 
   const question = !allQuestions.length ? questions[questionTopic].filter((item) => item.id == id)[0] : allQuestions.filter((item) => item.id == id)[0]

   if (!question.hasOptions) {
      return question.answer
   }
   else {
      return question.options.filter((item) => item.isCorrect)[0].text
   }
}