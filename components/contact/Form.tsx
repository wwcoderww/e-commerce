const inputStyle =
  'rounded-md bg-gray-300 px-2 py-1 text-lg text-black focus:outline-none';

export default function Form() {
  return (
    <div className="flex w-1/2 flex-col gap-4 px-4">
      <div className="pb-5 text-center text-5xl font-extrabold">
        Contact Form
      </div>
      <input type="text" placeholder="Name" className={`${inputStyle}`} />
      <input type="text" placeholder="Email" className={`${inputStyle}`} />
      <input type="text" placeholder="Title" className={`${inputStyle}`} />
      <textarea
        placeholder="Message..."
        className="h-[8lh] rounded-md bg-gray-300 px-2 py-1.5 text-lg text-black focus:outline-none"
      />
      <button className="mx-auto rounded-2xl border-4 border-solid border-primary bg-primary/10 px-4 py-1 text-2xl font-bold transition duration-200 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer">
        submit
      </button>
    </div>
  );
}
