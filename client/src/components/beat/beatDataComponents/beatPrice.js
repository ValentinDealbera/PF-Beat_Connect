export default function BeatPrice({ beat }) {
  return (
    <span className="color-primary-red-700 font-semibold">{`$${beat.priceAmount}`}</span>
  );
}
