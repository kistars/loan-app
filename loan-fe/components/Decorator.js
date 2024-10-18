import { Star } from './Star';
export function Decorator() {
    return <div
        className="
        flex flex-col top-0 
        left-0 w-full h-full 
        overflow-hidden min-w-[1200px]
        "
    >
        <Star
            width={48}
            top={'4%'}
            left={'92%'}
        />
        <Star
            width={32}
            top={'72%'}
            left={'86%'}
        />
        <Star
            width={32}
            top={'32%'}
            left={'95%'}
        />
        <Star
            top={'55%'}
            left={'45%'}
            width={42}
        />
    </div>
}