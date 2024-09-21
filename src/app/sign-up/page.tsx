'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerUser } from '@/store/slices/auth-slice';
import { AppDispatch, AppState } from '@/store/index';
import { SignUpFormValues, signUpSchema } from '@/validations/auth-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Img1 from '@/assets/signup.png';
import LogoSvg from '@/assets/svgs/logo';
import { Icons } from '@/data/svgs';
import { useState } from 'react';
import { toast } from 'sonner';

const SignUpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state: AppState) => state.auth);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    if (!checked) {
      toast.error("Terms & Conditions Required", {
        description: "Please agree to the Terms & Conditions before submitting.",
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismissed unchecked terms toast"),
        },
      });
      return;
    }
    try {
      await dispatch(registerUser(values)).unwrap();
      toast.success("Account Created", {
        description: "Your account has been created successfully!",
        action: {
          label: "Sign In",
          onClick: () => router.push('/sign-in'),
        },
      });
      router.push('/sign-in');
    } catch (err) {
      toast.error("Registration Failed", {
        description: "There was an error creating your account. Please try again.",
        action: {
          label: "Retry",
          onClick: () => form.handleSubmit(onSubmit)(),
        },
      });
      console.error('Failed to register:', err);
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
                    <span className="animate-ping inline-flex ml-1 h-1.5 w-1.5 rounded-full bg-green-400 opacity-75"></span>
                  </span>
                </Button>
              </div>
              <div className="text-center pb-8">
                <h2 className="text-xl md:text-2xl font-medium mb-3">Capturing Moments,<br />Creating Memories</h2>
                <div className="flex justify-center space-x-2">
                  <div className="w-4 md:w-6 h-1 bg-gray-500 rounded-full"></div>
                  <div className="w-4 md:w-6 h-1 bg-gray-500 rounded-full"></div>
                  <div className="w-4 md:w-6 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-8">
          <h1 className="text-4xl font-semibold my-4">Create an account</h1>
          <p className="mb-6 text-muted-foreground">Already have an account? <a href="/sign-in" className="text-purple-400">Log in</a></p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-12">
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="First name" {...field} className="bg-[#3b364c] border-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Last name" {...field} className="bg-[#3b364c] border-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Username Ex: Procoder123" {...field} className="bg-[#3b364c] border-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => setChecked(value as boolean)}
                />
                <FormLabel className="text-sm">I agree to the <a href="/terms" className="text-purple-400">Terms & Conditions</a></FormLabel>
              </div>
              <Button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700" disabled={loading || !checked}>
                Create account
              </Button>
            </form>
          </Form>
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
          <div className="mt-12">
            <p className="text-center text-sm">Or register with</p>
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

export default SignUpPage;