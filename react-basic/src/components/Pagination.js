import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Pagination = ({ totalPages }) => {
    const { pageId } = useParams();
    const currentPage = parseInt(pageId, 10);

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <Link to={`/page/${currentPage - 1}`}>
                    Previous
                </Link>
            )}
            {currentPage < totalPages && (
                <Link to={`/page/${currentPage + 1}`}>
                    Next
                </Link>
            )}
        </div>
    );
};

export default Pagination;
