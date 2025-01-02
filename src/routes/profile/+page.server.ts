import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	try {
		const userData = await locals.pb.collection('users').getOne(locals.pb.authStore.record?.id);
		return {
			userData: userData
		};
	} catch (err) {
		return {
			error: err
		};
	}
};

export const actions = {
	profile: async ({ locals, request }) => {
		const formData = await request.formData();
		const body = Object.fromEntries(formData);
		console.log(body);

		try {
			await locals.pb
				.collection('users')
				.update(locals.pb.authStore.record?.id, { avatar: body.avatar });
		} catch (err) {
			console.log(err);
			return {
				error: err
			};
		}
		redirect(303, '/profile');
	}
};
