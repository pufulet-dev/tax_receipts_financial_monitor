class ReceiptService {

    async add (productData: any) {
        const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/receipts`;
        const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

        try {

            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Failed to add product: ${errorDetails.message || response.statusText}`);
            }

            return await response.json();
        } catch (error: any) {
            console.error('Error adding receipt:', error.message);
            throw new Error(`Error adding receipt: ${error.message}`);
        }
    }

    async get () {
        const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}api/receipts?populate=products`;
        const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

        try {

            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`,
                },
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Failed to add product: ${errorDetails.message || response.statusText}`);
            }
            return await response.json();

        } catch (error: any) {
            console.error('Error getting receipts:', error.message);
            throw new Error(`Error getting receipts: ${error.message}`);
        }
    }
}

export default ReceiptService;