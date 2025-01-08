import { addKeyword } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { reset } from '../idle-custom'
import { uñasFlow } from './uñas.flow'
import { pestañasFlow } from './pestañas.flow'
import { cejasFlow } from './cejas';
import { rostroFlow } from './rostro.flow';

/**
 * FLujo Inteligente (va a ser activado por una intencion de una persona o por palabra clave)
 * Flujo de bienvenida
 */
export const serviciosFlow = addKeyword<Provider, Database>('USUARIOS_NO_REGISTRADOS')
.addAnswer(
    [
        '🌟 ¿Quieres conocer un poco más de nosotros y nuestros servicios? ¡Síguenos!',
        '🔗 https://www.instagram.com/afroditaspa_pereira/'
    ])
    .addAnswer(
        [
            '*📋 Menú:*',
            '',
            '1. 💅 Uñas',
            '2. 👁️ Pestañas',
            '3. 🎨 Cejas',
            '4. 🌸 Rostro'
        ]
        ,
        { capture: true },
        async (ctx, { gotoFlow, fallBack }) => {
            reset(ctx, gotoFlow, Number(process.env.TIEMPOINACTIVIDAD));
            const opcion = ctx.body
            if (!['1', '2','3','4'].includes(opcion)) {
                //await gotoFlow(defaultFlow)
                return fallBack('🌟 ¡por favor ingresa una opcion valida! 🌟')
            }
        },
        [uñasFlow,pestañasFlow, cejasFlow,rostroFlow]
    )

