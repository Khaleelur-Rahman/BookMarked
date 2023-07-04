  export function trimAndAddDots(book) {
    if(book && book.length >= 20) {
      return book.substr(0,20) + "...";
    }
    return book;
  }
