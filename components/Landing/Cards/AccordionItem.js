import { Plus, Minus } from "@phosphor-icons/react/dist/ssr";

// eslint-disable-next-line react/prop-types
export default function AccordionItem({ title, content, isActive, onClick }) {
  return (
    <div
      className={`border-[0.5px] border-[#D2D3D880] bg-greyBg p-5 rounded-md space-y-2 ${
        isActive ? "active" : ""
      }`}
    >
      <div className="flex justify-between" onClick={onClick}>
        <h3 className="text-sm font-medium">{title}</h3>
        {isActive ? <Minus /> : <Plus />}
      </div>

      {isActive && (
        <div className="">
          <p className="text-sm text-faded">{content}</p>
        </div>
      )}
    </div>
  );
}
