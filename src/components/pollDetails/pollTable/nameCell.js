const NameCell = ({ participant }) => {
  return (
    <td className="text-gray-700">
      <div className="px-4 m-0.5 py-2 bg-blue-100 rounded-md">
        <p>{participant.name}</p>
      </div>
    </td>
  );
};
export default NameCell;
