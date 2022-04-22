import Footer from '../_common/footer';

function EmptyLayout({ children }) {
  return (
    <div>
      <div style={{ minHeight: '80vh' }}>{children}</div>
      <Footer />
    </div>
  );
}

export default EmptyLayout;
