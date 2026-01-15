// Icons
import { X, Copy, LinkSimple } from "@phosphor-icons/react/dist/ssr";

const TransactionViewModal = ({ selectedTx, handleToggle }) => {
  console.log("txdd", selectedTx);

  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div className="bg-backgroundSecondary rounded-lg max-w-lg w-[95%] p-5 md:p-10 space-y-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Deposit Details</h3>
          <button
            onClick={() => handleToggle(null)}
            className="text-grey hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 text-[#615C6E]">
          <div className="flex items-center justify-between text-[#615C6E] text-sm">
            <span className="text-[#615C6E] text-sm">Status</span>
            <span className="text-[#615C6E] capitalize">
              {selectedTx.status}
            </span>
          </div>

          <div className="flex items-center justify-between ">
            <span className="">Date & Time</span>
            <span>{selectedTx.createdAt}</span>
          </div>

          <div className="flex items-center justify-between ">
            <span className="">Qty</span>
            <span>
              {selectedTx.amount}
              <span className="text-xs uppercase"> usdt</span>
            </span>
          </div>

          <div className="flex items-center justify-between ">
            <span className="">Network</span>
            <span>{selectedTx.network || "USDT"}</span>
          </div>

          <div className="flex items-center justify-between ">
            <span className="">Address</span>
            <div className="flex items-center gap-2 break-all w-2/3">
              {selectedTx.wallet}
              <LinkSimple size={20} />
              <button
                onClick={() => copyToClipboard(selectedTx.wallet)}
                className="text-grey hover:text-gray-700 shrink-0"
              >
                <Copy size={20} className="rounded-lg" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <span className="">Txid</span>
            <div className="flex items-center gap-2 break-all w-2/3">
              {selectedTx._id}
              <LinkSimple size={20} />
              <button
                onClick={() => copyToClipboard(selectedTx._id)}
                className="text-grey hover:text-gray-700 shrink-0"
              >
                <Copy size={20} className="rounded-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionViewModal;
