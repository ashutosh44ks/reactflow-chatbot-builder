import React, { createContext, useState } from "react";

const DnDContext = createContext<
  [string | null, React.Dispatch<React.SetStateAction<string | null>>]
>([null, () => {}]);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;
