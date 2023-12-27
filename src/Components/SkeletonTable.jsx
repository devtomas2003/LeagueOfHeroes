export default function SkeletonTable(){
    return (
        <tr>
            <td className="border p-2">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-12 h-12 relative bg-gray-200 rounded-lg" />
                </div>
            </td>
            <td className="border p-2">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-32 h-32 relative bg-gray-200 rounded-lg" />
                </div>
            </td>
            <td className="border p-2">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-28 h-12 relative bg-gray-200 rounded-lg" />
                </div>
            </td>
            <td className="border p-2">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-28 h-12 relative bg-gray-200 rounded-lg" />
                </div>
            </td>
            <td className="border p-2">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-44 h-12 relative bg-gray-200 rounded-lg" />
                </div>
            </td>
        </tr>
    );
}