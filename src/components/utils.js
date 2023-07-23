//Function to trim the book title to improve readability on the website.
export function trimAndAddDots(book) {
  if (book && book.length >= 20) {
    return book.substr(0, 20) + "...";
  }
  return book;
}
