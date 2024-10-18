'use client'
import { useRef, useState } from 'react';
import Input from './Input';
import Button from '@mui/material/Button';
import { isNumber } from '@mui/x-data-grid/internals';
import { Close } from './Close';
export function Operation({ setShowOperation, show }) {
    const [num, setNum] = useState(0);
    const numRef = useRef();
    const setNumber = (value) => {
        isNumber(Number(value)) &&
            setNum(Number(value))
    }
    return <div className="new-loader-wrapper" style={{ display: show ? '' : 'none' }}>
        <div className="modal h-40 flex justify-center w-40 relative">
            <button className="btn-close absolute right-1 top-1" onClick={() => setShowOperation(false)}>
                <Close />
            </button>
            <div className='flex flex-col justify-center'>
                <div className='my-2'>
                    $ {num || 0}
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
                            console.log(num)
                        }}
                    >
                        confirm
                    </Button>
                </div>
            </div>
        </div>
    </div>
}