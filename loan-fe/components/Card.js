import cn from 'classnames'
import Tooltip from '@mui/material/Tooltip'
import { ethers } from 'ethers'
export function Card({ className, lTokenBalance = '0', cTokenBalance = '0' }) {
    return <div className={cn(className)}>
        <div
            className="uk-card uk-card-xsmall uk-text-center 
            uk-overflow-hidden uk-radius-medium uk-radius-large@m 
            uk-box-shadow-large bg-white"
        >
            <img
                src={'/assets/images/users/01.png'}
            />
            <div>
                <h2 className="uk-h6 mt-4">
                    <div>
                        Balance:
                    </div>
                </h2>
                <Tooltip title={lTokenBalance}>
                    <div className='truncate'>
                        LTK: ${lTokenBalance}
                    </div>
                </Tooltip>
                <Tooltip title={cTokenBalance}>
                    <div className='truncate'>
                        CTK: ${cTokenBalance}
                    </div>
                </Tooltip>
                <div>
                    <span className="uk-text-meta">
                        Created By @c2e
                    </span>
                </div>
            </div>
        </div>
    </div>
}