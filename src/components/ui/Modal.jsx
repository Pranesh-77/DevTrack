export const Modal = ({ open, title, children, onClose }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_32px_80px_-28px_rgba(15,23,42,0.35)] dark:border-slate-800/80 dark:bg-slate-950"
        onClick={(event) => event.stopPropagation()}
      >
        {title ? <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h2> : null}
        <div className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{children}</div>
      </div>
    </div>
  );
};

export default Modal;