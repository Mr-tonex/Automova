
"use client";

import Cal from "@calcom/embed-react";

interface CalEmbedProps {
  calLink: string;
  theme?: 'light' | 'dark' | 'auto';
  brandColor?: string;
  layout?: 'month_view' | 'week_view' | 'day_view';
}

export default function CalEmbed({ 
  calLink, 
  theme = 'auto', 
  brandColor,
  layout = 'month_view' 
}: CalEmbedProps) {

  const config: any = {
    layout: layout,
    theme: theme,
  };

  if (brandColor) {
    config.styles = {
      branding: {
        brandColor: brandColor,
      },
    };
  }

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", minHeight: "680px", overflow: "hidden" }}
      config={config}
    />
  );
}
