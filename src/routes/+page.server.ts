export const load = async ({ locals, url }) => {
	const searchQuery = url.searchParams.get('imageTitle');

	locals.pb.autoCancellation(false);

	const images = await locals.pb.collection('images').getFullList({
		filter: searchQuery ? `Title~"${searchQuery}"` : ''
	});

	const userCache = new Map();

	const imagesWithUserDetails = await Promise.all(
		images.map(async (image) => {
			const { uploadedUser } = image;

			if (!userCache.has(uploadedUser)) {
				try {
					const user = await locals.pb.collection('users').getOne(uploadedUser);

					userCache.set(uploadedUser, {
						name: user.name,
						avatar:
							user.avatar !== ''
								? locals.pb.files.getURL(user, user.avatar)
								: `https://ui-avatars.com/api/?name=${user.name}`
					});
				} catch (error) {
					console.error(`Failed to fetch user with ID ${uploadedUser}:`, error);
					userCache.set(uploadedUser, {
						name: 'Unknown User',
						avatar: '/default-avatar.png'
					});
				}
			}

			const userDetails = userCache.get(uploadedUser);

			return {
				...image,
				name: userDetails.name,
				avatar: userDetails.avatar
			};
		})
	);

	return {
		images: imagesWithUserDetails
	};
};
