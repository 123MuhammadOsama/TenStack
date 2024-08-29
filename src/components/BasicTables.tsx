'use client'
import {DateTime} from 'luxon';

import React, { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import mData from '../Mock_Data.json'
import { info } from 'console';

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
        accessorFn: row => `${row.first_name} ${row.last_name}`,
      },
      // {
      //   header: 'First Name',
      //   accessorKey: 'first_name',
      //   footer: 'First Name',
      // },
      // {
      //   header: 'Last Name',
      //   accessorKey: 'last_name',
      //   footer: 'Last Name',
      // },
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
          DateTime.fromISO(info.getValue()).toLocaleString(DateTime.Date_MED),
      },
      
    ],   
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
      </div>
    </div>
  )
}
