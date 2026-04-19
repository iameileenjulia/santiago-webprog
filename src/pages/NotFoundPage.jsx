import Button from "../components/Button";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-zinc-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-zinc-800 mb-2">Page Not Found</h2>
        <p className="text-zinc-600 mb-6">
          The link you followed may be broken or the page may have been removed.
        </p>
        <Button to="/">Back Home</Button>
      </div>
    </div>
  );
}

export default NotFoundPage;

