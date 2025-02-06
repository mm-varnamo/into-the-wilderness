import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import CabinTable from './CabinTable';

const AddCabin = () => {
	return (
		<Modal>
			<Modal.Open opens='cabin-form'>
				<Button size='medium' $variation='primary'>
					Add new cabin
				</Button>
			</Modal.Open>
			<Modal.Window name='cabin-form'>
				<CreateCabinForm />
			</Modal.Window>

			<Modal.Open opens='table'>
				<Button size='medium' $variation='primary'>
					Show table
				</Button>
			</Modal.Open>
			<Modal.Window name='table'>
				<CabinTable />
			</Modal.Window>
		</Modal>
	);
};

export default AddCabin;
