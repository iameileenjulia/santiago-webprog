import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';
import ejsLogo from '../../assets/EJS-logo.png';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsLoading(true);
      try {
        const { data } = await loginUser({ email, password });
        console.log('Login successful:', data);

        if (data.type === 'viewer') {
          setError('Viewers are not allowed to log in.');
          return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('type', data.type);

        navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } });
      } catch (err) {
        console.error('Login failed:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <img src={ejsLogo} alt="EJS Logo" className="h-16 w-16 object-contain" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Welcome Back
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Sign in to access your account and explore the future of construction.
        </p>
      </div>

      {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="signin-email" className="block text-sm font-medium text-zinc-700">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="signin-password" className="block text-sm font-medium text-zinc-700">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 pr-10 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-zinc-500 transition hover:text-zinc-900"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 accent-emerald-600"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => alert('Password reset link would be sent (demo)')}
            className="font-medium text-emerald-600 transition hover:text-emerald-700"
          >
            Forgot Password?
          </button>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full rounded-xl py-3 text-[11px] tracking-[0.2em] !bg-emerald-600 !border-emerald-600 hover:!bg-emerald-500"
          loading={isLoading}
        >
          Sign In
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-zinc-500">Or continue with</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className="rounded-xl py-3 text-[11px] tracking-[0.2em]"
            onClick={() => console.log('Google sign in demo')}
          >
            <span className="mr-2">G</span> Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="rounded-xl py-3 text-[11px] tracking-[0.2em]"
            onClick={() => console.log('Apple sign in demo')}
          >
            <span className="mr-2">🍎</span> Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-600">
        Don't have an account?{' '}
        <Link to="/auth/signup" className="font-semibold text-emerald-600 transition hover:text-emerald-700">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;