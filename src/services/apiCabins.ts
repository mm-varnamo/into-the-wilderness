import { FieldValues } from 'react-hook-form';
import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
	const { data, error } = await supabase.from('cabins').select('*');
	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	return data;
};

export const createEditCabin = async (newCabin?: FieldValues, id?: number) => {
	console.log(newCabin, id);

	const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

	console.log(hasImagePath);

	const imageName = `${Math.random()}-${newCabin?.image.name}`.replaceAll(
		'/',
		''
	);

	const imagePath = hasImagePath
		? newCabin?.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	// https://hypijuucusopsqmswwlj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

	// 1. Create/Edit cabin
	let query = supabase.from('cabins');

	// A) Create a new cabin
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	// B) Edit a cabin

	if (id) {
		query = query
			.update({ ...newCabin, image: imagePath })
			.eq('id', id)
			.select();
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be created');
	}

	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin?.image);

	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.error(storageError);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		);
	}

	return data;
};

export const deleteCabin = async (id: number) => {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted');
	}

	return data;
};
