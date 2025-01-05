import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}
};

export const actions = {
	upload: async ({ locals, request }) => {
		const formData = await request.formData();
		const body = Object.fromEntries(formData);
		body.uploadedUser = locals.pb.authStore.record?.id;

		try {
			await locals.pb.collection('images').create(body);
		} catch (err) {
			console.log(err);
			throw error(400, 'Something went wrong uploading your image');
		}

		redirect(303, '/');
	}
};
