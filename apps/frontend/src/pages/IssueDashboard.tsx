import { useEffect, useRef, useState } from "react";
import { type Mode, type Issue } from "@/types";
import IssueModal from "@/components/modals/IssueModal";
import { useIssueDetail, useIssueMutations, useIssues } from "@/hooks/useIssue";
import { Pagination } from "@/components/Pagination";
import IssueSection from "@/components/dashboard/IssueSection";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import StatusSection from "@/components/dashboard/StatusSection";
import HeaderSection from "@/components/dashboard/HeaderSection";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { useAuthStore } from "@/store/useAuthStore";
import LogoutButton from "@/components/auth/LogoutButton";
import { IssueSortOption, type IssuePriority, type IssueStatus } from "@myapp/shared";
import { capitalize } from "@/lib/utils";

const IssueDashboard = () => {
  const name = useAuthStore((state) => state.name);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<Mode>("view");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [issueIdToDelete, setIssueIdToDelete] = useState<string | null>(null);
  const [status, setStatus] = useState<IssueStatus | "all">("all");
  const [priority, setPriority] = useState<IssuePriority | "all">("all");
  const [sortBy, setSortBy] = useState<IssueSortOption>(IssueSortOption.RECENT);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { issues, isLoading, isFetching, isError, pagination } = useIssues(
    page,
    10,
    searchQuery,
    status === "all" ? undefined : status,
    priority === "all" ? undefined : priority,
    sortBy,
  );

  const { data: fullIssue, isFetching: isFetchingDetail } = useIssueDetail(selectedIssueId);

  const { updateIssueStatus } = useIssueMutations();

  const handleStatusChange = (id: string, status: IssueStatus) => {
    updateIssueStatus({ id, status }); // ← clean, no type hacks
  };

  // When search for an issue
  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  // Scroll to the top
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [page]);

  const handleFilterChange = (field: "status" | "priority" | "sortBy", value: string) => {
    if (field === "status") setStatus(value as IssueStatus | "all");
    if (field === "priority") setPriority(value as IssuePriority | "all");
    if (field === "sortBy") setSortBy(value as IssueSortOption);
  };

  const handleAction = (mode: Mode, issue?: Issue) => {
    console.log("Issue front: ", issue);

    if (issue) setSelectedIssueId(issue._id);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedIssueId(null), 300);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setIssueIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Loding and error states
  if (isLoading) return <Loading />;

  if (isError) return <Error onRetry={() => window.location.reload()} />;

  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col bg-gradient-to-br from-[#29235C] to-[#52537E] overflow-hidden">
      <div className="w-full flex justify-center p-4 md:px-6">
        <div className="w-full max-w-6xl flex justify-between items-center bg-white/5 border border-white/10 p-2 pl-4 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold border border-white/20">
              {name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">Dashboard</span>
              <span className="text-white text-sm font-medium">Hello, {capitalize(name!)}</span>
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>
      <div ref={scrollContainerRef} className="flex-1 p-4 md:p-6 flex flex-col items-center gap-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
          Issue Tracker
        </h1>

        {/* Stats section */}
        <StatusSection />

        {/* Search and actions */}
        <HeaderSection
          search={searchQuery}
          setSearch={setSearchQuery}
          status={status}
          priority={priority}
          sortBy={sortBy}
          onFilterChange={handleFilterChange}
          onView={() => handleAction("add")}
          issues={issues}
        />

        {/* Issues section */}
        <IssueSection
          issues={issues}
          isFetching={isFetching}
          handleAction={handleAction}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        {/* Pagination for desktop view */}
        {pagination.totalPages > 1 && (
          <div className="hidden md:block w-full max-w-6xl">
            <Pagination currentPage={page} totalPages={pagination.totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>

      {/* Pagination for mobile view */}
      {pagination.totalPages > 1 && (
        <div className="md:hidden w-full bg-slate-900/40 backdrop-blur-xl border-t border-white/10 px-4">
          <div className="max-w-6xl mx-auto">
            <Pagination currentPage={page} totalPages={pagination.totalPages} onPageChange={setPage} />
          </div>
        </div>
      )}

      <IssueModal
        issue={fullIssue?.data || null}
        isLoading={isFetchingDetail}
        mode={modalMode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEditClick={() => setModalMode("edit")}
      />

      <DeleteModal isOpen={isDeleteModalOpen} issueId={issueIdToDelete} onClose={handleCloseDeleteModal} />
    </div>
  );
};

export default IssueDashboard;
