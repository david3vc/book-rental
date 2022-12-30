import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../constants/env';
import { EditorialModel } from '../../types';

export const findAll = (): Promise<AxiosResponse<EditorialModel[]>> =>
	axios.get<EditorialModel[]>(`${API_BASE_URL}/api/editorial`);
