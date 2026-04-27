import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        {/* Left Panel - Branding */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 lg:flex lg:items-center lg:justify-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }} />
          </div>
          
          <div className="relative z-10 max-w-md text-center text-white">
            <div className="mb-8 flex justify-center">
              <img src="/src/assets/EJS-logo.png" alt="EJS Corp" className="h-24 w-24 object-contain brightness-0 invert" />
            </div>
            <h2 className="text-3xl font-bold">Building the Future Together</h2>
            <p className="mt-4 text-zinc-300">
              Join ArqTek in revolutionizing construction with smart technology, 
              sustainable solutions, and innovative engineering.
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <div className="h-1 w-8 rounded-full bg-emerald-500"></div>
              <div className="h-1 w-8 rounded-full bg-zinc-600"></div>
              <div className="h-1 w-8 rounded-full bg-zinc-600"></div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <main className="flex items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;