import DeleteIcon from "@mui/icons-material/Delete";
const Option = (props) => {
  const onDeleteButtonClick = () => {
    props.deleteOption(props.id);
  };
  return (
    <li className="border border-gray-300 rounded-md px-2.5 py-2 m-1.5 flex justify-between items-center bg-white">
      <p className="w-10/12">{props.text}</p>
      <button type="button" onClick={onDeleteButtonClick}>
        <DeleteIcon className="text-gray-500" />
      </button>
    </li>
  );
};
export default Option;
