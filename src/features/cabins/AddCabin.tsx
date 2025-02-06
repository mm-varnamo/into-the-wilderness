import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

const AddCabin = () => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div>
			<Button
				size='medium'
				$variation='primary'
				onClick={() => setOpenModal((openModal) => !openModal)}
			>
				Add new cabin
			</Button>
			{openModal && (
				<Modal onClose={() => setOpenModal(false)}>
					<CreateCabinForm onCloseModal={() => setOpenModal(false)} />
				</Modal>
			)}
		</div>
	);
};

export default AddCabin;
