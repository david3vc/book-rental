import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
						<Card.Body></Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
