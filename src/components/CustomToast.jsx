import React from "react";
import { toast } from "react-hot-toast";

const CustomToast = {
  confirm: ({ message, onConfirm, confirmText = "Sí", cancelText = "Cancelar" }) => {
    toast((t) => (
      <div
        className="flex flex-col gap-2 p-4 text-white"
        style={{
          backgroundImage: 'url("src/assets/images/Background.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "2px solid rgba(255,255,255,0.5)",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <p className="font-semibold text-center">{message}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            className="h-8 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] cursor-pointer"
          >
            {confirmText}
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="h-8 px-4 rounded-xl text-black hover:text-white bg-[#FFDBB7] hover:bg-[#5D688A] cursor-pointer"
          >
            {cancelText}
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: { background: "transparent" },
    });
  },

  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
};

export default CustomToast;
