import { Footer } from "components/home";
import { InfoPageHeader } from "components/InfoPageHeader";
import { getTextColor } from "helpers";
import React from "react";
import { theme } from "styles";

interface SingleColumnLayoutProps {
  children: React.ReactNode;
}

export const SingleColumnLayout: React.FC<SingleColumnLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <InfoPageHeader
        className="container"
        style={{
          color: getTextColor(theme.layoutContentBg),
        }}
      />
      {children}
      <Footer />
    </>
  );
};
