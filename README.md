# PhotoCloud

PhotoCloud is a modern, lightweight application built using **SvelteKit** and **PocketBase**. It allows users to upload, manage, and search for images. Users can also update their profiles, view their uploaded images, and manage their account with ease.

## Features

- **User Authentication**

  - Register and log in with a secure and seamless flow.
  - Update profile information.

- **Image Management**

  - Upload images to the platform.
  - View your uploaded images in a user-friendly interface.
  - Search for images based on various filters or keywords.
  - Update and delete your uploaded images.

- **Search Capabilities**
  - Find images using keywords and filters to locate your favorite content quickly.
- **Modern UI**
  - Clean and responsive design with **TailwindCSS** and **DaisyUI** component library.

## Tech Stack

- **SvelteKit**: The framework used for building the frontend with modern, reactive components.
- **PocketBase**: A lightweight backend database solution for handling authentication, data storage, and real-time updates.
- **TailwindCSS**: A utility-first CSS framework for building fast and responsive designs.
- **DaisyUI**: A TailwindCSS-based component library for pre-designed and customizable UI components.

## Installation

To set up PhotoCloud on your local machine, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Bun](https://bun.sh/)
- #### For Makefile : [MinGW](https://www.mingw-w64.org/downloads/#winlibscom)

### Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/SleepyMiner/ImageServer.git
   cd ImageServer
   bun install
   ```
2. Start the Pocketbase Server (Backend):
   ```bash
   make server
   ```
   > The Server will start at port - 8090.
3. Start the UI (Frontend):
   ```bash
   bun dev
   ```
   > The Svelte application will start at port - 5173

### Contribution Guidelines

#### We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a clear description of the changes.

### License

This project is licensed under the MIT License.

### Acknowledgments

- [SvelteKit Documentation](https://svelte.dev/docs/kit/introduction)
- [PocketBase Documentation](https://pocketbase.io/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs/)
- [DaisyUI Documentation](https://daisyui.com/docs/)
