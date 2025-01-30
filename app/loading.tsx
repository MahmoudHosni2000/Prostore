// You don't have to import this file anywhere, it's not a component, it's just a page that will be shown automatically when the app is loading.

import Image from "next/image";
import loader from "@/assets/Toaster.gif";

const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image src={loader} height={150} width={150} alt="Loading..." />
    </div>
  );
};

export default LoadingPage;
