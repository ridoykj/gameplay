import React from 'react';
import type { ResponseData } from '../../../../../../types';

interface ResponseMessageProps {
    response: ResponseData | null;
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({ response }) => {
    if (!response) {
        // Reserve space to prevent layout shifts
        return <div className="min-h-[3.25rem] mb-4"></div>;
    }

    const baseClasses = 'p-3 mb-4 rounded-md font-medium text-center border';
    const successClasses = 'bg-green-100 border-green-300 text-green-800';
    const errorClasses = 'bg-red-100 border-red-200 text-red-800';

    const messageClasses = `${baseClasses} ${response.isError ? errorClasses : successClasses}`;

    return (
        <div className={messageClasses} role="alert">
            {response.message}
        </div>
    );
};

export default ResponseMessage;