import ErrorPage from '../../_common/error';

export default function NotFoundPage() {
  return (
    <ErrorPage
      code={404}
      title='Không tồn tại'
      details='Trang yêu cầu không tồn tại'
    />
  );
}
