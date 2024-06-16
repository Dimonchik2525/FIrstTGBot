
import dotenv from 'dotenv';
import { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard } from 'grammy';
import { hydrate } from '@grammyjs/hydrate'
dotenv.config()
const bot = new Bot(process.env.BOT__API__KEY)
bot.use(hydrate())
//!!Main commands

let amount = 0

bot.api.setMyCommands([
   {
      command: 'info',
      description: 'get info about project',
   },
   {
      command: 'start',
      description: 'start new day',
   },

])

bot.command('start', async (ctx) => {
   await ctx.reply('What are u doing today?', {
      reply_markup: mainKeyboard
   })
})

bot.command('info', async (ctx) => {
   await ctx.reply('This bot was created ... for ....')
})

bot.hears(/^\d+$/, async (ctx) => {
   amount += +ctx.message.text
   await ctx.reply(ctx.message.text)
   await ctx.reply(amount)
})

bot.on("message:text", async (ctx) => {
   if (ctx.message.text === 'Bars') {
      await ctx.reply('lets start')
      await ctx.reply('enter your first prompt')
   }
})



//?? KeyBoards 

const mainKeyboard = new Keyboard().text('Bars').text('Horizontal bar').resized().placeholder('Enter your first prompt').oneTime()

//!! Hears


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
})
bot.start()