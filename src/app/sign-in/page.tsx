'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginUser } from '@/store/slices/auth-slice';
import { AppDispatch, AppState } from '@/store/index';
import { SignInFormValues, signInSchema } from '@/validations/auth-form';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Img1 from '@/assets/signup.png';
import LogoSvg from '@/assets/svgs/logo';
import { Icons } from '@/data/svgs';
import { useState } from 'react';
import { toast } from 'sonner';

const SignInPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state: AppState) => state.auth);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const res = await dispatch(loginUser(values)).unwrap();
      router.push('/');
      toast.success("Sign In Successful", {
        description: res.message || "Welcome back! You've successfully signed in.",
        action: {
          label: "Go to Dashboard",
          onClick: () => router.push('/dashboard'),
        },
      });
    } catch (err) {
      toast.error("Sign In Failed", {
        description: "There was an error signing in. Please check your credentials and try again.",
        action: {
          label: "Retry",
          onClick: () => form.handleSubmit(onSubmit)(),
        },
      });
      console.error('Failed to sign in:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-fit justify-center items-center mx-auto md:h-screen bg-gradient-to-tr from-purple-900 via-violet-400 to-violet-900 text-white">
      <div className="m-auto bg-[#2b2738] rounded-none md:rounded-3xl p-8 flex flex-col-reverse gap-12 md:gap-6 md:flex-row max-w-6xl h-[80%] w-full shadow-2xl">
        <div className="w-full md:w-1/2 relative">
          <div className='relative w-full h-[20rem] md:h-full rounded-2xl overflow-hidden'>
            <Image
              src={Img1.src}
              alt="Desert landscape"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex justify-between items-start">
                <div className='bg-red-200 relative'>
                  <LogoSvg className='absolute -top-8 md:-top-10 left-2 md:left-4 w-24 h-24 md:w-32 md:h-32' />
                </div>
                <Button variant="outline" className="bg-white bg-opacity-25 rounded-full border-gray-400">
                  <span className='text-white text-xs md:text-sm'>Website status:{' '}
                    <span className="animate-ping inline-flex ml-1 h-2 w-2 rounded-full bg-green-600 opacity-75"></span>
                  </span>
                </Button>
              </div>
              <div className="text-center pb-8">
                <h2 className="text-xl md:text-2xl font-medium mb-3">Welcome Back!<br />Ready to Capture More?</h2>
                <div className="flex justify-center space-x-2">
                  <div className="w-4 md:w-6 h-1 bg-gray-500 rounded-full"></div>
                  <div className="w-4 md:w-6 h-1 bg-white rounded-full"></div>
                  <div className="w-4 md:w-6 h-1 bg-gray-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-8">
          <h1 className="text-4xl font-semibold my-4">Sign In</h1>
          <p className="mb-6 text-muted-foreground">Don't have an account? <a href="/sign-up" className="text-purple-400">Create one</a></p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-12">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} className="bg-[#3b364c] border-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="bg-[#3b364c] border-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </Form>
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
          <div className="mt-12">
            <p className="text-center text-sm">Or sign in with</p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:space-x-4 mt-6">
              <Button variant="outline" className="md:flex-1 bg-[#3b364c] hover:bg-gray-600 border-gray-200">
                <Icons.google className='size-6 mr-2' /> Google
              </Button>
              <Button variant="outline" className="md:flex-1 bg-[#3b364c] hover:bg-gray-600 border-gray-200">
                <Icons.apple className='size-6 mr-2' /> Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
