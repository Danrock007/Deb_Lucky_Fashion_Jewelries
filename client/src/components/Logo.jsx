export default function Logo({ size = 80, color = "#C9A227" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Deb Lucky Fashion Jewelries logo"
    >
      {/* L */}
      <text
        x="18"
        y="55"
        fontFamily="'Anton',"
        fontSize="80"
        fontWeight="600"
        fill={color}
      >
        L
      </text>

      {/* J — shifted down and slightly right to create the descender/luxury dip */}
      <text
        x="60"
        y="85"
        fontFamily="'Anton'"
        fontSize="90"
        fontWeight="600"
        fill={color}
      >
        J
      </text>
    </svg>
  );
}