import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <AuthForm type="login" onSubmit={login} isLoading={isLoading} />
    </div>
  );
};

export default LoginPage;
