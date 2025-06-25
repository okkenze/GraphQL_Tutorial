export const config = {
  server: 'DESKTOP-BTGHVFF', // or 'localhost\\SQLEXPRESS'
  database: 'GraphQL',
  driver: 'msnodesqlv8',
  //driver:'SQL Server Native Client 11.0',
  options: {
    trustedConnection: true, // Use Windows Authentication
    encrypt: false, // Disable encryption for local development  
    trustservercertificate:false
  },
   port: 1433 // Default SQL Server port
};