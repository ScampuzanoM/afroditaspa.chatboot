import { addKeyword } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset, stop } from '../idle-custom'
import json from '../../roles.json'

export const rostroFlow = addKeyword<Provider, Database>(['4'])
    .addAnswer(['👁️ Conoce un poco mas sobre nuestro trabajo en rostros',
        '🔗 https://www.instagram.com/stories/highlights/17848793218448182/'])
        .addAnswer([
            '*✨ Estos son nuestros servicios! ✨*',
            '📩 Por favor, escríbenos en cuál o cuáles de estos estás interesad@'
        ])
    .addAnswer([
        '*📋 Menú:*',
        '',
        '1. 🧖‍♀️ Limpieza facial profunda',
        '2. ✨ Peeling']
        ,
        { capture: true },
        async (ctx, { gotoFlow, state , fallBack}) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            const opcion = ctx.body
            switch (opcion) {
                case '1': {
                    return await state.update({ servicio: 'Limpieza facial profunda' })
                }
                case '2': {
                    return await state.update({ servicio: 'Peelling' })
                }
                default: {
                    return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
                }
            }
        })
    .addAction(
        async (ctx, { flowDynamic, state, endFlow}) => {
            stop(ctx);
            const myState = state.getMyState();
            let mensaje
            if (myState.nombreCliente) {
                mensaje = `👋 Hola, mi nombre es ${myState.nombreCliente} y estoy interesad@ en un servicio de ${myState.servicio}`;
            } else {
                mensaje = `👋 Hola, estoy interesad@ en un servicio de ${myState.servicio}`;
            }
            const SEDE = json.sedes.find((sede) => sede.id === 1);
            const TEL = SEDE.servicios;
            // Codificar el mensaje para usarlo en el enlace de WhatsApp
            const enlaceWhatsApp = encodeURI(`https://wa.me/${TEL}?text=${mensaje}`);
            // Mensaje final que se enviará a través de tu flujo dinámico
            const mensajeFinal = `*Para reservar haz clic en el siguiente enlace:* 
        ${enlaceWhatsApp}`;
            // Enviar el mensaje utilizando tu función flowDynamic

            state.clear();
            return endFlow(mensajeFinal);
        }
    )

