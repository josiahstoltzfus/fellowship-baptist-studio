import {NumberInputProps, set, unset} from 'sanity'
import {ChangeEvent} from 'react'

export default function ScriptureNumberInput(props: NumberInputProps) {
  const {value, onChange} = props

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const selected = event.target.value

    onChange(
      selected === ''
      ? unset()
        : set(Number(selected))
    )
  }

  return (
    <select value={value ?? ''} onChange={handleChange}>
      <option value="">Select a number</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  )
}