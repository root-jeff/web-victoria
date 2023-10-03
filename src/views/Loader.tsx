import React from "react";
import lottie from "lottie-web";
import animationData from "./../assets/Loader/SpinerLoader.json"; // Reemplaza esto con la ruta correcta a tu archivo JSON

export const LoaderAnimation = () => {
  React.useEffect(() => {
    const container = document.getElementById("loader-container");
    if (container) {
      const anim = lottie.loadAnimation({
        container: container,
        animationData: animationData,
        loop: true,
        autoplay: true,
      });
      return () => {
        anim.destroy();
      };
    }
  }, []);

  return (
    <div
      className="loader-overlay position-fixed vw-100 vh-100 d-flex justify-content-center align-items-center"
      style={{
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.5)",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        id="loader-container"
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
};
