export default function Base({children}){
    return (
        <div className="flex flex-col w-full h-full absolute">
            {children}
        </div>
    );
}