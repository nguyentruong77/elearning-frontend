import { SkeletonStyle } from "./style";

export default function Skeleton({
  shap = "rectangle",
  width,
  height,
  children,
  ...props
}) {
  return (
    <SkeletonStyle {...props} className={`${shap} ${props.className ?? ''}`} style={{ width, height, ...props.style }}>
      {children}
    </SkeletonStyle>
  );
}
