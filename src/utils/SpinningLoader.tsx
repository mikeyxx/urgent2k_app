"use client";

import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function SpinningLoader() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading flex-center m-auto p-4">
      <ClipLoader
        color="#36d7b7"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default SpinningLoader;
