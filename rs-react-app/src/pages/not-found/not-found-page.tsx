import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-4xl font-bold text-red-600">
        404 - Страница не найдена
      </h2>
      <p className="text-lg mt-2">Такой страницы не существует!</p>
      <Link to="/" className="text-blue-500 mt-4 block">
        Вернуться на главную
      </Link>
    </div>
  );
};
