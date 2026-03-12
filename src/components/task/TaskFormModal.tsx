import { Formik, Form } from "formik";
import clsx from "clsx";
import { Button } from "../ui";
import InputField from "../form/InputField";
import type { Task } from "../../types";
import { TASK_STATUS } from "../../utils/constants";
import { TaskValidationSchema } from "../../utils/validations";

type Props = {
  editingTask: Task | null;
  onSubmit: (values: Omit<Task, "id">) => void;
  onCancel: () => void;
};

const TaskFormModal = ({ editingTask, onSubmit, onCancel }: Props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: editingTask?.title || "",
        description: editingTask?.description || "",
        status: editingTask?.status || "",
      }}
      validationSchema={TaskValidationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form className="space-y-4">
          <div className="flex flex-col gap-2.5">
            <InputField
              name="title"
              placeholder="Task Title"
              value={values.title}
              onChange={handleChange}
              className="dark:placeholder:text-gray-400 dark:text-white dark:bg-gray-800"
            />
            {touched.title && errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <textarea
              name="description"
              placeholder="Description"
              value={values.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 p-3 rounded-lg resize-none
    dark:placeholder:text-gray-400 dark:text-white dark:bg-gray-800"
            />

            {touched.description && errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className={clsx(
                "w-full border border-gray-300 p-3 rounded-lg dark:bg-gray-800",
                values.status === ""
                  ? "text-gray-400 dark:text-gray-400"
                  : "text-gray-900 dark:text-white",
              )}
            >
              {TASK_STATUS.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                  disabled={item.value === ""}
                  hidden={item.value === ""}
                >
                  {item.label}
                </option>
              ))}
            </select>

            {touched.status && errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>

          <div className="flex justify-end gap-2.5">
            <Button variant="secondary" type="button" onClick={onCancel}>
              Cancel
            </Button>

            <Button type="submit">
              {editingTask ? "Update Task" : "Save Task"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TaskFormModal;
