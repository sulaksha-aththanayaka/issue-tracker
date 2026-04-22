import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post("/auth/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      queryClient.clear();
      setAuth(data.token, data.email, data.name);
      toast.success(`Welcome back, ${data.name}!`, {
        description: "You have successfully signed in.",
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message;

      toast.error("Login Failed", {
        description: message || "Invalid credentials",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: { name: string; email: string; password: string }) => {
      const { data } = await api.post("/auth/register", credentials);
      return data;
    },
    onSuccess: (data) => {
      queryClient.clear();
      setAuth(data.token, data.email, data.name);
      toast.success("Account created!", {
        description: "Welcome to Issue Tracker.",
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Registration failed";
      toast.error("Registration Error", { description: message });
    },
  });

  const logout = () => {
    queryClient.clear();
    clearStore();
    navigate("/login");
    toast.info("Logged out successfully");
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  };
};
