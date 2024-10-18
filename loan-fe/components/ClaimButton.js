import { PiAirplaneInFlight } from "react-icons/pi";
import cn from 'classnames'
export function ClaimButton({ className, onClick }) {
    return <div className={cn(className)}>
        <button
            className="uk-button uk-button-large
             uk-button-large@m uk-button-gradient"
            onClick={onClick}
        >
            <span>Mint Token</span>
            <i>
                <PiAirplaneInFlight />
            </i>
        </button>
    </div>
}