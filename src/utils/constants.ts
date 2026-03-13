import type { StatusType } from "../types";

export const TASK_STATUS = [
  { label: "Please select status", value: "" },
  { label: "To do", value: "to-do" },
  { label: "In progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export const TASK_TABS = [
  { label: "All", value: "all" },
  { label: "To do", value: "to-do" },
  { label: "In progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export const getStatusMeta = (status: StatusType) => {
  const statusMap: Record<StatusType, { label: string; color: string }> = {
    "": {
      label: "Unknown",
      color: "bg-gray-200 text-gray-500",
    },
    "to-do": {
      label: "To do",
      color: "bg-yellow-200 text-yellow-700",
    },
    "in-progress": {
      label: "In progress",
      color: "bg-blue-200 text-blue-700",
    },
    completed: {
      label: "Completed",
      color: "bg-green-200 text-green-700",
    },
  };

  return statusMap[status];
};
