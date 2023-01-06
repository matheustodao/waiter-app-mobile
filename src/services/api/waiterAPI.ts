import axios from 'axios';

import { API_URL } from '../../configs/env';

export const waiterAPI = axios.create({
  baseURL: API_URL
});
