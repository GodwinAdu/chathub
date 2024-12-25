"use client"

import dynamic from "next/dynamic";

const AudioWaveSpinner = dynamic(() => import("./AudioWaveSpinnerComponent"), {
  ssr: false, // Disable server-side rendering for this component
});

export default AudioWaveSpinner;
