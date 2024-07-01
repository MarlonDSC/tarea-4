const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const excel = require('excel4node');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function backupDatabase() {
  await client.connect();
  const res = await client.query('SELECT * FROM tu_tabla');
  const wb = new excel.Workbook();
  const ws = wb.addWorksheet('Backup');

  // Escribir datos en el archivo .xlsx
  res.rows.forEach((row, index) => {
    Object.values(row).forEach((value, colIndex) => {
      ws.cell(index + 1, colIndex + 1).string(value.toString());
    });
  });

  const filePath = path.join('/path/to/backup/folder', 'backup.xlsx');
  wb.write(filePath, async (err) => {
    if (err) throw err;
    await client.query('INSERT INTO backups (file_path, created_at) VALUES ($1, NOW())', [filePath]);
    await client.end();
  });
}

backupDatabase().catch(err => console.error(err));