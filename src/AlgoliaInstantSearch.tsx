import {
  InstantSearch,
  Highlight,
  connectAutoComplete,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import { useCombobox } from "downshift";

function RawAutoComplete({ refine, hits }: any) {
  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    selectedItem,
    highlightedIndex,
    isOpen,
    inputValue,
  } = useCombobox({
    items: hits,
    itemToString: (item: any) => (item ? item.email : ""),
    onInputValueChange: ({ inputValue }) => {
      if (inputValue && inputValue.length >= 3) {
        refine(inputValue);
      } else {
        refine("");
      }
    },
    onSelectedItemChange: ({ selectedItem }) =>
      alert(JSON.stringify(selectedItem)),
  });

  return (
    <div>
      <input {...getInputProps()} />
      <div {...getMenuProps()}>
        {isOpen &&
          inputValue &&
          inputValue.length >= 3 &&
          hits.map((item: any, index: number) => (
            <div
              key={item.objectID}
              {...getItemProps({
                item,
                index,
                style: {
                  backgroundColor:
                    highlightedIndex === index ? "gray" : "black",
                  fontWeight: selectedItem === item ? "bold" : "normal",
                },
              })}
            >
              <Highlight attribute="email" hit={item} tagName="mark" />
            </div>
          ))}
      </div>
    </div>
  );
}

const AutoCompleteWithData = connectAutoComplete(RawAutoComplete);

const searchClient = algoliasearch(
  "BPN8TM6PX7",
  import.meta.env.VITE_ALGOLIAKEY
);

export function Example() {
  return (
    <InstantSearch indexName="dummydata" searchClient={searchClient}>
      Algolia
      <a href="https://community.algolia.com/react-instantsearch/">
        React InstantSearch
      </a>
      example
      <AutoCompleteWithData />
    </InstantSearch>
  );
}
