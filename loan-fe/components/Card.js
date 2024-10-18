import cn from 'classnames'
export function Card({ className }) {
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
                    <a className="uk-link-reset" href="#">
                        Balance: $1000
                    </a>
                </h2>
                <span className="uk-text-meta">
                    Created By @c2e
                </span>
            </div>
        </div>
    </div>
}