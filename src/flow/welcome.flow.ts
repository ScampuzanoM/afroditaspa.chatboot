import { addKeyword, EVENTS } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset, start } from '../idle-custom'
import { serviciosFlow } from './servicios.flow';
import { clienteNuevoFlow } from './clienteNuevo.flow'


// export const welcomeFlow = addKeyword<Provider, Database>(['hola', 'hoola', 'ole', 'alo', 'buenas', 'menu', 'holi', 'hol', 'oe', 'buenos'])
export const welcomeFlow = addKeyword<Provider, Database>('bot')
    .addAnswer(`🙌 ¡Hola! Bienvenid@ a Spa Afrodita. Soy tu asistente virtual, *AfroditaBot*.`)
    .addAnswer(
        [
            '*Menú:*',
            '',
            '1. 🌐 Soy Nuev@',
            '2. 👋 Ya soy cliente.'
        ].join('\n'),
        { capture: true },
        async (ctx, { gotoFlow, fallBack }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            const opcion = ctx.body
            switch (opcion) {
                case '1': {
                    return gotoFlow( clienteNuevoFlow)
                }
                case '2': {
                    return gotoFlow(serviciosFlow)
                }
                default: {
                    return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
                }
            }
        },
        []
    )

