export const POCKETBASE_URL: string = 'http://127.0.0.1:8090';

export const serializeNonPOJOs = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};

export const getImageURL = (
	collectionId: string,
	recordId: string,
	fileName: string,
	size = '0x0'
) => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};
