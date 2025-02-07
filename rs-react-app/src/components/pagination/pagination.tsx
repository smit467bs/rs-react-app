import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
                             currentPage,
                             totalPages,
                             onPageChange,
                           }: Props) => {
  return (
    <div className="flex items-center justify-center mt-6 space-x-4">
      <button
        className={`px-4 py-2 border rounded-lg ${
          currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-600'
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      <button
        className={`px-4 py-2 border rounded-lg ${
          currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-600'
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперёд
      </button>
    </div>
  );
};
