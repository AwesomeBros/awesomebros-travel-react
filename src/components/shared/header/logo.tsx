import { useFilterStore } from "@/lib/stores";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  const { resetFilterValue } = useFilterStore();
  return (
    <button
      onClick={() => {
        navigate("/");
        resetFilterValue();
      }}
    >
      <img
        src={"/logo/logo.png"}
        alt="Logo"
        height={100}
        width={100}
        className="hidden md:block cursor-pointer"
      />
    </button>
  );
}
