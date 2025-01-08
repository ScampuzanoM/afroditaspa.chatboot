import { EVENTS, addKeyword } from '@builderbot/bot'
import { BotContext, TFlow } from '@builderbot/bot/dist/types';

// Object to store timers for each user
const timers = {};

// Flow for handling inactivity
const idleFlow = addKeyword(EVENTS.ACTION).addAction(
    async (_, { endFlow }) => {
        return endFlow('🚫 Lamentamos informarte que la sesión se ha cancelado por inactividad. Para continuar, por favor escribe *menú* o *hola* y estaré encantado de ayudarte nuevamente. 😊');
    }
);

// Function to start the inactivity timer for a user
const start = (ctx: BotContext, gotoFlow: (a: TFlow) => Promise<void>, ms: number) => {
    timers[ctx.from] = setTimeout(() => {
        console.log(`Timeout para: ${ctx.from}`);
        return gotoFlow(idleFlow);
    }, ms);
}

// Function to reset the inactivity timer for a user
const reset = (ctx: BotContext, gotoFlow: (a: TFlow) => Promise<void>, ms: number) => {
    stop(ctx);
    if (timers[ctx.from]) {
        console.log(`reinicio de sesion para: ${ctx.from}`);
        clearTimeout(timers[ctx.from]);
    }
    start(ctx, gotoFlow, ms);
}

// Function to stop the inactivity timer for a user
const stop = (ctx: BotContext) => {
    if (timers[ctx.from]) {
        // console.log(`finalizacion de sesision para: ${ctx.from}`);
        clearTimeout(timers[ctx.from]);
    }
}

export {
    start,
    reset,
    stop,
    idleFlow,
}