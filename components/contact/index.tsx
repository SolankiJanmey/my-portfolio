import { ContactComponent } from "./components/contact.component";

export default function Contact() {
  const date = new Date();

  return (
    <div className="pt-[200px] bg-white" id="contactme">
      <div>
        <ContactComponent />
      </div>
      <div className="h-[25vh] flex justify-center items-end">
        {/* <p className="text-sm max-w-lg mt-2 text-neutral-700 p-4">
          Copyright © {date.getFullYear()} Janmey Solanki. All rights reserved.
        </p> */}
      </div>
    </div>
  );
}
