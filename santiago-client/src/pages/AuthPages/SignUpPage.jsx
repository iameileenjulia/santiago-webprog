import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../assets/context/AuthContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthText = (score) => {
    if (score === 0) return '';
    if (score === 1) return 'Weak';
    if (score === 2) return 'Medium';
    return 'Strong';
  };

  const strengthColor = (score) => {
    if (score === 1) return 'bg-red-500';
    if (score === 2) return 'bg-yellow-500';
    if (score >= 3) return 'bg-emerald-600';
    return 'bg-zinc-200';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsLoading(true);
      try {
        await signUp(formData.firstName, formData.lastName, formData.email, formData.password);
        navigate('/');
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const strength = getPasswordStrength(formData.password);
  const strengthLabel = strengthText(strength);
  const barColor = strengthColor(strength);

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <img src="/src/assets/EJS-logo.png" alt="EJS Logo" className="h-16 w-16 object-contain" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Create an Account
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Join ArqTek and be part of the future of construction innovation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              placeholder="John"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-zinc-700">
            Email Address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="hello@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-zinc-700">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a secure password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
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
          
          {formData.password && (
            <div className="mt-2">
              <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
                <div className={`transition-all duration-200 ${barColor}`} style={{ width: `${(strength / 3) * 100}%` }} />
              </div>
              <p className="mt-1 text-xs font-medium text-zinc-600">
                Password strength: <span className={`capitalize ${strength === 1 ? 'text-red-600' : strength === 2 ? 'text-yellow-600' : strength === 3 ? 'text-emerald-600' : ''}`}>{strengthLabel}</span>
              </p>
              <p className="mt-1 text-xs text-zinc-500">Use 8+ characters with letters, numbers, and symbols.</p>
            </div>
          )}
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-zinc-700">
            Confirm Password
          </label>
          <div className="relative mt-2">
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 pr-10 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-zinc-500 transition hover:text-zinc-900"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="terms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-zinc-300 accent-emerald-600"
          />
          <label htmlFor="terms" className="text-sm text-zinc-600">
            I agree to the{' '}
            <button type="button" className="text-emerald-600 hover:text-emerald-700">Terms of Service</button>
            {' '}and{' '}
            <button type="button" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</button>
          </label>
        </div>
        {errors.acceptTerms && <p className="mt-1 text-xs text-red-600">{errors.acceptTerms}</p>}

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full rounded-xl py-3 text-[11px] tracking-[0.2em] !bg-emerald-600 !border-emerald-600 hover:!bg-emerald-500"
          loading={isLoading}
        >
          Create Account
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-zinc-500">Or sign up with</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className="rounded-xl py-3 text-[11px] tracking-[0.2em]"
            onClick={() => console.log('Sign up with Google demo')}
          >
            <span className="mr-2">G</span> Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="rounded-xl py-3 text-[11px] tracking-[0.2em]"
            onClick={() => console.log('Sign up with Apple demo')}
          >
            <span className="mr-2">🍎</span> Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-emerald-600 transition hover:text-emerald-700">
          Sign in instead
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;