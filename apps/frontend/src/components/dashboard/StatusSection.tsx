import { useIssueStats } from "@/hooks/useIssue";
import StatusCard from "./StatusCard";
import Loading from "../common/Loading";

const StatusSection = () => {
  const { data: statsResponse, isLoading } = useIssueStats();
  const stats = statsResponse?.data;

  if (isLoading) return <Loading message="Loading Summary..." />;

  const STATUS_CARDS = [
    {
      label: "Total Issues",
      count: stats?.total || 0,
      borderColor: "bg-emerald-500",
      textColor: "text-indigo-600",
    },
    {
      label: "Open",
      count: stats?.open || 0,
      borderColor: "bg-rose-500",
      textColor: "text-rose-600",
    },
    {
      label: "In Progress",
      count: stats?.inProgress || 0,
      borderColor: "bg-amber-500",
      textColor: "text-amber-600",
    },
    {
      label: "Resolved",
      count: stats?.resolved || 0,
      borderColor: "bg-sky-500",
      textColor: "text-sky-600",
    },
  ];
  return (
    <div className="grid grid-cols-2 sm:flex gap-2 md:gap-4 w-full justify-center max-w-6xl">
      {STATUS_CARDS.map((card) => (
        <StatusCard data={card} key={card.label} />
      ))}
    </div>
  );
};

export default StatusSection;
