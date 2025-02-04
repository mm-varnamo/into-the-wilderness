import Row from '../ui/Row';
import Heading from '../ui/Heading';
import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';

const Settings = () => {
	return (
		<Row type='vertical'>
			<Heading as='h1'>Update hotel settings</Heading>
			<UpdateSettingsForm />
		</Row>
	);
};

export default Settings;
