import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

const RegisterPage = () => {
  const { register, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <AuthForm type="register" onSubmit={register} isLoading={isLoading} />
    </div>
  );
};

export default RegisterPage;
