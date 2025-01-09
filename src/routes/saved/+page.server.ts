import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  console.log('Is user authenticated:', locals.pb.authStore.isValid);
  console.log('User ID:', locals.pb.authStore.record?.id);

  // Ensure user is authenticated
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login');
  }

  try {
    // Fetch saved items for the authenticated user
    const savedItems = await locals.pb.collection('saved').getFullList({
      filter: `user = "${locals.pb.authStore.record?.id}"`,
    });

    console.log('Fetched saved items:', savedItems); // Log the fetched items

    return {
      savedItems,
      message: 'success',
    };
  } catch (err) {
    console.error('Error fetching saved items:', err); // Log the error if any
    return {
      message: 'error',
      savedItems: [],
    };
  }
};


export const actions = {
  delete: async ({ locals, request }) => {
    const formData = await request.formData();
    const savedId = formData.get('id');

    try {
      await locals.pb.collection('saved').delete(savedId);

      return {
        success: true
      };
    } catch (err) {
      throw error(400, 'Something went wrong while deleting the saved item');
    }
  }
};
