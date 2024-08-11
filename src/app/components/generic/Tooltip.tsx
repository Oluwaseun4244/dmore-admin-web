import { ReactNode, useState } from "react";

interface ToolTipProps {
  children: ReactNode;
  text?: string;
}
const Tooltip: React.FC<ToolTipProps> = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
        {showTooltip && (
          <div className="absolute top-[-30px] left-0 right-0 w-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg">
            {text ?? 'Tooltip here'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
