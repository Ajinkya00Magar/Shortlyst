import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onChange, readonly = false, maxStars = 5, activeColor = "text-amber-400 fill-amber-400", inactiveColor = "text-slate-600 hover:text-amber-500/70" }) => {
  const [hoverRating, setHoverRating] = useState(null);

  const getTooltip = (starIndex) => {
    const textMap = {
      1: "⭐ Very Low Interest",
      2: "⭐⭐ Low Interest",
      3: "⭐⭐⭐ Moderate Interest",
      4: "⭐⭐⭐⭐ Strong Interest",
      5: "⭐⭐⭐⭐⭐ Must Select"
    };
    return textMap[starIndex] || "";
  };

  return (
    <div className="flex items-center gap-1.5" role="img" aria-label={`Rating: ${rating} out of ${maxStars}`}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isCompleted = hoverRating !== null ? starValue <= hoverRating : starValue <= rating;

        return (
          <button
            key={index}
            type="button"
            disabled={readonly}
            className={`transition-all duration-150 transform ${readonly ? 'cursor-default' : 'hover:scale-125 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400/50 rounded-md'}`}
            onClick={() => !readonly && onChange && onChange(starValue)}
            onMouseEnter={() => !readonly && setHoverRating(starValue)}
            onMouseLeave={() => !readonly && setHoverRating(null)}
            title={!readonly ? getTooltip(starValue) : `${starValue} Stars`}
            aria-label={`Rate ${starValue} Stars`}
          >
            <Star
              size={18}
              className={`${isCompleted ? activeColor : inactiveColor} transition-colors duration-100`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
