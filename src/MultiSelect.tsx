import { useEffect, useState } from "react"
import styles from "./select.module.css"

export type SelectOption = {
    label: string
    value: string | number
}

type SelectProps = {
    options: SelectOption[]
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void
}

export function MultiSelect({ value, onChange, options }: SelectProps){
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    function clearOption(){
        onChange([])
    }

    function selectOption(option: SelectOption){
        if(value.includes(option)){
            onChange(value.filter(o => o !== option))
        } else {
            onChange([...value, option])
        }
    }

    function isOptionSelected(option: SelectOption){
        return value.includes(option)
    }

    useEffect(()=> {
        if(isOpen) setHighlightedIndex(0)
    }, [isOpen])

    return (
        <div
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(prev => !prev)}
         tabIndex={0} className={styles.container}>
              <span className={styles.value}>{value.map(v => (
                <button key={v.value} onClick={e => {
                    e.stopPropagation()
                    selectOption(v)
                }}
                className={styles["option-badge"]}
                >
                    {v.label} <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))}</span>
              <button onClick={(e) => {
                e.stopPropagation()
                clearOption()
                }} className={styles["clear-btn"]}>&times;</button>
              <div className={styles.divider}></div>
              <div className={styles.caret}></div>
              <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }} key={option.value}
                    onMouseEnter = {() => setHighlightedIndex(index)}
                     className={` ${styles.option} ${isOptionSelected(option) ? styles.selected : ""}
                     ${index === highlightedIndex ? styles.highlighted : ""}`}>
                    {option.label}</li>
                ))}
              </ul>
        </div>
    )

}