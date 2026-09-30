type buttonProps = {
  customClass?: string;
  name: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ customClass, name, onClick }: buttonProps) {
  return (
    <button
      onClick={onClick}
      className={` ${customClass} rounded-2xl border-4 border-solid border-primary bg-primary/40 px-6 py-1.5 text-3xl font-extrabold text-white transition duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer`}
    >
      {name}
    </button>
  );
}
