import dotenv from 'dotenv';
import { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard } from 'grammy';
import { hydrate } from '@grammyjs/hydrate'
export default function Test() {
   dotenv.config()
   const bot = new Bot(process.env.BOT__API__KEY)
   bot.use(hydrate())
}
/*bot.api.setMyCommands([
   {
      command: "menu",
      description: 'show menu'
   },
   {
      command: 'start',
      description: 'starts bot'
   },
   {
      command: "hello",
      description: 'says hello'
   },
   {
      command: "mood",
      description: 'ask your feelings '
   },
   {
      command: "share",
      description: 'get info'
   },
   {
      command: "inline_keyboard",
      description: 'inline keyboard'
   },
])

const menuKeyboard = new InlineKeyboard().text('get your order status', 'order status').
   text('apply to support', 'support')

const backMenu = new InlineKeyboard().text('back to menu', 'back')

bot.command('menu', async (ctx) => {
   await ctx.reply('choose menu option', {
      reply_markup: menuKeyboard
   })
})

bot.callbackQuery('order status', async (ctx) => {
   await ctx.callbackQuery.message.editText('order status is in a way', {
      reply_markup: backMenu
   })
})
bot.callbackQuery('support', async (ctx) => {
   await ctx.callbackQuery.message.editText('text your question', {
      reply_markup: backMenu
   })
})
bot.callbackQuery('back', async (ctx) => {
   await ctx.callbackQuery.message.editText('choose menu option', {
      reply_markup: menuKeyboard
   })
})

bot.command('mood', async (ctx) => {
   //const moodKeyBoard = new Keyboard().text('good').row().text('ok').row().text('bad').resized()
   const text = ['good', 'ok', 'bad']
   const rows = text.map((item) => {
      return [
         Keyboard.text(item)
      ]
   })
   const Keyboard2 = Keyboard.from(rows).resized()
   await ctx.reply('how are u feeling?', {
      reply_markup: Keyboard2
   })
})

bot.command('share', async (ctx) => {
   const shareKeyboard = new Keyboard().requestLocation('location').row().requestContact('contact').row().requestPoll('poll').placeholder('point a data').resized()
   await ctx.reply('what do u want to share?', {
      reply_markup: shareKeyboard
   })
})

bot.command('inline_keyboard', async (ctx) => {
   //const inlineKeyboard = new InlineKeyboard().text('1', 'button 1').text('2', 'button 2').text('3', 'button 3')
   const inlineKeyboard2 = new InlineKeyboard().url('gp tp the tg channel', 'https://coinmarketcap.com/ru/portfolio-tracker/')
   await ctx.reply('choose a nuber', {
      reply_markup: inlineKeyboard2
   })
})

bot.callbackQuery(/button [1-3]/, async (ctx) => {
   await ctx.answerCallbackQuery('u made a choice')
   await ctx.reply(`u clicked on ${ctx.callbackQuery.data} button`)
})
bot.on('callback_query:data', async (ctx) => {
   await ctx.reply(`u clicked on ${ctx.callbackQuery.data} button`)
})

bot.on(':contact', async (ctx) => {
   await ctx.reply('nice phone,bro', {
      reply_parameters: { message_id: ctx.message.message_id }
   })
}
)

bot.hears('good', async (ctx) => {
   ctx.reply('niiice', {
      reply_markup: { remove_keyboard: true }
   })
})

bot.hears(/suka/, async (ctx) => {
   ctx.reply('done')
})

bot.command(['say__hello', 'hello', 'say__hi'], async (ctx) => {
   await ctx.reply('Hello')
})

bot.command('start', async (ctx) => {
   await ctx.reply('Привет, я бот ! <a href="https://dimonchik2525.github.io/ITNOX/dist/">My site</a>', {
      parse_mode: 'HTML',
      reply_parameters: { message_id: ctx.message.message_id }
   })
   await ctx.react('😁')
})


bot.catch((err) => {
   const ctx = err.ctx
   console.error(`Error while handling ${ctx.update.update_id}`)
   const e = err.error

   if (e instanceof GrammyError) {
      console.error(`Error is request ${e.description}`)
   }
   else if (e instanceof HttpError) {
      console.error('Couldnt contact telegramm', e)
   }
   else {
      console.error('Uknown error', e)
   }
})
*/
/*bot.api.setMyCommands([
   {
      command: 'start',
      description: 'starts bot'
   }
])

//!!Commands
bot.command('start', async (ctx) => {
   const startKeyboard = new Keyboard().text('HTML').text('SCSS').row().text('JavaScript').text('React').row().text('Random').resized()
   await ctx.reply('hi.welcome, lets start')
   await ctx.reply('choose topic', {
      reply_markup: startKeyboard
   })
})

//!!Querry callbacks
bot.callbackQuery('answer', async (ctx) => {
   await ctx.reply('it s a joke man')
   await ctx.answerCallbackQuery('answered')
})
bot.on('callback_query:data', async (ctx) => {
   if (ctx.callbackQuery.data == 'back') {
      await ctx.reply('canceled')
      await ctx.answerCallbackQuery()
      return
   }

   const callbackData = JSON.parse(ctx.callbackQuery.data)
   await ctx.reply(`${callbackData.type} - the major part of frontend`)
   await ctx.answerCallbackQuery()
   const callbackData = JSON.parse(ctx.callbackQuery.data)
   if (!callbackData.type.includes('option')) {
      const answer = getCorrectAnswer(callbackData.type, callbackData.questionId)
      await ctx.reply(answer, {
         parse_mode: 'HTML',
         disable_web_page_preview: true
      })
      await ctx.answerCallbackQuery()
      return
   }
   else if (callbackData.isCorrect) {
      await ctx.reply('u are correct')
      await ctx.answerCallbackQuery()
      return
   }
   const answer = getCorrectAnswer(callbackData.type.split('-')[0], callbackData.questionId)
   await ctx.reply(`incorrect, the correct answer is ${answer}`)
   await ctx.answerCallbackQuery()
})

//!!Hears
bot.hears(['HTML', 'SCSS', 'JavaScript', 'React', 'Random'], async (ctx) => {
   const topic = ctx.message.text;
   let question = getRandomQuestion(topic)
   let inline;
   if (question.hasOptions) {
      const buttonRows = question.options.map((option) => {
         return [InlineKeyboard.text(option.text, JSON.stringify({
            type: `${topic}-option`,
            isCorrect: option.isCorrect,
            questionId: question.id
         }))]
      })
      inline = InlineKeyboard.from(buttonRows)
   }
   else {
      inline = new InlineKeyboard().text('get answer', JSON.stringify({
         type: topic,
         questionId: question.id
      }))
   }
   await ctx.reply(question.text, {
      reply_markup: inline
   })
})

//??Errors handling
bot.catch((err) => {
   const ctx = err.ctx
   console.error(`Error while handling ${ctx.update.update_id}`)
   const e = err.error

   if (e instanceof GrammyError) {
      console.error(`Error is request ${e.description}`)
   }
   else if (e instanceof HttpError) {
      console.error('Couldnt contact telegramm', e)
   }
   else {
      console.error('Uknown error', e)
   }
})*/