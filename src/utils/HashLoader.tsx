"use client";

import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loading() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading w-[1000px] max-w-full h-[calc(100vh-64px)] p-4 flex-center m-auto">
      <HashLoader
        color="#36d7b7"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
