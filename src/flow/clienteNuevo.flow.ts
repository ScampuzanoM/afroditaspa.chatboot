import { addKeyword } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset, stop } from '../idle-custom'
import { serviciosFlow } from './servicios.flow';

export const clienteNuevoFlow = addKeyword<Provider, Database>(['CLIENTE_NUEVO'])
    .addAnswer([
        '💬 Cuéntanos cómo te llamas'
    ],

        { capture: true },
        async (ctx, { gotoFlow, state }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            await state.update({ nombreCliente: ctx.body })
            return gotoFlow(serviciosFlow)
        })


