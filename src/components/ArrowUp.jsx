import React from "react";
export default function ArrowUp() {
    return (
   <button
     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
     className="fixed bottom-20 right-3 md:right-10 z-[9999] bg-[#141540] p-4 
      rounded-full shadow-2xl flex items-center justify-center text-[var(--color-starDust)] 
      text-xl font-bold transform transition-transform duration-300 hover:scale-110"
    >
    ↑
    </button>
    )
}