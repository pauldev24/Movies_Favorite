
export function ErrorForm({ error }) {

    return (
        <p className="px-4 text-red-500 text-md pt-2">{error}</p>
    )
}

export function SuccessForm({ success }) {
    return (
        <div className='bg-green-900 w-full rounded-lg flex items-center py-3'>
            <p className="px-4 text-slate-200 text-sm font-normal">
                {success}
            </p>
        </div>
    )
}

export function ErrorRequest({ errors }) {
    return (
        errors.map((error, index) => (
            <div key={index} className='bg-red-900 w-full rounded-lg flex items-center py-3'>
                <p className="px-4 text-slate-200 text-sm font-normal">
                    {error}
                </p>
            </div>
        ))
    )
}
