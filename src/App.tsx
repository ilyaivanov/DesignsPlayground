import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// without gap
const MIN_COLUMN_WIDTH = 200;
const GAP = 20;
interface Item {
  id: string;
  color: string;
}
function App() {
  const item = (id: string): Item => ({
    id,
    color: randomHsl(),
  });
  const items = useRef([
    item("First"),
    item("Second"),
    item("Third"),
    item("Fourth"),
    item("Fifth"),
    item("Six"),
    item("Seven"),
    item("Eighth"),
    item("Nine"),
    item("Ten"),
    item("Eleven"),
    item("Twelve"),
    item("Thirteen"),
  ]);
  const getNumberOfColumns = () => {
    return Math.floor((window.innerWidth - GAP) / (MIN_COLUMN_WIDTH + GAP));
  };
  const [numberOfColumns, setNumberOfColumns] = useState(getNumberOfColumns());
  const [openCards, setOpenCards] = useState<any>({});
  const onResize = () => {
    const cols = getNumberOfColumns();
    if (cols !== numberOfColumns) setNumberOfColumns(cols);
  };
  const toggle = (cardId: string) => {
    setOpenCards({ ...openCards, [cardId]: !openCards[cardId] });
  };
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [numberOfColumns]);

  return (
    <div className="gallery" style={{ paddingTop: GAP, paddingLeft: GAP }}>
      {createIntegers(numberOfColumns).map((columnIndex) => (
        <Column
          toggle={toggle}
          openCards={openCards}
          items={items.current.filter(
            (_, i) => i % numberOfColumns == columnIndex
          )}
          key={columnIndex}
        />
      ))}
    </div>
  );
}

const Column = ({
  items,
  toggle,
  openCards,
}: {
  items: Item[];
  toggle: any;
  openCards: any;
}) => {
  return (
    <div className="column" style={{ marginRight: GAP }}>
      {items.map((i) => (
        <Box key={i.id} isOpen={openCards[i.id]} item={i} toggle={toggle} />
      ))}
    </div>
  );
};

const Box = ({ isOpen, item, toggle }: any) => {
  return (
    <div
      className={"box"}
      onClick={() => toggle(item.id)}
      style={{
        backgroundColor: item.color,
        marginBottom: GAP,
      }}
    >
      <img
        className={"image"}
        src="https://i.ytimg.com/vi/xJ5z8GF1uys/mqdefault.jpg"
        alt=""
      />
      <div>{item.id}</div>
      {isOpen
        ? " Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cumque inventore molestiae neque optio quas soluta tempore? Aliquam aut, distinctio, dolorum earum eveniet illo in perferendis possimus quaerat reiciendis suscipit?"
        : ""}
    </div>
  );
};

//creates integers starting from 0 up to upTo (exclusive)
const createIntegers = (upTo: number) =>
  Array.from(new Array(upTo)).map((_, i) => i);

function randomHsl() {
  return "hsla(" + Math.random() * 360 + ", 50%, 50%, 1)";
}

export default App;
