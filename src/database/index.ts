import { JsonFileDB as Database } from '@builderbot/database-json'

export const adapterDB = new Database({ filename: 'db.json' })