//export é para exportar o arquivo 
export function todayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }