import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE = "https://apart-x.pro";
const PDFViewer = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col bg-[#2D2B2B]">
      {/* Header */}
      <div className="bg-[#171717] py-4 px-4 flex items-center gap-4">
        <ArrowLeft
          className="text-white cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-white text-lg font-medium">About Apart-X</h1>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full">
        <iframe
          src={`${IMAGE_BASE}/Apart-X About.pdf#view=FitH`}
          className="w-full h-full"
          title="About Apart-X PDF"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
