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
import { EditorialModel, RequestPagination, ResponsePagination } from '../../types';

const index = (): JSX.Element => {
	// Atributes
	const [dataEditorial, setDataEditorial] = useState<ResponsePagination<EditorialModel>>();
	const [editoriales, setEditoriales] = useState<EditorialModel[]>([]);

	// Hooks
	useEffect(() => {
		void findAllEditorial();
		void paginatedSearch();
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

	const paginatedSearch = async (): Promise<void> => {
		const searchFilter: RequestPagination<EditorialModel> = {
			page: 1,
			perPage: 10,
		};
		const response = await EditorialService.findPaginatedSearch(searchFilter);
		const data: ResponsePagination<EditorialModel> = response.data;
		setDataEditorial(data);
		console.log(data);
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
									{
										table.getRowModel().rows.map(row => (
											<tr key={row.id}>
												{
													row.getVisibleCells().map(cell => (
														<td key={cell.id}>
															{flexRender(cell.column.columnDef.cell, cell.getContext())}
														</td>
													))
												}
											</tr>
										))
									}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
