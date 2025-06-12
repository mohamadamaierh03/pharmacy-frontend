export default function SearchBar({ placeholder, onChange }) {
  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}