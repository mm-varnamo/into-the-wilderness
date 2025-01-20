import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { Cabin as CabinType } from '../../types/cabin.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:list-child) {
		border-bottom: 1px solid var(--colo-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

interface CabinRowProps {
	cabin: CabinType;
}

const CabinRow = ({ cabin }: CabinRowProps) => {
	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
	} = cabin;

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			alert('Cabin successfully deleted');

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (error) => alert(error.message),
	});

	return (
		<TableRow role='row'>
			<Img src={image} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			<Discount>{formatCurrency(discount)}</Discount>
			<button onClick={() => mutate(cabinId)} disabled={isPending}>
				Delete
			</button>
		</TableRow>
	);
};

export default CabinRow;
