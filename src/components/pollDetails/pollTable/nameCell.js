const NameCell = ({ participant }) => {
  let participantName = participant.name;
  if (participantName.trim().length > 14) {
    participantName = participantName.trim().substring(0, 14) + "..";
  }
  return (
    <td className="text-gray-700">
      <div className="px-3.5 m-0.5 py-2 bg-blue-100 rounded-md">
        <p>{participantName}</p>
      </div>
    </td>
  );
};
export default NameCell;
