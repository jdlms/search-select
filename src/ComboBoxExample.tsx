import { useCombobox } from "downshift";
import React from "react";

export function ComboBoxExample() {
  const books = [
    { id: "book-1", author: "Harper Lee", title: "To Kill a Mockingbird" },
    { id: "book-2", author: "Lev Tolstoy", title: "War and Peace" },
    { id: "book-3", author: "Fyodor Dostoyevsy", title: "The Idiot" },
    { id: "book-4", author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
    { id: "book-5", author: "George Orwell", title: "1984" },
    { id: "book-6", author: "Jane Austen", title: "Pride and Prejudice" },
    { id: "book-7", author: "Marcus Aurelius", title: "Meditations" },
    {
      id: "book-8",
      author: "Fyodor Dostoevsky",
      title: "The Brothers Karamazov",
    },
    { id: "book-9", author: "Lev Tolstoy", title: "Anna Karenina" },
    {
      id: "book-10",
      author: "Fyodor Dostoevsky",
      title: "Crime and Punishment",
    },
  ];
  function getBooksFilter(inputValue: any) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return function booksFilter(book: any) {
      return (
        !inputValue ||
        book.title.toLowerCase().includes(lowerCasedInputValue) ||
        book.author.toLowerCase().includes(lowerCasedInputValue)
      );
    };
  }

  function ComboBox() {
    const [items, setItems] = React.useState(books);
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox({
      onInputValueChange({ inputValue }) {
        setItems(books.filter(getBooksFilter(inputValue)));
      },
      items,
      itemToString(item) {
        return item ? item.title : "";
      },
    });

    return (
      <div>
        <div className="w-72 flex flex-col gap-1">
          <label className="w-fit" {...getLabelProps()}>
            Choose your favorite book:
          </label>
          <div className="flex shadow-sm bg-white gap-0.5">
            <input
              placeholder="Best book ever"
              className="w-full p-1.5"
              {...getInputProps()}
            />
            aria-label="toggle menu"
            <button className="px-2" type="button" {...getToggleButtonProps()}>
              {isOpen ? <>&#8593;</> : <>&#8595;</>}
            </button>
          </div>
        </div>
        <ul
          className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && "hidden"
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={[
                  highlightedIndex === index ? "bg-blue-300" : "",
                  selectedItem === item ? "font-bold" : "",
                  "py-2 px-3 shadow-sm flex flex-col",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                <span>{item.title}</span>
                <span className="text-sm text-gray-700">{item.author}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return <ComboBox />;
}
