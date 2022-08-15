import Checkbox from "@mui/material/Checkbox";

const CheckBoxCell = ({ onCheckBoxClick, option }) => {
  return (
    <td className="text-center text-gray-700">
      <div className="m-0.5 bg-gray-50 rounded-md">
        <Checkbox onChange={onCheckBoxClick} value={option.id} />
      </div>
    </td>
  );
};
export default CheckBoxCell;
