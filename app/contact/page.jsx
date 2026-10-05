import Form from '../../components/contact/Form';
import SocialLinks from '../../components/contact/SocialLinks';
import TitleMessage from '../../components/contact/TitleMessage';

export default function page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-5/6 justify-center rounded-xl border-2 border-solid border-primary bg-gray-700 p-12">
        <div className="mx-auto flex w-1/2 flex-col justify-between">
          <TitleMessage />
          <SocialLinks />
        </div>
        <Form />
      </div>
    </div>
  );
}
