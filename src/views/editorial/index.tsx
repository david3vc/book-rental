import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { EditorialService } from '../../services';
import { EditorialModel, FilterPage, RequestPagination, ResponsePagination } from '../../types';
import { Pagination } from 'react-bootstrap';

const index = (): JSX.Element => {
	// Atributes
	const [dataEditorial, setDataEditorial] = useState<ResponsePagination<EditorialModel>>();
	const [editoriales, setEditoriales] = useState<EditorialModel[]>([]);

	// Hooks
	useEffect(() => {
		// void findAllEditorial();
		void paginatedSearch({page: 1, perPage: 10});
	}, []);

	// Vendor
	const columnHelper = createColumnHelper<EditorialModel>();

	const columns = [
		columnHelper.accessor('id', {
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('codigo', {
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('nombre', {
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('fechaRegistro', {
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('estado', {
			cell: info => info.getValue(),
		}),
	];

	const table = useReactTable({
		data: dataEditorial?.data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	// Methods
	const findAllEditorial = async (): Promise<void> => {
		const response = await EditorialService.findAll();
		const data: EditorialModel[] = response.data;

		console.log('Editoriales', data);

		setEditoriales(data);
	};

	const paginatedSearch = async (payload: FilterPage): Promise<void> => {
		const searchFilter: RequestPagination<EditorialModel> = {
			page: payload?.page,
			perPage: payload?.perPage,
		};
		const response = await EditorialService.findPaginatedSearch(searchFilter);
		const data: ResponsePagination<EditorialModel> = response.data;
		setDataEditorial(data);
		console.log(data);
	};

	const handleGoToPage = (payload: FilterPage): void => {
		console.log('jejeje', payload);
		void paginatedSearch({page: payload?.page, perPage: payload?.perPage});
	};

	return (
		<>
			<Row className="page-titles">
				<Col className="col-auto">
					<ol className="breadcrumb py-1">
						<li className="breadcrumb-item text-nowrap">Home</li>
						<li className="breadcrumb-item text-nowrap active">Index</li>
					</ol>
				</Col>
				<Col className="d-flex justify-content-end align-items-center">
					<div>
						<Button variant="primary" size="sm">
							Primary
						</Button>{' '}
						<Button variant="secondary" size="sm">
							Secondary
						</Button>
					</div>
				</Col>
			</Row>

			<Row>
				<Col xs={12}>
					<Card>
						<Card.Header>Listado de editoriales</Card.Header>
						<Card.Body>
							<Table>
								<thead>
									{table.getHeaderGroups().map(headerGroup => (
										<tr key={headerGroup.id}>
											{headerGroup.headers.map(header => (
												<th key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody>
									{table.getRowModel().rows.map(row => (
										<tr key={row.id}>
											{row.getVisibleCells().map(cell => (
												<td key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</Table>

							<div className="d-flex justify-content-between align-items-center flex-wrap">
								<div className="d-flex justify-content-between align-items-center py-1">
									<div className="pe-2">
										Mostrando registro del{' '}
										<span className="fw-bold">{dataEditorial?.from ?? 1}</span> al{' '}
										<span className="fw-bold">{dataEditorial?.to ?? 0}</span> de un total de{' '}
										<span className="fw-bold">{dataEditorial?.total ?? 0}</span> registros
									</div>
								</div>
								<Pagination>
									<Pagination.First
										disabled={dataEditorial?.currentPage === 1}
										onClick={() =>
											handleGoToPage({
												page: 1,
												perPage: dataEditorial?.perPage ?? 10,
											})
										}
									/>
									<Pagination.Prev
										disabled={dataEditorial?.currentPage === 1}
										onClick={() =>
											handleGoToPage({
												page: (dataEditorial?.currentPage ?? 0) - 1,
												perPage: dataEditorial?.perPage ?? 10,
											})
										}
									/>
									<Pagination.Ellipsis />
									<Pagination.Next
										disabled={dataEditorial?.currentPage === dataEditorial?.lastPage}
										onClick={() =>
											handleGoToPage({
												page: (dataEditorial?.currentPage ?? 0) + 1,
												perPage: dataEditorial?.perPage ?? 10,
											})
										}
									/>
									<Pagination.Last
										disabled={dataEditorial?.currentPage === dataEditorial?.lastPage}
										onClick={() =>
											handleGoToPage({
												page: dataEditorial?.lastPage ?? 0,
												perPage: dataEditorial?.perPage ?? 10,
											})
										}
									/>
								</Pagination>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
