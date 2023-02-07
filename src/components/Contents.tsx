import React, { useState } from "react"
import { css } from '@emotion/react'
// component
import Bar from "./Bar"

// css
const Board = css`
  height: calc(100vh - 100px);
  border: 1px solid #333;
  position: relative;
`
const Card = css`
  border: 1px solid #bdbdbd;
  padding: 20px;
  position: absolute;
  min-width: 110px;
  min-height: 110px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 15px;
  transition: 0.07s;
  opacity: 0.99;
`
const DeleteBtn = css`
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0.5;
  border: none;
  background: transparent;
`
const ColorSelector = css`
  position: absolute;
  top: 30px;
  right: 9px;
`
const ColorCircle = css`
  width: 10px;
  height: 10px;
  margin: 2px;
  padding: 2px;
  border: solid 1px #dedede;
  border-radius: 50%;
`
const EditableText = css`
  min-width: 80px;
  min-height: 80px;
  margin-top: 12px;
  border: none;
  cursor: pointer;
  font-size: 0.92rem;
  line-height: 1rem;
  font-family: "M PLUS Rounded 1c";
  background: transparent;
  overflow: hidden;
`
const Text = css`
  padding-right: 12px;
  font-size: 1rem;
  line-height: 1rem;
  font-family: "M PLUS Rounded 1c";
`

type Item = { t: string; x: number; y: number; c: number }
type Items = { [key: string]: Item }

const CORLORS = ["#ffe1b4", "#FFF9D5", "#ECFAF5", "#CBF5E4", "#A5DEC8", "#FFF"]

const Contents: React.FC = () => {
  const [items, setItems] = useState<Items | null>(null)
  const [dragging, setDragging] = useState({ key: "", x: 0, y: 0 })

  const [input, setInput] = useState("")
  const [editMode, setEditMode] = useState({ key: "", w: 0, h: 0 })

  const add = () => {
    setItems({
      ...items,
      [Math.random().toString(36).slice(-8)]: {
        t: "text here",
        x: window.scrollX + Math.floor(Math.random() * (200 - 80) + 80),
        y: window.scrollY + Math.floor(Math.random() * (200 - 80) + 80),
        c: 5,
      },
    });
  }
  const update = (key: string, item: Item) => setItems({ ...items, [key]: item });
  // const remove = (key: string) => setItems({ ...items, [key]: });
  const reset = () => setItems(null);

  if (!items)
    return (
      <Bar add={add} reset={reset} />
    );

  return (
    <>
      <Bar add={add} reset={reset} />
      <div
        css={Board}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          if (!dragging || !items) return
          update(dragging.key, {
            ...items[dragging.key],
            x: e.clientX - dragging.x,
            y: e.clientY - dragging.y,
          })
        }}
      >
        <div>
          {Object.keys(items).map((key) => (
            <div
              key={key}
              style={{
                left: items[key].x + "px",
                top: items[key].y + "px",
                background: CORLORS[items[key].c],
              }}
              draggable
              css={Card}
              onDragStart={(e) =>
                setDragging({
                  key,
                  x: e.clientX - items[key].x,
                  y: e.clientY - items[key].y,
                })
              }
            >
              {/* TODO: 1つ単位の削除 */}
              {/* <button css={DeleteBtn} onClick={() => remove(key)}>
                ×
              </button> */}
              <div css={ColorSelector}>
                {CORLORS.map((c, i) => (
                  <div
                    key={c}
                    css={ColorCircle}
                    onClick={() => {
                      update(key, { ...items[key], c: i });
                    }}
                    style={{ background: c }}
                  />
                ))}
              </div>
              {editMode.key === key ? (
                <textarea
                  css={EditableText}
                  style={{ width: editMode.w, height: editMode.h }}
                  onChange={(e) => setInput(e.target.value)}
                  defaultValue={items[key].t}
                  autoFocus
                  onFocus={(e) => e.target.select()}
                  onBlur={() => {
                    setInput("");
                    setEditMode({ key: "", w: 0, h: 0 });
                    input && update(key, { ...items[key], t: input });
                  }}
                />
              ) : (
                <pre
                  css={Text}
                  onClick={(e) =>
                    setEditMode({
                      key,
                      w: e.currentTarget.clientWidth,
                      h: e.currentTarget.clientHeight,
                    })
                  }
                >
                  {items[key].t}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Contents;