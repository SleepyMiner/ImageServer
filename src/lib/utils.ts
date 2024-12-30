export const POCKETBASE_URL: string = 'http://127.0.0.1:8090';

export const serializeNonPOJOs = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};
