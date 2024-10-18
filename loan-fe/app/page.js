'use client'
import { Decorator } from "@/components/Decorator"
import { Card } from "@/components/Card"
import { ClaimButton } from '@/components/ClaimButton'
import { Detail } from '@/components/Detail'
import { Button } from "@/components/Button"
import { Operation } from "@/components/Operation"
import { useState } from "react"
import { useLoanContext } from "@/context"

export default function Home() {
  const [showOperation, setShowOperation] = useState(false);
  const { address } = useLoanContext();
  return <div
    className="absolute left-0 w-full 
     overflow-hidden"
    style={{ height: "calc(100% - 100px)" }}
  >
    <div className="w-full absolute flex flex-1 left-[4%] min-w-[1000px]">
      <Operation show={showOperation} setShowOperation={setShowOperation} />
      <div className='flex flex-col top-[8%] relative mx-8'>
        <Card className={'w-[280px] h-[300px]'} />
        <div className="uk-panel uk-text-center mt-24">
          <h2 className="uk-h3 uk-h1@m">领取测试代币</h2>
        </div>
        <ClaimButton className='mt-14' />
      </div>

      <Detail
        className='mx-20 mt-28'
        title={'Loaned'}
        img={'/assets/images/objects/bitcoin-01.png'}
        name='BTC'
      />

      <Detail
        className='mx-16 mt-52'
        title={'Deposited'}
        img={'/assets/images/objects/ethereum-01.png'}
        name='ETH'
      />
      <div className="absolute left-[830px] text-red-500 font-bold">
        {'质押需大于借贷价值的1.5倍'}
      </div>
      <div className="flex absolute left-[810px] top-14">
        <Button text='Loan' className={'mx-5'} onClick={() => setShowOperation(true)} disabled />
        <Button text='Deposit' onClick={() => {
          console.log(address, '🐷')
          // setShowOperation(true)
        }} />
      </div>
    </div>
    <Decorator />
  </div>
}