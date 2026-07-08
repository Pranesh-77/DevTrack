import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function ConfirmDeleteModal({ open, onClose, onConfirm, projectName }) {
  return (
    <Modal open={open} title="Delete Project" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">"{projectName}"</span>?
          This action is permanent and will delete all associated milestones, tasks, and history.
        </p>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-900">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-rose-600 text-white hover:bg-rose-500 hover:-translate-y-0.5 focus-visible:ring-rose-600 dark:bg-rose-500 dark:text-white dark:hover:bg-rose-400 dark:focus-visible:ring-rose-500"
            onClick={onConfirm}
          >
            Delete Project
          </Button>
        </div>
      </div>
    </Modal>
  );
}
