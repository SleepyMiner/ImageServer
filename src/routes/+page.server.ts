export const load = async ({ locals, url }) => {
  const searchQuery = url.searchParams.get('imageTitle'); // Search query for filtering images
  const currentUser = locals.user?.id; // Currently logged-in user

  locals.pb.autoCancellation(false); // Prevent auto-cancellation of requests

  // Fetch images based on search query
  const images = await locals.pb.collection('images').getFullList({
    filter: searchQuery ? `Title~"${searchQuery}"` : ''
  });

  const userCache = new Map(); // Cache to avoid redundant user fetches

  // Process images with user details
  const imagesWithUserDetails = await Promise.all(
    images.map(async (image) => {
      const { uploadedUser } = image;

      // Check if the user's details are already in the cache
      if (!userCache.has(uploadedUser)) {
        try {
          // Fetch user details and add to the cache
          const user = await locals.pb.collection('users').getOne(uploadedUser);

          userCache.set(uploadedUser, {
            name: user.name,
            avatar:
              user.avatar !== ''
                ? locals.pb.files.getURL(user, user.avatar) // Get user avatar URL
                : `https://ui-avatars.com/api/?name=${user.name}` // Default avatar if none
          });
        } catch (error) {
          console.error(`Failed to fetch user with ID ${uploadedUser}:`, error);
          userCache.set(uploadedUser, {
            name: 'Unknown User',
            avatar: '/default-avatar.png' // Default avatar for failed fetch
          });
        }
      }

      const userDetails = userCache.get(uploadedUser);

      return {
        ...image,
        name: userDetails.name, // Add user name
        avatar: userDetails.avatar, // Add user avatar
        isOwner: currentUser === uploadedUser // Check if the current user owns the image
      };
    })
  );

  // Return the processed images along with the current user details
  return {
    images: imagesWithUserDetails, // Images with user details
    currentUser // Current user ID
  };
};
