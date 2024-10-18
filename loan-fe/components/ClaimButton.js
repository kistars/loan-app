import { PiAirplaneInFlight } from "react-icons/pi";
import cn from 'classnames'
export function ClaimButton({ className }) {
    return <div className={cn(className)}>
        <button
            className="uk-button uk-button-large
             uk-button-large@m uk-button-gradient"
        >
            <span>Mint Token</span>
            <i>
                <PiAirplaneInFlight />
            </i>
        </button>
    </div>
}