import Tooltip from "@mui/material/Tooltip";

const OptionCell = ({ option, limitedTextLength }) => {
  return (
    <Tooltip placement="top" title={option.text}>
      <th className="text-center">
        <div className="px-4 py-3 m-0.5 bg-gray-200 rounded-md text-gray-700">
          <p>{limitedTextLength}</p>
        </div>
      </th>
    </Tooltip>
  );
};
export default OptionCell;
