import "./TableCell.css";

const NameCell = ({ participant }) => {
  let participantName = participant.name;
  if (participantName.trim().length > 16) {
    participantName = participantName.trim().substring(0, 16);
  }
  return (
    <td className="text-gray-700">
      <div className="px-3.5 m-0.5 py-2 bg-blue-100 rounded-md">
        <p className="limit-line-1">{participantName}</p>
      </div>
    </td>
  );
};
export default NameCell;
