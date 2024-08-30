'use client'
import {DateTime} from 'luxon';

import React, { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import mData from '../Mock_Data.json'


export default function BasicTables() {
  const data = useMemo(() => mData, [])

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        footer: 'ID',
      },
      {
        header: 'Name',
        accessorFn: (row: { first_name: any; last_name: any; }) => `${row.first_name} ${row.last_name}`,
      },
      
      {
        header: 'Email',
        accessorKey: 'email',
        footer: 'Email',
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        footer: 'Gender',
      },
      
      {
        header: 'Date of Birth',
        accessorKey: 'dob', 
        footer: 'Date of Birth',
        cell: (info: { getValue: () => any; }) =>
          DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
      },
      
    ],   
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="text-left p-4 font-semibold text-gray-600 uppercase"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="p-4 text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          
        </table>
        <div className="flex items-center justify-center">
  
  
  
  {Array.from({ length: table.getPageCount() }, (_, index) => (
    <button 
      key={index} 
      className={`mx-2 py-2 px-4 rounded font-bold ${table.getState().pagination.pageIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`} 
      onClick={() => table.setPageIndex(index)}
    >
      {index + 1}
    </button>
  ))}
  
  
</div>

      </div>
    </div>
  )
}
