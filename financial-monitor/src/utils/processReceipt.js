
export const processReceipt = (data) => {
    const products = [];
    const quantities = [];
    const prices = [];
    let totalPrice = null;
    let date = null;
    let time = null;
    let dateTime = null; 
  
    console.log("Data array:", data);
  
    // Extract products, quantities, and prices
    for (let i = 0; i < data.length; i += 3) {
      const product = data[i];
      const quantityPrice = data[i + 1];
  
      const quantityMatch = /(\d+\.\d+)\s+x\s+(\d+\.\d+)/.exec(quantityPrice);
      if (quantityMatch) {
        const quantity = quantityMatch[1];
        const price = quantityMatch[2];
  
        products.push(product);
        quantities.push(quantity);
        prices.push(price);
      }
    }
  
    // Extract total price
    const totalIndex = data.indexOf('TOTAL');
    if (totalIndex !== -1) {
      totalPrice = data[totalIndex + 1];
    }
  
    // Extract date and time from the strings containing 'DATA' and 'ORA'
    const dateIndex = data.findIndex(item => item.trim().toLowerCase().includes('data'));
    if (dateIndex !== -1) {
      date = data[dateIndex].split(' ')[1]; // Extract the date part after 'DATA'
    }
  
    const timeIndex = data.findIndex(item => item.trim().toLowerCase().includes('ora'));
    if (timeIndex !== -1) {
      time = data[timeIndex].split(' ')[1]; // Extract the time part after 'ORA'
    }
  
    // Combine the date and time strings to create a valid Date string
    if (date && time) {
      const dateTimeString = `${date} ${time}`;
      
      // Convert the dateTimeString to a Date object
      // Reformat the date string to match the expected format for JavaScript Date constructor
      const [day, month, year] = date.split('.');
      const formattedDate = `${year}-${month}-${day}T${time}`;
  
      dateTime = new Date(formattedDate); 
    }
  
    return {
      products,
      quantities,
      prices,
      totalPrice,
      dateTime, 
    };
};  