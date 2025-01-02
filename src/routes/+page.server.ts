export const load = async ({ locals, url }) => {
	const searchQuery = url.searchParams.get('imageTitle');
	if (searchQuery) {
		const filteredImages = await locals.pb
			.collection('images')
			.getFullList({ filter: `Title~"${searchQuery}"` });

		return {
			images: filteredImages
		};
	}
	const imagesList = await locals.pb.collection('images').getFullList();
	return {
		images: imagesList
	};
};
