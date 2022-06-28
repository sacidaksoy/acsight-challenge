import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ tableInstance, placeholder }) => {

    const asyncDebounce = useAsyncDebounce(value => {
        tableInstance.current.setGlobalFilter(value);
    }, 300)

    const filterChange = (e) => {
        asyncDebounce(e.target.value);
    }

  return (
    <div className="search-bar">
        <input 
            placeholder={placeholder} 
            onChange={filterChange} 
        />
    </div>
  )
}

export default GlobalFilter
