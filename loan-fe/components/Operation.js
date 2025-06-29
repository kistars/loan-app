'use client'
import { useEffect, useRef, useState } from 'react';
import Input from './Input';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { Close } from './Close';
import { notifyError, notifySuccess, useLoanContext } from '@/context';
import { ethers } from 'ethers';

function Loading() {
    return <div className='w-full h-[160px] flex items-center justify-center'>
        <CircularProgress />
        <div className='mx-5'>
            Waiting...
        </div>
    </div>
}

export function Operation({ setShowOperation, show, operate, request }) {
    const [num, setNum] = useState('0');
    const numRef = useRef();
    const { loading } = useLoanContext()

    const setNumber = (value) => {
        if (!value) {
            setNum('0');
            return;
        }
        setNum(value)
    }
    useEffect(() => {
        const input = numRef.current.querySelector('input');
        const value = input.value;
        setNum(value);
    }, [show])

    return <div className="new-loader-wrapper" style={{ display: show ? '' : 'none' }}>
        <div className="modal h-40 flex justify-center w-40 relative">
            {loading ? <Loading /> :
                <>
                    <button className="btn-close absolute right-1 top-1" onClick={() => setShowOperation(false)}>
                        <Close />
                    </button>
                    <div className='flex flex-col justify-center w-full items-center'>
                        <div className='my-2 truncate'>
                            {operate} $ {num}
                        </div>
                        <div className='flex items-center'>
                            <div className='mr-5'>
                                <Input
                                    ref={numRef}
                                    onChange={setNumber}
                                />
                            </div>
                            <Button variant='contained'
                                onClick={() => {
                                    /**
                                     * 转化成ether单位
                                     */
                                    const eth = ethers.utils.parseEther(num);
                                    request(eth)
                                        .then(() => {
                                            notifySuccess("sucess");
                                            setShowOperation(false)
                                        })
                                }}
                            >
                                confirm
                            </Button>
                        </div>
                    </div>
                </>}
        </div>
    </div>
}