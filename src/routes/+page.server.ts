export const load = async ({ locals }) => {
	const imagesList = await locals.pb.collection('images').getFullList();

	return {
		images: imagesList
	};
};
