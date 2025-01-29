"use server";

import ReceiptsList from '@/components/ReceiptsList/ReceiptsList';
import ReceiptService from '@/services/receipt.service';

const CONST_PAGE_SIZE = 3;

const fetchReceipts = async (page: number = 1, pageSize: number = 10, filters: any = {}) => {
    const receiptService = new ReceiptService();

    const params = {
        pagination: {
            pageSize,
            page,
        },
        filters: {
            ...filters,
        },
        populate: "products",
    };

    const response = await receiptService.get(params);

    const formattedReceipts = response.data.map((item: any) => {
        const formattedProducts = (item.products || []).slice(0, 4).map((product: any) => ({
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
        };
    });

    return formattedReceipts;
};

const ReceiptsPage = async ({ searchParams }: { searchParams: { page?: string, filter?: string } }) => {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const filter = searchParams.filter || '';

    // assuming filters might be passed as query params, e.g., 'date=2025-01-01'
    const filters = filter ? { filter } : {};

    const receipts = await fetchReceipts(page, CONST_PAGE_SIZE, filters); // default page size is 3

    return (
        <>
            <ReceiptsList receipts={receipts} currentPage={page} />
        </>
    );
}

export default ReceiptsPage;