import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export const useDeleteCabin = () => {
	const queryClient = useQueryClient();

	const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			toast.success('Cabin successfully deleted');

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (error) => toast.error(error.message),
	});

	return { deleteCabin, isDeleting };
};
