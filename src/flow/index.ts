import * as dotenv from 'dotenv';
import { createFlow } from '@builderbot/bot';
import { welcomeFlow } from "./welcome.flow";
import { idleFlow } from '../idle-custom'
import { serviciosFlow } from './servicios.flow';
import { clienteNuevoFlow } from './clienteNuevo.flow';

dotenv.config();
// other flows....

export const flow = createFlow([welcomeFlow, idleFlow, serviciosFlow,clienteNuevoFlow])