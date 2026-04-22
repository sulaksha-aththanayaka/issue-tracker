import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button
      variant="ghost"
      onClick={() => logout()}
      className="text-white/70 hover:text-white hover:bg-white/10 rounded-full flex gap-2 items-center transition-all cursor-pointer"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
};

export default LogoutButton;
