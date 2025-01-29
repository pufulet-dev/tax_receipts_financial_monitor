"use server";
import ReceiptsList from '@/components/ReceiptsList/ReceiptsList';
import ReceiptService from '@/services/receipt.service';


const fetchReceipts = async () => {
    const receiptService = new ReceiptService();
    const response = await receiptService.get({
        populate: "products", 
    });
    const formattedReceipts = response.data.map((item: any) => {
        const formattedProducts = item.products.slice(0,4).map((product: any) => ({
            id: product.id, 
            name: product.name, 
            price: product.price,
            quantity: product.quantity,
        }));
        return {
            id: item.id, 
            date: item.date,
            total: item.total, 
            products: formattedProducts,
        }
    })
    return formattedReceipts;
}


const ReceiptsPage = async () => {

    const receipts = await fetchReceipts();

    return (
        <>
            <ReceiptsList receipts={receipts} />
        </>
    );
}

export default ReceiptsPage;