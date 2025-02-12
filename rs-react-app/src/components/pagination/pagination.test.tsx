import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the pagination component correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Вперёд')).toBeInTheDocument();
  });

  it('disables the "Назад" button on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const backButton = screen.getByText('Назад');
    expect(backButton).toBeDisabled();
  });

  it('disables the "Вперёд" button on the last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const forwardButton = screen.getByText('Вперёд');
    expect(forwardButton).toBeDisabled();
  });

  it('calls onPageChange with the correct page number when clicking "Назад"', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const backButton = screen.getByText('Назад');
    fireEvent.click(backButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with the correct page number when clicking "Вперёд"', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const forwardButton = screen.getByText('Вперёд');
    fireEvent.click(forwardButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('does not call onPageChange when "Назад" button is disabled', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const backButton = screen.getByText('Назад');
    fireEvent.click(backButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when "Вперёд" button is disabled', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const forwardButton = screen.getByText('Вперёд');
    fireEvent.click(forwardButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
