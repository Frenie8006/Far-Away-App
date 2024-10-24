import { useState } from "react";

import { Logo } from "./components/Logo";
import { Form } from "./components/Forms";
import { PackingList } from "./components/PackingList";
import { Stats } from "./components/Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Laptop", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  // To submit item
  function handlAddSubmit(item) {
    setItems((items) => [...items, item]);
  }

  // To delete item
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Checking the item
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // To clear all list items
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handlAddSubmit} />
      <PackingList
        items={items}
        onClearList={handleClearList}
        onDeleteItems={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} setItems={setItems} />
    </div>
  );
}
