export function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Usage
  const currentDate = new Date();
  const formattedDate = formatDateToYYYYMMDD(currentDate);
  // ////console.log(formattedDate); // Outputs: '2024-05-16' (or the current date in the desired format)
  