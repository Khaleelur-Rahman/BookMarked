//Function to trim the book title to improve readability on the website.
export function trimAndAddDots(book) {
  if (book && book.length >= 20) {
    return book.substr(0, 20) + "...";
  }
  return book;
}

export function setUrl(url) {
  window.location.href = url;
}

export function formatDate(date, convertToFormat = "dd/MM/yyyy") {
  if (convertToFormat === "dd/MM/yyyy") {
    return date.split("-").reverse().join("/");
  } else {
    return date.split("/").reverse().join("-");
  }
}
