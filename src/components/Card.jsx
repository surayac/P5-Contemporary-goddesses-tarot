import backImage from "../assets/images/card.png";

const Card = ({ card, isSelected = false, onClick }) => {
 
  return (
    <button
      onClick={onClick}
      className="
        w-28 h-40 md:w-32 md:h-48
        shrink-0 rounded-xl overflow-hidden
        border border-amber-300 shadow-md
        outline-none focus-visible:ring-2 focus-visible:ring-amber-300
        bg-black/10
      "
      aria-label={isSelected ? card.arcaneName : "Carta virada"}
    >
      <img
        src={isSelected ? card.arcaneImage.imageSrc : backImage}
        alt={isSelected ? "Card back" : card.arcaneName}
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.src = backImage; }}
      />
    </button>
  );
};

export default Card;


