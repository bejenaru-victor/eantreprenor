import * as React from 'react';
import { DataGrid, roRO } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GroupTableStyle } from '@/components/inc/styles/ModelTable';


const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    roRO,
  );

export default function GroupTable({ columns, rows, clickHandler }) {
    return <>
      <div style={{ height: 'auto', width: '100%' }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          sx={GroupTableStyle}
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick={true}
          onRowClick={clickHandler}
          initialState={{
          pagination: {
              paginationModel: { page: 0, pageSize: 10 },
          },
          }}
          pageSizeOptions={[5, 10, 15]}
        />
      </ThemeProvider>
      </div>
  </>
}