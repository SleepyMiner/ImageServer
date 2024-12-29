import PocketBase from 'pocketbase';
import { POCKETBASE_URL } from './utils.js';

export const pb = new PocketBase(POCKETBASE_URL);
