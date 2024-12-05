import { trimAndAddDots } from "../utils/utils";
import {
  READ_BOOK_LIST_TYPE,
  WISHLIST_BOOK_LIST_TYPE,
} from "../constants/commonConstants";

const BookListItemDescription = ({
  title,
  description,
  listType = WISHLIST_BOOK_LIST_TYPE,
}) => {
  const { dateToRead, rating } = description;

  return (
    <div>
      <div className="text-center text-l text-slate-800 font-semibold subpixel-antialiased m-1">
        {trimAndAddDots(title)}
      </div>

      {listType === WISHLIST_BOOK_LIST_TYPE && (
        <div className="text-center">Date to read: {dateToRead}</div>
      )}

      {listType === READ_BOOK_LIST_TYPE && (
        <div className="text-center">Rating : {rating} / 5</div>
      )}
    </div>
  );
};

export default BookListItemDescription;
