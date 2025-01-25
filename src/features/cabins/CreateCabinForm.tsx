import Input from '../../ui/Input';
import Form from '../../ui/Form';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import FileInput from '../../ui/FileInput';

const CreateCabinForm = () => {
	const { register, handleSubmit, reset, getValues, formState } = useForm();

	const { errors } = formState;
	console.log(errors);

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('New cabin successfully created');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
			reset();
		},
		onError: (error) => toast.error(error.message),
	});

	const onSubmit = (data: FieldValues) => {
		mutate({ ...data, image: data.image[0] });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label='Cabin name' error={errors?.name?.message as string}>
				<Input
					type='text'
					id='name'
					disabled={isPending}
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
					disabled={isPending}
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
					disabled={isPending}
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
					disabled={isPending}
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
					disabled={isPending}
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
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				<>
					<Button $variation='secondary' size='medium' type='reset'>
						Cancel
					</Button>
					<Button disabled={isPending} $variation='primary' size='medium'>
						Add cabin
					</Button>
				</>
			</FormRow>
		</Form>
	);
};

export default CreateCabinForm;
