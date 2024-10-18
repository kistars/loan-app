
export function Detail({ className, title, img, name }) {
    return <div className={`
     uk-card uk-card-small
     uk-radius-medium uk-radius-large@m uk-box-shadow-xsmall 
     bg-white w-[240px] h-[280px] ${className}`}>
        <span className="uk-h3 uk-h2@m uk-text-gradient">
            {title}
        </span>
        <img
            className="my-6"
            width={48}
            src={img} />
        <div>
            <h3 className="uk-h5 uk-h4@m">{name} Amount:</h3>
            <p className="uk-text-muted mt-4">{'$....'}</p>
        </div>
    </div>
}