'use client'
import { DataGrid } from "@mui/x-data-grid"
import cn from 'classnames';

const columns = [{
  field: 'action',
  headerName: "Action",
  flex: 1,
  headerAlign: 'center',
  align: 'center',
  renderCell: ({ value }) => {
    const style = value === 'Deposit' ? 'text-green-500' : 'text-red-300'
    return <div className={cn(style, 'font-bold')}>{value}</div>
  }
}, {
  field: 'time',
  headerName: 'Time',
  flex: 1,
  headerAlign: 'center',
  align: 'center'
}, {
  field: 'amount',
  headerName: "Amount",
  flex: 1,
  headerAlign: 'center',
  align: 'center'
},];

const rows = [{
  time: "2021-09-01",
  amount: "1000",
  action: "Deposit"
}, {
  time: "2021-09-02",
  amount: "2000",
  action: "Loan"
}, {
  time: "2021-09-03",
  amount: "3000",
  action: "Deposit"
}, {
  time: "2021-09-04",
  amount: "4000",
  action: "Loan"
}, {
  time: "2021-09-05",
  amount: "5000",
  action: "Deposit"
}]
export default function History() {
  return <div className="w-full flex mt-20">
    <div className="mx-16 mr-10 w-[800px]">
      <DataGrid
        columns={columns}
        rows={rows.map((r, i) => ({ id: i, ...r }))}
      />
    </div>
    <div className="flex-1 flex justify-center align-center">
      <img src='/assets/images/cta.png' className="relative w-[300px] h-[400px]" />
    </div>
  </div>
}