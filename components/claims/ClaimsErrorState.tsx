type Props = {
  message: string;
  onRetry: () => void;
};

export default function ClaimsErrorState({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>

      <p className="mt-4 text-sm font-medium text-gray-700">Something went wrong</p>
      <p className="mt-1 text-xs text-gray-400">{message}</p>

      <button
        onClick={onRetry}
        className="mt-5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg
                   hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
