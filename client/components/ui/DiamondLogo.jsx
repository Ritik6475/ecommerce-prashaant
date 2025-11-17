export default function DiamondLogo({ size = 18 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: "2px solid black",
        transform: "rotate(45deg)",
      }}
    />
  );
}
