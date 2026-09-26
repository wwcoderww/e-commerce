export default function Form() {
  return (
    <div className="flex w-1/2 flex-col gap-4 px-4">
      <div className="pb-5 text-center text-5xl font-extrabold">
        Contact Form
      </div>
      <input
        type="text"
        placeholder="Name"
        className="rounded-md bg-gray-300 px-2 py-1 text-lg text-black focus:outline-none"
      />
      <input
        type="text"
        placeholder="Email"
        className="rounded-md bg-gray-300 px-2 py-1 text-lg text-black focus:outline-none"
      />
      <input
        type="text"
        placeholder="Title"
        className="rounded-md bg-gray-300 px-2 py-1 text-lg text-black focus:outline-none"
      />
      <textarea
        type="text"
        placeholder="Message"
        className="h-[8lh] rounded-md bg-gray-300 px-2 py-1.5 text-lg text-black focus:outline-none"
      />
      <button className="mr-auto ml-2">Submit</button>
    </div>
  );
}
