import axios, { AxiosResponse } from 'axios';
import { stringify } from 'qs';

import { API_BASE_URL } from '../../constants/env';
import { EditorialModel, RequestPagination, ResponsePagination } from '../../types';

export const findAll = (): Promise<AxiosResponse<EditorialModel[]>> =>
	axios.get<EditorialModel[]>(`${API_BASE_URL}/api/editorial`);

export const findPaginatedSearch = async (
	queryParams: RequestPagination<EditorialModel>,
): Promise<AxiosResponse<ResponsePagination<EditorialModel>>> => {
	const queryParamsFormated: string = stringify(queryParams, { allowDots: true });

	const response = await axios.get<ResponsePagination<EditorialModel>>(
		`${API_BASE_URL}/api/editorial/paginatedsearch?${queryParamsFormated}`,
	);

	return response;
};
