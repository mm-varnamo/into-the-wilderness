import Input from '../../ui/Input';
import Form from '../../ui/Form';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import FileInput from '../../ui/FileInput';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';
import { Cabin as CabinType } from '../../types/cabin.types';

interface CreateCabinFormProps {
	cabinToEdit?: CabinType;
	onCloseModal?: () => void;
}

const CreateCabinForm = ({
	cabinToEdit,
	onCloseModal,
}: CreateCabinFormProps) => {
	const { id: editId, ...editValues } = cabinToEdit ? cabinToEdit : {};
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;
	const { createCabin, isCreating } = useCreateCabin();
	const { editCabin, isEditing } = useEditCabin();

	const onSubmit = (data: FieldValues) => {
		const image = typeof data.image === 'string' ? data.image : data.image[0];

		if (isEditSession) {
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => reset(),
				}
			);
		} else {
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		}
	};

	const isWorking = isCreating || isEditing;

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow label='Cabin name' error={errors?.name?.message as string}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow
				label='Maximum capacity'
				error={errors?.maxCapacity?.message as string}
			>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Regular price'
				error={errors?.regularPrice?.message as string}
			>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'The regular price should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message as string}>
				<Input
					type='number'
					id='discount'
					disabled={isWorking}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) =>
							value < getValues().regularPrice ||
							'Discount should be less than the regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label='Description'
				error={errors?.description?.message as string}
			>
				<Textarea
					id='description'
					disabled={isWorking}
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Cabin photo' error={errors?.image?.message as string}>
				<FileInput
					accept='image/*'
					id='image'
					type='file'
					{...register('image', {
						required: isEditSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				<>
					<Button
						$variation='secondary'
						size='medium'
						type='reset'
						onClick={() => onCloseModal?.()}
					>
						Cancel
					</Button>
					<Button disabled={isWorking} $variation='primary' size='medium'>
						{isEditSession ? 'Edit cabin' : 'Create new cabin'}
					</Button>
				</>
			</FormRow>
		</Form>
	);
};

export default CreateCabinForm;
