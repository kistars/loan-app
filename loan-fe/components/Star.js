export function Star({ top, left, width }) {
    return <img
        className="uni-animation-bounce"
        width={width}
        src="../assets/images/objects/star-01.svg"
        alt="object"
        style={{ position: 'relative', top, left }}
    />
}