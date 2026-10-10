import Button from '@/components/Button';

type ButtonsProps = {
  newAccount: boolean;
  clearErrors: () => void;
  setNewAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Buttons({
  newAccount,
  clearErrors,
  setNewAccount,
}: ButtonsProps) {
  function switchView() {
    clearErrors();
    setNewAccount((value) => !value);
  }

  return (
    <>
      <Button
        name={`${newAccount ? 'Create' : 'Login'}`}
        type="submit"
        customClass="text-5xl py-4 px-12 bg-primary/50 hover:bg-primary/70"
      />
      <div
        onClick={() => switchView()}
        className="eas-in-out text-lg underline transition duration-300 hover:-translate-y-1 hover:cursor-pointer"
      >
        {newAccount ? 'Log in instead' : 'Create new account'}
      </div>
    </>
  );
}
