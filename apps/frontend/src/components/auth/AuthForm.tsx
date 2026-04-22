import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Loader2, Mail, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { loginSchema, registerSchema, type RegisterFormValues } from "@/schemas/AuthenticationSchema";
import { useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export const AuthForm = ({ type, onSubmit, isLoading }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const currentSchema = type === "login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(currentSchema) as any,
  });

  return (
    <div className="w-full max-w-md p-4 sm:p-6 md:p-8 space-y-6 bg-white/80 backdrop-blur-xl shadow-2xl rounded-[2rem] border border-white/20">
      <div className="text-center space-y-2">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          {type === "login" ? "Enter your details to access your issues" : "Sign up to start tracking your issues"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {type === "register" && (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 ml-1 font-medium">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                {...register("name")}
                className="pl-11 text-sm md:text-base rounded-2xl bg-slate-100/50 border-slate-200/60 h-12 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all"
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-xs text-red-500 ml-1 mt-1">{errors.name.message}</p>}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700 ml-1 font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-4 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              {...register("email")}
              type="email"
              className="pl-11 text-sm md:text-base rounded-2xl bg-slate-100/50 border-slate-200/60 h-12 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all"
              placeholder="name@example.com"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700 ml-1 font-medium">
            Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-3 top-4 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="pl-11 text-sm md:text-base pr-11 rounded-2xl bg-slate-100/50 border-slate-200/60 h-12 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all"
              placeholder="••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all font-bold text-white active:scale-[0.98]"
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {type === "login" ? "Sign In" : "Register"}
        </Button>
      </form>

      <div className="text-center text-sm pt-2">
        <p className="text-slate-500">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={type === "login" ? "/register" : "/login"}
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            {type === "login" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};
