<script lang="ts">
  import { writable } from 'svelte/store';
  import { POCKETBASE_URL } from '$lib/utils';

  let { data, currentUser } = $props();

  // Initialize `isSaved` and `showMenu` states for each image
  data.images = data.images.map((image) => ({
    ...image,
    showMenu: false,  // Initialize the dropdown menu state
    isSaved: false,  // Initialize the saved state
  }));

  // State for success message
  let successMessage = writable('');
  let loading = writable(false);

  // Function to toggle the saved state (heart icon)
  const toggleSave = (imageId: string) => {
    data.images = data.images.map((img) => {
      if (img.id === imageId) {
        return { ...img, isSaved: !img.isSaved };
      }
      return img;
    });
  };

  // Function to toggle the menu visibility
  const toggleMenu = (imageId: string) => {
    data.images = data.images.map((img) => ({
      ...img,
      showMenu: img.id === imageId ? !img.showMenu : false, // Toggle the specific menu and close others
    }));
  };

  // Function to delete an image
  const deleteImage = async (imageId: string) => {
    loading.set(true);
    try {
      // Replace with your API request to delete the image
      await fetch(`${POCKETBASE_URL}/api/files/${imageId}`, {
        method: 'DELETE',
      });
      data.images = data.images.filter((img) => img.id !== imageId);
      successMessage.set('Image deleted successfully!');
      setTimeout(() => {
        successMessage.set(''); // Hide the success message after a few seconds
      }, 3000);
    } catch (error) {
      successMessage.set('Failed to delete image.');
      console.error('Delete Error:', error);
    } finally {
      loading.set(false);
    }
  };

  // Function to update an image (for now, just a simple log for illustration)
  const updateImage = (imageId: string) => {
    console.log('Update image with ID:', imageId);
    successMessage.set('Image update triggered (this can open a modal)');
    setTimeout(() => {
      successMessage.set(''); // Hide the success message after a few seconds
    }, 3000);
  };
</script>

<svelte:head>
  <title>PhotoCloud</title>
</svelte:head>

<main>
  <!-- Success message -->
  {#if $successMessage}
    <div class="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
      {$successMessage}
    </div>
  {/if}

  <div class="card-container mt-10 flex flex-wrap justify-center gap-4">
    {#if data.images}
      {#each data.images as image}
        <div class="card max-w-80 bg-base-300 p-4 shadow-xl relative" id={image.id}>
          <figure>
            <img
              src={`${POCKETBASE_URL}/api/files/${image.collectionId}/${image.id}/${image.image}?thumb=100x0`}
              alt={image.Title}
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{image.Title}</h2>
            <p>{image.Description}</p>
            <div class="flex items-center gap-4">
              <figure>
                <img src={image.avatar} alt="Uploading User" class="size-8 rounded-full" />
              </figure>
              <p>{image.name}</p>

              <!-- Heart Icon for saving the image -->
              <button
                class="text-red-500 hover:text-red-700"
                onclick={() => toggleSave(image.id)}
              >
                {#if image.isSaved}
                  <!-- Filled Heart Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ee1111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                {:else}
                  <!-- Empty Heart Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="40" viewBox="2 0 24 24" fill="none" stroke="#ee1111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                {/if}
              </button>

              <!-- Dropdown menu for the owner -->
              {#if image.isOwner}
                <div class="absolute bottom-12 right-4">
                  <button
                    class="p-2 rounded-full text-gray-500 focus:outline-none"
                    onclick={() => toggleMenu(image.id)}
                  >
                    <!-- Lucid Ellipsis Vertical Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical">
                      <circle cx="12" cy="12" r="1"/>
                      <circle cx="12" cy="5" r="1"/>
                      <circle cx="12" cy="19" r="1"/>
                    </svg>
                  </button>

                  {#if image.showMenu}
                    <!-- Menu dropdown content -->
                    <div class="bg-white shadow-lg rounded-md p-3 mt-2">
                      <ul>
                        <li><button onclick={() => updateImage(image.id)}>Update</button></li>
                        <li><button onclick={() => deleteImage(image.id)}>Delete</button></li>
                      </ul>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <h1 class="text-center text-2xl">No images found!</h1>
    {/if}
  </div>
</main>
