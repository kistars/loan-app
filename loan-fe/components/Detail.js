import { Tooltip } from "@mui/material";
import { ethers } from "ethers";

export function Detail({ className, title, img, name, tokenAmount = '0', addToken }) {
    return <div className={`
     uk-card uk-card-small
     uk-radius-medium uk-radius-large@m uk-box-shadow-xsmall 
     bg-white w-[240px] h-[280px] ${className} cursor-pointer`}
        onClick={addToken}
    >
        <span className="uk-h3 uk-h2@m uk-text-gradient">
            {title}
        </span>
        <img
            className="my-6"
            width={48}
            src={img} />
        <div>
            <h3 className="uk-h5 uk-h4@m">{name}</h3>
            <Tooltip title={tokenAmount} placement="bottom-start" >
                <p className="truncate uk-text-muted mt-4">${ethers.utils.formatEther(tokenAmount)}</p>
            </Tooltip>
        </div>
    </div>
}