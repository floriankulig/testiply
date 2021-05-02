import { DetailAppTile } from "./DetailAppTile";
import { SimpleAppTile } from "./SimpleAppTile";
import { AppPreview } from "ts";

export interface AppTileProps {
  style?: React.CSSProperties;
  className?: string;
  appInfo: AppPreview;
  customID?: string;
  simple?: boolean;
}

export const AppTile: React.FC<AppTileProps> = ({ ...props }) => {
  const { simple, ...restProps } = props;
  if (simple) {
    return <SimpleAppTile {...restProps} />;
  } else {
    return <DetailAppTile {...restProps} />;
  }
};
