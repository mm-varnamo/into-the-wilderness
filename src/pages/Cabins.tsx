import Row from '../ui/Row';
import Heading from '../ui/Heading';
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';

const Cabins = () => {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All cabins</Heading>
				<p>Filter / Sort</p>
			</Row>

			<Row type='vertical'>
				<CabinTable />
				<AddCabin />
			</Row>
		</>
	);
};

export default Cabins;
