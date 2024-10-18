import cn from 'classnames';
export function Button({ onClick, className, text, disabled }) {
    return <div
        onClick={(v) => {
            if (disabled) return
            onClick(v)
        }}
        className={cn("card h-18 w-40", disabled ? 'disabled' : '', className)}
    >
        <h5 className={cn(disabled ? "text-gray-300" : "text-black-500", 'font-bold')}>{text}</h5>
    </div >
}