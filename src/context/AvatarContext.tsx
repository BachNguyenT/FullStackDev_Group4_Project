import { createContext, useContext } from "react";

const AvatarContext = createContext<{
  avatarURL: string,
  setAvatarURL: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) throw new Error("Must be used within LayoutProvider");
  return context;
};

export {useAvatarContext, AvatarContext}