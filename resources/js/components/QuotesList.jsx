import ReactTimeAgo from 'react-time-ago'

function QuotesList({ quotes }) {
    // convert string-date to date
    function buildDate(date) {
        return Date.parse(date)
    }
    return (
        <div className="py-4">
            {/* Quotes */}
            <div className="grid grid-cols-5 gap-2">
                {
                    quotes.length > 0 &&
                    quotes.map((quote) => (
                        <div key={quote.id} className=" w-full rounded-md px-2 pt-3 pb-5 border border-gray-200 text-gray-700 relative">
                            {/* ID */}
                            <p className="font-semibold text-indigo-500">#{quote.id}</p>
                            {/* Body */}
                            <p className="text-sm my-2">{quote.body}</p>
                            {/* Author */}
                            <div className="flex flex-col border-t pt-2 border-gray-100 mb-4">
                                <span className="font-semibold">{quote.user_name}</span>
                                <span className="text-xs text-gray-500">{quote.user_email}</span>
                            </div>
                            {/* Created */}
                            <div className="pt-2 text-xs absolute bottom-1">
                                <span>
                                    Created
                                </span>
                                <span className="text-yellow-600 pl-1">
                                    <ReactTimeAgo date={buildDate(quote.created_at)} />
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default QuotesList