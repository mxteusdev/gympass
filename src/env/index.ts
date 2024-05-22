import 'dotenv/config'
import { z } from 'zod'

// validar as variáveis de ambiente
// process.env: {NODE_ENV: 'dev', ...}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid enviroment variables', _env.error.format())

  throw new Error('Invalid enviroment variables.')
  // Caso de erro na validação, esse trecho é o responsável por derrubar a aplicação.
}

export const env = _env.data
