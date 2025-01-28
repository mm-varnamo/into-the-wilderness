import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { Cabin as CabinType } from '../../types/cabin.types';

export const useGetCabins = () => {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery<CabinType[]>({
		queryKey: ['cabins'],
		queryFn: getCabins,
	});

	return { isLoading, cabins, error };
};
