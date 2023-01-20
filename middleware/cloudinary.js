import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: "pratikcloudinarycloudstorage",
    api_key: "447959673719883",
    api_secret: "rCVxO7NB1GvogcC-_YjymRkQYWc",
});

export const cloudinaryUploadImage = async (fileToUpload) => {
	try {
		const data = await cloudinary.uploader.upload(fileToUpload, {
			resource_type: 'auto',
		});
		return {
			url: data?.secure_url,
		};
	} catch (error) {
        console.log(error);
		return error;
	}
};
