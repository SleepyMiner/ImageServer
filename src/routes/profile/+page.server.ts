import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	try {
		const userData = await locals.pb.collection('users').getOne(locals.pb.authStore.record?.id);
		return {
			userData: userData,
			message: 'success'
		};
	} catch (err) {
		return {
			message: 'error'
		};
	}
};

export const actions = {
	profile: async ({ locals, request }) => {
		const formData = await request.formData();
		const body = Object.fromEntries(formData);

		if (body.avatar != '') {
			try {
				const { name, avatar } = await locals.pb
					.collection('users')
					.update(locals.pb.authStore.record?.id, { avatar: body.avatar });

				locals.user.avatar = avatar;
				locals.user.name = name;
			} catch (err) {
				console.log(err);

				throw error(400, 'Something went wrong updating your profile');
			}
		}

		return {
			success: true
		};
	}
};
