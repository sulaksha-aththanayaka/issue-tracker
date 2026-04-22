import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusStat {
  label: string;
  count: number;
  borderColor: string;
}

interface StatusCardProps {
  data: StatusStat;
}

const StatusCard = ({ data }: StatusCardProps) => {
  return (
    <Card className="relative w-full max-w-sm shadow-sm flex flex-col justify-center gap-2 md:gap-0 py-4 overflow-hidden border-none max-h-[80px]">
      <div className={cn("absolute left-0 top-0 bottom-0 w-2 md:w-2 xl:w-4", data.borderColor)} />
      <CardHeader className="px-3 sm:px-4 xl:px-6 h-6 md:h-8">
        <CardTitle className="text-xs md:text-sm xl:text-lg font-bold uppercase text-muted-foreground tracking-wider">
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 xl:px-6">
        <div className="text-xl md:text-2xl font-bold text-slate-900">{data.count.toString().padStart(2, "0")}</div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
