import Form from '../../components/contact/Form';
import SocialLinks from '../../components/contact/SocialLinks';
import TitleMessage from '../../components/contact/TitleMessage';

export default function page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-11/12 w-11/12 flex-col overflow-y-scroll rounded-xl border-2 border-solid border-primary bg-gray-700 py-6 lg:w-5/6 lg:flex-row lg:justify-center lg:p-12">
        <div className="mx-auto flex w-full shrink-0 flex-col justify-between lg:w-1/2">
          <TitleMessage />
          <SocialLinks />
        </div>
        <Form />
      </div>
    </div>
  );
}
