import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';

export const useCreateCabin = () => {
	const queryClient = useQueryClient();

	const { mutate: createCabin, isPending: isCreating } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success('New cabin successfully created');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (error) => toast.error(error.message),
	});

	return { createCabin, isCreating };
};
