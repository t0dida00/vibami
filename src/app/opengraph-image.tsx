import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#f7f7f2",
        color: "#171714",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          border: "2px solid rgba(23,23,20,0.1)",
          borderRadius: "44px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px",
          width: "100%",
          background:
            "radial-gradient(circle at 75% 20%, rgba(190,242,100,0.7), transparent 38%), white",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>{siteConfig.name}</div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-4px",
            lineHeight: 1.05,
            maxWidth: "850px",
          }}
        >
          Fresh Vietnamese bánh mì, built your way.
        </div>
        <div style={{ color: "#6f7068", display: "flex", fontSize: 24 }}>
          Fresh ingredients · Baked daily · Bold flavor
        </div>
      </div>
    </div>,
    size,
  );
}
