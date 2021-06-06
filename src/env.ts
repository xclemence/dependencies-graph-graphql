import path from 'path';

import { config } from 'dotenv'

const envFile = path.join(__dirname, '../.env');

config({ path: envFile })