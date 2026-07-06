import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: Non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <p className="eyebrow text-gold mb-6">Error · 404</p>
        <h1 className="editorial-heading text-5xl sm:text-6xl mb-5">
          A <span className="editorial-italic text-gold">quiet</span> nowhere.
        </h1>
        <p className="font-light text-muted-foreground leading-relaxed mb-8">
          The page you were looking for isn't here. Perhaps it was never written, or perhaps it's
          resting.
        </p>
        <Link to="/" className="btn-editorial inline-block">
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
