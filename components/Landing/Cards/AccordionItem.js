import { Plus, Minus } from "@phosphor-icons/react/dist/ssr";

export default function AccordionItem({ title, content, isActive, onClick }) {
  return (
    <div
      className={`rounded-lg border transition-all ${
        isActive
          ? "border-gold bg-navySoft"
          : "border-borderColor bg-white"
      } p-5 space-y-3`}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-sm font-medium text-navy">{title}</h3>

        <span className="text-gold">
          {isActive ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      {isActive && (
        <p className="text-sm text-textMuted leading-relaxed">
          {content}
        </p>
      )}
    </div>
  );
}
