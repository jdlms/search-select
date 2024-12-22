import Downshift, { useCombobox } from "downshift";
import React from "react";
import { cx } from "./utils/cx";

export function ComboBoxExample() {
  const items = [
    { author: "Harper Lee", title: "To Kill a Mockingbird" },
    { author: "Lev Tolstoy", title: "War and Peace" },
    { author: "Fyodor Dostoyevsy", title: "The Idiot" },
    { author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
    { author: "George Orwell", title: "1984" },
    { author: "Jane Austen", title: "Pride and Prejudice" },
    { author: "Marcus Aurelius", title: "Meditations" },
    { author: "Fyodor Dostoevsky", title: "The Brothers Karamazov" },
    { author: "Lev Tolstoy", title: "Anna Karenina" },
    { author: "Fyodor Dostoevsky", title: "Crime and Punishment" },
  ];

  return (
    <Downshift
      onChange={(selection) =>
        alert(
          selection
            ? `You selected "${selection.title}" by ${selection.author}. Great Choice!`
            : "Selection Cleared"
        )
      }
      itemToString={(item) => (item ? item.title : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getLabelProps,
        getToggleButtonProps,
        inputValue,
        highlightedIndex,
        selectedItem,
        isOpen,
      }) => (
        <div className="combobox-container">
          <div className="combobox-inner">
            <label {...getLabelProps()} className="combobox-label">
              Favorite book
            </label>
            <div className="combobox-input-container">
              <input
                placeholder="Best book ever"
                className="combobox-input"
                {...getInputProps()}
              />
              <button
                aria-label={"toggle menu"}
                className="combobox-toggle"
                {...getToggleButtonProps()}
              >
                {isOpen ? <>&#8593;</> : <>&#8595;</>}
              </button>
            </div>
          </div>
          <ul
            className={cx(
              "combobox-list",
              !(isOpen && items.length) && "hidden"
            )}
            {...getMenuProps()}
          >
            {isOpen
              ? items
                  .filter(
                    (item) =>
                      !inputValue ||
                      item.title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                      item.author
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      className={cx(
                        "combobox-item",
                        highlightedIndex === index &&
                          "combobox-item-highlighted",
                        selectedItem === item && "combobox-item-selected"
                      )}
                      key={`${item.author}${index}`}
                      {...getItemProps({
                        item,
                        index,
                      })}
                    >
                      <span>{item.title}</span>
                      <span className="combobox-item-author">
                        {item.author}
                      </span>
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}
