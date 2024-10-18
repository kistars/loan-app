'use client'
import { Decorator } from "@/components/Decorator"
import { Card } from "@/components/Card"
import { ClaimButton } from '@/components/ClaimButton'
import { Detail } from '@/components/Detail'
import { Button } from "@/components/Button"
import { Operation } from "@/components/Operation"
import { useState } from "react"
import { useLoanContext, notifyError } from "@/context"
import { CTK, LTK } from "@/context/constants"


export default function Home() {
  const [showOperation, setShowOperation] = useState(false);
  const [operate, setOperate] = useState("deposit")
  const {
    deposit,
    loan,
    faucet, lTokenBalance,
    cTokenBalance,
    lTokenAmount,
    cTokenAmount,
    repay,
    setLoading,
    addToken
  } = useLoanContext();

  const banLoan = cTokenAmount === '0'
  const banRepay = lTokenAmount === '0'
  return <div
    className="absolute left-0 w-full 
     overflow-hidden"
    style={{ height: "calc(100% - 100px)" }}
  >
    <div className="w-full absolute flex flex-1 left-[4%] min-w-[1000px]">
      <Operation show={showOperation} setShowOperation={setShowOperation} operate={operate}
        request={(num) => {
          switch (operate) {
            case 'deposit':
              return deposit(num);
            case 'loan':
              return loan(num)
            case 'repay':
              if (BigInt(lTokenAmount) < BigInt(num)) {
                notifyError("偿还数量需要小于借贷数量")
              }
              return repay(num);
            default:
              return;
          }
        }} />
      <div className='flex flex-col top-[8%] relative mx-8'>
        <Card className={'w-[280px] h-[300px]'} lTokenBalance={lTokenBalance} cTokenBalance={cTokenBalance} />
        <div className="uk-panel uk-text-center mt-36">
          <h2 className="uk-h3 uk-h1@m">领取测试代币</h2>
        </div>
        <ClaimButton className='mt-10' onClick={faucet} />
      </div>

      <Detail
        className='mx-20 mt-28'
        title={'LENDING'}
        img={'/assets/images/objects/bitcoin-01.png'}
        name='Lending Token'
        tokenAmount={lTokenAmount}
        addToken={()=>{
          addToken(LTK)
        }}
      />

      <Detail
        className='mx-16 mt-52'
        title={'COLLATERAL'}
        img={'/assets/images/objects/ethereum-01.png'}
        name='Collateral Token'
        tokenAmount={cTokenAmount}
        addToken={()=>{
          addToken(CTK)
        }}
      />
      <div className="absolute left-[830px] text-red-500 font-bold">
        {banLoan ? '质押需大于借贷价值的1.5倍' : ''}
      </div>
      <div className="flex absolute left-[700px] top-14">
        <Button
          text='Repay'
          onClick={() => {
            setOperate('repay')
            setShowOperation(true)
            setLoading(false)
          }}
          disabled={banRepay} />
        <Button
          text='Loan'
          className={'mx-4'}
          onClick={() => {
            setOperate('loan')
            setShowOperation(true);
            setLoading(false)
          }}
          disabled={banLoan} />
        <Button
          text='Deposit'
          onClick={() => {
            setOperate('deposit')
            setShowOperation(true)
            setLoading(false)
          }} />
      </div>
    </div>
    <Decorator />
  </div>
}