import { useEffect } from "react";
import { EditorialService } from "../../services";
import { EditorialModel } from "../../types";

const index = (): JSX.Element => {
	// Atributes

	// Hooks
	useEffect(()=>{
		void findAllEditorial();
	},[])

	// Methods
	const findAllEditorial = async (): Promise<void> =>{
		const response = await EditorialService.findAll();
		const data: EditorialModel[] = response.data;

		console.log('Editoriales', data);
	}

	return <div>Editoriales</div>;
};

export default index;
