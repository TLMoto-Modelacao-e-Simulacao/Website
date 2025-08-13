import SubscribePopupFixed from "@/src/components/utils/SubscribePopupFixed";
import { useState, useEffect } from "react";
import MyNews from "@/src/components/news/NewsCoverflowEffect";
import MyDefaultPage from "@/src/components/DefaultPage";

export default function News() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    console.log("Popup state changed:", isPopupOpen);
  }, [isPopupOpen]);

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Subscribe button clicked!");
    console.log("Current popup state:", isPopupOpen);
    setIsPopupOpen(true);
    console.log("Setting popup state to true");
  };

  const handleClosePopup = () => {
    console.log("Closing popup");
    setIsPopupOpen(false);
  };

  return (
    <MyDefaultPage>
      {/* Container with proper spacing for mobile and desktop */}
      <div className="pt-[10vh] pb-[12vh] min-h-screen flex flex-col lg:pt-0 lg:pb-0">
        <div className="flex-1 flex flex-col">
          <MyNews onSubscribeClick={handleSubscribeClick} />
        </div>
      </div>
      <SubscribePopupFixed isOpen={isPopupOpen} onClose={handleClosePopup} />
    </MyDefaultPage>
  );
}
