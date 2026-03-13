import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../../features/tasks/taskSlice";
import { Button, Loader, Modal, Tabs } from "../../components/ui";
import { BiPlus } from "react-icons/bi";
import type { StatusType, Task } from "../../types";
import { getStatusMeta, TASK_TABS } from "../../utils/constants";
import clsx from "clsx";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TaskFormModal } from "../../components/task";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { list: tasks, loading } = useAppSelector((state) => state.tasks);

  const [open, setOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const resetForm = () => {
    setEditingTask(null);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const filteredTasks: Task[] = useMemo(() => {
    return activeTab === "all"
      ? tasks
      : tasks.filter((task) => task.status === activeTab);
  }, [activeTab, tasks]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return <Loader size={25} />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-2xl font-bold dark:text-white">
          Task Dashboard
        </h1>

        <Button
          prefixIcon={<BiPlus className="text-lg sm:text-2xl" />}
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          Add Task
        </Button>
      </div>

      {!loading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks available</p>
      )}

      <Tabs tabs={TASK_TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="space-y-3">
        {filteredTasks.map((task: Task) => (
          <div
            key={task.id}
            className="border p-4 rounded-lg flex justify-between items-start sm:items-center shadow-sm bg-white dark:border dark:border-white dark:bg-gray-700"
          >
            <div className="flex flex-col gap-1 flex-1 min-w-0 max-w-[70%]">
              <p
                title={task.title}
                className="font-medium dark:text-white line-clamp-1 truncate"
              >
                {task.title}
              </p>

              {task.description && (
                <p
                  title={task.description}
                  className="text-sm text-gray-500 dark:text-white line-clamp-2 truncate"
                >
                  {task.description}
                </p>
              )}

              <span
                className={clsx(
                  "text-xs px-2 py-1 rounded w-max mt-1",
                  getStatusMeta(task.status as StatusType)?.color,
                )}
              >
                {getStatusMeta(task.status as StatusType)?.label}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                prefixIcon={<FaRegEdit />}
                onClick={() => handleEdit(task)}
                className="!p-1.5 sm:!px-3 sm:!py-2 rounded-sm"
              >
                <span className="hidden sm:inline">Edit</span>
              </Button>

              <Button
                variant="danger"
                prefixIcon={<MdDeleteForever className="text-lg" />}
                onClick={() => dispatch(deleteTask(task.id))}
                className="!p-1.5 sm:!px-3 sm:!py-2 rounded-sm"
              >
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal
          isOpen={open}
          onClose={() => handleClose()}
          title={editingTask ? "Edit Task" : "Create Task"}
          showCancel={false}
          className="!p-4 md:p-6 dark:bg-gray-900 dark:border dark:border-white"
        >
          <TaskFormModal
            editingTask={editingTask}
            onCancel={handleClose}
            onSubmit={(values: Omit<Task, "id">) => {
              if (editingTask) {
                dispatch(
                  updateTask({
                    id: editingTask.id,
                    task: values,
                  }),
                );
              } else {
                dispatch(createTask(values));
              }

              setEditingTask(null);
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
